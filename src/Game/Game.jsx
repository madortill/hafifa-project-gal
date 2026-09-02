import { useEffect, useRef, useState } from "react";
import Overlay from "../Overlay/Overlay";
import spaceship from "../../media/Game/spaceship.png";
import textBubble from "../../media/Game/textBubble.svg";
import tomFace1 from "../../media/Game/tomFace1.png";
import tomFace2 from "../../media/Game/tomFace2.png";
import tomFace3 from "../../media/Game/tomFace3.png";
import babyAsteroid from "../../media/CardsPage/babyAsteroid.png";
import teenagerAsteroid from "../../media/CardsPage/teenagerAsteroid.png";
import oldAsteroid from "../../media/CardsPage/oldAsteroid.png";
import "./Game.css";

const COLUMNS = ["A", "B", "C", "D", "E"];
const ROWS = [1, 2, 3, 4, 5];
const TOTAL_ROUNDS = 5;
const ROUND_TIME = 10;
const MAX_STRIKES = 3;

const tomFaces = [tomFace1, tomFace2, tomFace3];

const asteroids = [
    { id: 1, image: babyAsteroid, className: "game-asteroid asteroid-one" },
    { id: 2, image: babyAsteroid, className: "game-asteroid asteroid-two" },
    { id: 3, image: teenagerAsteroid, className: "game-asteroid asteroid-three" },
    { id: 4, image: oldAsteroid, className: "game-asteroid asteroid-four" }
];

function getRandomCoordinate(usedCoordinates) {
    const availableCoordinates = [];
    ROWS.forEach(row => {
        COLUMNS.forEach(column => {
            const coordinate = `${column}${row}`;
            if (!usedCoordinates.has(coordinate)) {
                availableCoordinates.push(coordinate);
            }
        });
    });
    const randomIndex = Math.floor(Math.random() * availableCoordinates.length);
    return availableCoordinates[randomIndex];
}

