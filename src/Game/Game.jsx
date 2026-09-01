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


const tomFaces = [
    tomFace1,
    tomFace2,
    tomFace3
];


const asteroids = [
    {
        id: 1,
        image: babyAsteroid,
        className: "game-asteroid asteroid-one"
    },
    {
        id: 2,
        image: babyAsteroid,
        className: "game-asteroid asteroid-two"
    },
    {
        id: 3,
        image: teenagerAsteroid,
        className: "game-asteroid asteroid-three"
    },
    {
        id: 4,
        image: babyAsteroid,
        className: "game-asteroid asteroid-four"
    }
];


/* =========================
   יצירת קואורדינטה רנדומלית
========================= */

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


    const randomIndex =
        Math.floor(
            Math.random() * availableCoordinates.length
        );


    return availableCoordinates[randomIndex];
}


function Game() {

    /* =========================
       קואורדינטות שכבר הופיעו
    ========================= */

    const usedCoordinates = useRef(new Set());


    /* =========================
       סבב נוכחי
    ========================= */

    const [round, setRound] = useState(1);


    /* =========================
       קואורדינטה נכונה
    ========================= */

    const [targetCoordinate, setTargetCoordinate] = useState(() => {

        const firstCoordinate =
            getRandomCoordinate(
                usedCoordinates.current
            );

        usedCoordinates.current.add(
            firstCoordinate
        );

        return firstCoordinate;

    });


    /* =========================
       טיימר
    ========================= */

    const [timeLeft, setTimeLeft] =
        useState(ROUND_TIME);


    /* =========================
       פסילות
    ========================= */

    const [strikes, setStrikes] =
        useState(0);


    /* =========================
       פידבק
    ========================= */

    const [feedback, setFeedback] =
        useState("normal");

    /*
        normal
        correct
        wrong
    */


    const [ highlightedCell, setHighlightedCell] = useState(null);
    const [isLocked, setIsLocked] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);
    const [isWin, setIsWin] =useState(false);
    const feedbackTimeout =useRef(null);

    useEffect(() => {

        return () => {
            if (feedbackTimeout.current) {
                clearTimeout(
                    feedbackTimeout.current
                );
            }
        };
    }, []);



    useEffect(() => {

        if (
            gameEnded ||
            isLocked
        ) {
            return;
        }


        const interval = setInterval(() => {

            setTimeLeft(prev => {

                if (prev <= 1) {
                    return 0;
                }

                return prev - 1;

            });

        }, 1000);


        return () => {
            clearInterval(interval);
        };

    }, [
        gameEnded,
        isLocked,
        round,
        targetCoordinate
    ]);


    /* =========================
       נגמר הזמן
    ========================= */

    useEffect(() => {

        if (
            timeLeft === 0 &&
            !gameEnded &&
            !isLocked
        ) {

            handleMistake();

        }

    }, [
        timeLeft,
        gameEnded,
        isLocked
    ]);


    /* =========================
       תשובה שגויה / נגמר הזמן
    ========================= */

    const handleMistake = (
        coordinate = null
    ) => {

        if (
            isLocked ||
            gameEnded
        ) {
            return;
        }


        setIsLocked(true);

        setFeedback("wrong");


        /* אם המשתמש לחץ על תא שגוי */
        if (coordinate) {

            setHighlightedCell({
                coordinate,
                type: "wrong"
            });

        } else {

            /*
                אם נגמר הזמן אין
                תא ספציפי לצבוע באדום
            */

            setHighlightedCell(null);

        }


        const newStrikes =
            strikes + 1;


        setStrikes(
            newStrikes
        );


        /* =========================
           הפסד - 3 פסילות
        ========================= */

        if (newStrikes >= MAX_STRIKES) {

            feedbackTimeout.current =
                setTimeout(() => {

                    setGameEnded(true);

                    setIsWin(false);

                    setIsLocked(false);

                }, 1200);

            return;
        }


        /* =========================
           לא הפסידו -
           נשארים באותו סבב
        ========================= */

        feedbackTimeout.current =
            setTimeout(() => {

                setHighlightedCell(null);

                setFeedback("normal");

                setTimeLeft(
                    ROUND_TIME
                );

                setIsLocked(false);

            }, 1400);

    };


    /* =========================
       תשובה נכונה
    ========================= */

    const handleCorrectAnswer = (
        coordinate
    ) => {

        if (
            isLocked ||
            gameEnded
        ) {
            return;
        }


        setIsLocked(true);

        setFeedback("correct");

        setHighlightedCell({
            coordinate,
            type: "correct"
        });


        feedbackTimeout.current =
            setTimeout(() => {

                /* =========================
                   ניצחון -
                   השלימו 5 סבבים
                ========================= */

                if (round === TOTAL_ROUNDS) {

                    setGameEnded(true);

                    setIsWin(true);

                    setIsLocked(false);

                    return;
                }


                /* =========================
                   עוברים לסבב הבא
                ========================= */

                const nextCoordinate =
                    getRandomCoordinate(
                        usedCoordinates.current
                    );


                usedCoordinates.current.add(
                    nextCoordinate
                );


                setRound(
                    prev => prev + 1
                );

                setTargetCoordinate(
                    nextCoordinate
                );

                setTimeLeft(
                    ROUND_TIME
                );

                setFeedback(
                    "normal"
                );

                setHighlightedCell(
                    null
                );

                setIsLocked(
                    false
                );

            }, 1000);

    };


    /* =========================
       לחיצה על תא
    ========================= */

    const handleCellClick = (
        coordinate
    ) => {

        if (
            isLocked ||
            gameEnded
        ) {
            return;
        }


        if (
            coordinate ===
            targetCoordinate
        ) {

            handleCorrectAnswer(
                coordinate
            );

            return;
        }


        handleMistake(
            coordinate
        );

    };


    /* =========================
       טקסט בועת הדיבור
    ========================= */

    const getBubbleText = () => {

        if (feedback === "wrong") {

            return (
                <>
                    זו לא הקואורדינטה הנכונה,
                    זכרו שיש לנטרל את
                    האסטרואיד ב-
                    <strong>
                        {targetCoordinate}
                    </strong>
                </>
            );

        }


        if (feedback === "correct") {

            return (
                <>
                    כל הכבוד!
                </>
            );

        }


        return (
            <>
                נטרלו את{" "}
                <strong>
                    {targetCoordinate}
                </strong>
                !
            </>
        );

    };


    return (
        <div className="game-page">


            {/* =========================
                TIMER
            ========================= */}

            <div className="game-timer">

                00:
                {String(timeLeft).padStart(
                    2,
                    "0"
                )}

            </div>


            {/* =========================
                ROUND
            ========================= */}

            <div className="game-round">

                {round}/{TOTAL_ROUNDS}

            </div>


            {/* =========================
                חיים / פסילות
            ========================= */}

            <div className="game-lives">

                {tomFaces.map(
                    (face, index) => {

                        const isLost =
                            index < strikes;


                        return (
                            <img
                                key={index}
                                src={face}
                                alt=""
                                draggable="false"

                                className={
                                    isLost
                                        ? "game-life lost-life"
                                        : "game-life"
                                }
                            />
                        );

                    }
                )}

            </div>


            {/* =========================
                BOARD
            ========================= */}

            <div className="game-board-wrapper">


                {/* אותיות */}

                <div className="game-column-labels">

                    {COLUMNS.map(
                        column => (

                            <span key={column}>
                                {column}
                            </span>

                        )
                    )}

                </div>


                {/* מספרים */}

                <div className="game-row-labels">

                    {ROWS.map(
                        row => (

                            <span key={row}>
                                {row}
                            </span>

                        )
                    )}

                </div>


                <div className="game-board">


                    {/* =========================
                        משבצות לחיצות
                    ========================= */}

                    <div className="game-grid">

                        {ROWS.map(row =>

                            COLUMNS.map(
                                column => {

                                    const coordinate =
                                        `${column}${row}`;


                                    const isHighlighted =
                                        highlightedCell?.coordinate ===
                                        coordinate;


                                    let cellClass =
                                        "game-cell";


                                    if (
                                        isHighlighted &&
                                        highlightedCell.type === "correct"
                                    ) {

                                        cellClass +=
                                            " correct-cell";

                                    }


                                    if (
                                        isHighlighted &&
                                        highlightedCell.type === "wrong"
                                    ) {

                                        cellClass +=
                                            " wrong-cell";

                                    }


                                    return (
                                        <button
                                            key={coordinate}
                                            type="button"

                                            className={
                                                cellClass
                                            }

                                            onClick={() =>
                                                handleCellClick(
                                                    coordinate
                                                )
                                            }

                                            aria-label={
                                                coordinate
                                            }
                                        />
                                    );

                                }
                            )

                        )}

                    </div>


                    {/* =========================
                        אסטרואידים
                    ========================= */}

                    <div className="game-asteroids-layer">

                        {asteroids.map(
                            asteroid => (

                                <img
                                    key={
                                        asteroid.id
                                    }

                                    src={
                                        asteroid.image
                                    }

                                    className={
                                        asteroid.className
                                    }

                                    alt=""
                                    draggable="false"
                                />

                            )
                        )}

                    </div>

                </div>

            </div>


            {/* =========================
                SPACESHIP + BUBBLE
            ========================= */}

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


                    <p
                        className={`
                            game-message-text
                            ${
                                feedback === "wrong"
                                    ? "wrong-message"
                                    : ""
                            }
                        `}
                    >

                        {getBubbleText()}

                    </p>

                </div>

            </div>


            {/* =========================
                OVERLAY

                מופיע אך ורק כאשר
                המשחק הסתיים
            ========================= */}

            {gameEnded && (
                <Overlay
                    isWin={isWin}
                />
            )}

        </div>
    );
}

export default Game;