import { useEffect, useState } from "react";

import majorTom from "../../media/tom.png";
import cunningAsteroid from "../../media/Material/cunningasteroid.png";
import earth from "../../media/Material/earth.png";
import earthText from "../../media/Material/earthText.svg";
import asteroidText from "../../media/Material/asteroidText.svg";
import answer from "../../media/Material/answer.svg";
import question from "../../media/Material/question.svg";
import questioningTom from "../../media/Material/questioningTom.svg";

import "./Material.css";


function Material({ pageNum }) {

    const [showAnswer, setShowAnswer] = useState(false);


    useEffect(() => {

        if (pageNum !== 6) {
            setShowAnswer(false);
            return;
        }

        setShowAnswer(false);

        const answerTimer = setTimeout(() => {
            setShowAnswer(true);
        }, 1800);


        return () => {
            clearTimeout(answerTimer);
        };

    }, [pageNum]);


    const revealAnswer = () => {
        setShowAnswer(true);
    };


    return (
        <>

            {pageNum === 3 && (
                <>
                    <img
                        src={majorTom}
                        className="material-tom"
                        alt=""
                    />

                    <div className="small-material-div">
                        <h2 className="material-title">
                            פיצוץ אסטרואידים
                        </h2>

                        <p className="material-text">
                            שיעור פיצוץ אסטרואיד ידוע בחשיבותו בגלל
                            הסכנה היומיומית הנשקפת לכדור הארץ בלעדיו.
                            עשרות אלפי אסטרואידים נעים ברגע זה לכיוון
                            הכוכב שלנו, ועליכן לדעת כיצד למנוע מהם להגיע אליו.
                        </p>
                    </div>
                </>
            )}


            {pageNum === 4 && (
                <>
                    <div className="large-material-div">

                        <h2 className="material-title">
                            מהו אסטרואיד?
                        </h2>

                        <p className="material-text">
                            אסטרואיד הוא יצור מרושע שמטרתו להשמיד את
                            כדור הארץ ואנחנו בברוגז איתו, ממש. הוא נראה
                            כמו כדור עגול כזה אבל לא חלק כי יש לו בליטות
                            ממש מכוערות שנראות כמו חצ'קונים.
                        </p>

                        <img
                            className="earth"
                            src={earth}
                            alt=""
                        />

                        <img
                            className="cunningAsteroid"
                            src={cunningAsteroid}
                            alt=""
                        />

                        <img
                            className="earthText"
                            src={earthText}
                            alt=""
                        />

                        <img
                            className="asteroidText"
                            src={asteroidText}
                            alt=""
                        />

                    </div>
                </>
            )}


            {pageNum === 6 && (
                <>

                    <img
                        className="question question-enter"
                        src={question}
                        onClick={revealAnswer}
                        alt=""
                    />

                    <img
                        className="questioningTom tom-enter"
                        src={questioningTom}
                        alt=""
                    />

                    {showAnswer && (
                        <img
                            className="answerBubble answer-enter"
                            src={answer}
                            alt=""
                        />
                    )}

                </>
            )}

        </>
    );
}

export default Material;