function Game({ toNextpage }) {
    const usedCoordinates = useRef(new Set());
    const feedbackTimeout = useRef(null);

    const [round, setRound] = useState(1);
    const [targetCoordinate, setTargetCoordinate] = useState(() => {
        const firstCoordinate = getRandomCoordinate(usedCoordinates.current);
        usedCoordinates.current.add(firstCoordinate);
        return firstCoordinate;
    });
    const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
    const [strikes, setStrikes] = useState(0);
    const [feedback, setFeedback] = useState("normal");
    const [highlightedCell, setHighlightedCell] = useState(null);
    const [isLocked, setIsLocked] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);
    const [isWin, setIsWin] = useState(false);
    const [gameStarted, setGameStarted] = useState(true);

    const resetGame = () => {
        sessionStorage.removeItem("asteroidQuizCurrentQuestion");
        sessionStorage.removeItem("asteroidQuizAnswers");
        sessionStorage.removeItem("asteroidHighestNavIndex");
        sessionStorage.removeItem("astronautName");

        if (feedbackTimeout.current) {
            clearTimeout(feedbackTimeout.current);
        }
        usedCoordinates.current = new Set();
        const firstCoordinate = getRandomCoordinate(usedCoordinates.current);
        usedCoordinates.current.add(firstCoordinate);
        setRound(1);
        setTargetCoordinate(firstCoordinate);
        setTimeLeft(ROUND_TIME);
        setStrikes(0);
        setFeedback("normal");
        setHighlightedCell(null);
        setIsLocked(false);
        setGameEnded(false);
        setIsWin(false);
        setGameStarted(true);
    };

    const handleMistake = (coordinate = null) => {
        if (isLocked || gameEnded) return;

        setIsLocked(true);
        setFeedback("wrong");

        if (coordinate) {
            setHighlightedCell({
                coordinate,
                type: "wrong"
            });
        } else {
            setHighlightedCell(null);
        }

        const newStrikes = strikes + 1;
        setStrikes(newStrikes);

        if (newStrikes >= MAX_STRIKES) {
            feedbackTimeout.current = setTimeout(() => {
                setGameEnded(true);
                setIsWin(false);
                setIsLocked(false);
            }, 1200);
            return;
        }

        feedbackTimeout.current = setTimeout(() => {
            setHighlightedCell(null);
            setFeedback("normal");
            setTimeLeft(ROUND_TIME);
            setIsLocked(false);
        }, 1400);
    };

    const handleCorrectAnswer = coordinate => {
        if (isLocked || gameEnded) return;

        setIsLocked(true);
        setFeedback("correct");
        setHighlightedCell({
            coordinate,
            type: "correct"
        });

        feedbackTimeout.current = setTimeout(() => {
            if (round === TOTAL_ROUNDS) {
                setGameEnded(true);
                setIsWin(true);
                setIsLocked(false);
                return;
            }

            const nextCoordinate = getRandomCoordinate(usedCoordinates.current);
            usedCoordinates.current.add(nextCoordinate);

            setRound(prev => prev + 1);
            setTargetCoordinate(nextCoordinate);
            setTimeLeft(ROUND_TIME);
            setFeedback("normal");
            setHighlightedCell(null);
            setIsLocked(false);
        }, 1000);
    };

    const handleCellClick = coordinate => {
        if (isLocked || gameEnded) return;

        if (coordinate === targetCoordinate) {
            handleCorrectAnswer(coordinate);
            return;
        }

        handleMistake(coordinate);
    };

    const handleOverlayClose = () => {
        if (isWin) {
            setGameEnded(false);
            setGameStarted(false);
            toNextpage();
            return;
        }

        resetGame();
    };

    const getBubbleText = () => {
        if (feedback === "wrong") {
            return (
                <>
                    זו לא הקואורדינטה הנכונה, זכרו שיש לנטרל את האסטרואיד ב-
                    <strong>{targetCoordinate}</strong>
                </>
            );
        }

        if (feedback === "correct") {
            return <>כל הכבוד!</>;
        }

        return (
            <>
                נטרלו את <strong>{targetCoordinate}</strong>!
            </>
        );
    };

    useEffect(() => {
        return () => {
            if (feedbackTimeout.current) {
                clearTimeout(feedbackTimeout.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!gameStarted || gameEnded || isLocked) return;

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) return 0;
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [gameStarted, gameEnded, isLocked, round, targetCoordinate]);

    useEffect(() => {
        if (timeLeft === 0 && gameStarted && !gameEnded && !isLocked) {
            handleMistake();
        }
    }, [timeLeft, gameStarted, gameEnded, isLocked]);

    return (
        <div className="game-page">
            {!gameStarted && !gameEnded && (
                <div
                    className="comet-button-div open-page-button"
                    onClick={() => {
                        setTimeLeft(ROUND_TIME);
                        setGameStarted(true);
                    }}
                >
                    <p>שנתחיל?</p>
                </div>
            )}

            {gameStarted && (
                <>
                    <div className="game-timer">
                        00:{String(timeLeft).padStart(2, "0")}
                    </div>

                    <div className="game-round">
                        {round}/{TOTAL_ROUNDS}
                    </div>

                    <div className="game-lives">
                        {tomFaces.map((face, index) => (
                            <img
                                key={index}
                                src={face}
                                alt=""
                                draggable="false"
                                className={index < strikes ? "game-life lost-life" : "game-life"}
                            />
                        ))}
                    </div>

                    <div className="game-board-wrapper">
                        <div className="game-column-labels">
                            {COLUMNS.map(column => (
                                <span key={column}>{column}</span>
                            ))}
                        </div>

                        <div className="game-row-labels">
                            {ROWS.map(row => (
                                <span key={row}>{row}</span>
                            ))}
                        </div>

                        <div className="game-board">
                            <div className="game-grid">
                                {ROWS.map(row =>
                                    COLUMNS.map(column => {
                                        const coordinate = `${column}${row}`;
                                        const isHighlighted = highlightedCell?.coordinate === coordinate;
                                        let cellClass = "game-cell";

                                        if (isHighlighted && highlightedCell.type === "correct") {
                                            cellClass += " correct-cell";
                                        }

                                        if (isHighlighted && highlightedCell.type === "wrong") {
                                            cellClass += " wrong-cell";
                                        }

                                        return (
                                            <button
                                                key={coordinate}
                                                type="button"
                                                className={cellClass}
                                                onClick={() => handleCellClick(coordinate)}
                                                aria-label={coordinate}
                                            />
                                        );
                                    })
                                )}
                            </div>

                            <div className="game-asteroids-layer">
                                {asteroids.map(asteroid => (
                                    <img
                                        key={asteroid.id}
                                        src={asteroid.image}
                                        className={asteroid.className}
                                        alt=""
                                        draggable="false"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="game-spaceship-area">
                        <img
                            src={spaceship}
                            className="game-spaceship"
                            alt=""
                            draggable="false"
                        />

                        <div className="game-message">
                            <img
                                src={textBubble}
                                className="game-text-bubble"
                                alt=""
                                draggable="false"
                            />
                            <p className={`game-message-text ${feedback === "wrong" ? "wrong-message" : ""}`}>
                                {getBubbleText()}
                            </p>
                        </div>
                    </div>
                </>
            )}

            {gameEnded && (
                <Overlay
                    isWin={isWin}
                    onClose={handleOverlayClose}
                />
            )}
        </div>
    );
}

export default Game;