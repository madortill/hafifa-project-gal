import { useEffect, useState } from "react";

import Question from "../Question/Question";
import questionsData from "../../data/questionsData.json";

import moon from "../../media/moon.png";

import "./QuestionsPage.css";


function QuestionsPage({
    toPrevpage,
    toNextpage
}) {

    /* =========================
       שאלה נוכחית
    ========================= */

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {

        const savedIndex =
            sessionStorage.getItem(
                "asteroidQuizCurrentQuestion"
            );

        return savedIndex
            ? Number(savedIndex)
            : 0;
    });


    /* =========================
       כל התשובות שכבר נענו
    ========================= */

    const [questionAnswers, setQuestionAnswers] = useState(() => {

        const savedAnswers =
            sessionStorage.getItem(
                "asteroidQuizAnswers"
            );

        return savedAnswers
            ? JSON.parse(savedAnswers)
            : {};
    });


    const currentQuestion =
        questionsData[currentQuestionIndex];


    const isLastQuestion =
        currentQuestionIndex ===
        questionsData.length - 1;


    /* =========================
       התשובה השמורה של השאלה
       שאנחנו נמצאים בה עכשיו
    ========================= */

    const currentSavedAnswer =
        questionAnswers[currentQuestion.id];


    const selectedAnswer =
        currentSavedAnswer?.selectedAnswer ?? null;


    const answerStatus =
        currentSavedAnswer?.answerStatus ?? null;


    /* =========================
       שמירה ב-sessionStorage
    ========================= */

    useEffect(() => {

        sessionStorage.setItem(
            "asteroidQuizAnswers",
            JSON.stringify(questionAnswers)
        );

    }, [questionAnswers]);


    useEffect(() => {

        sessionStorage.setItem(
            "asteroidQuizCurrentQuestion",
            currentQuestionIndex.toString()
        );

    }, [currentQuestionIndex]);


    /* =========================
       בחירת תשובה
    ========================= */

    const handleSelectAnswer = (answerIndex) => {

        /*
            אם כבר ענו נכון,
            לא מאפשרים לשנות את התשובה
        */

        if (answerStatus === "correct") {
            return;
        }


        const isCorrect =
            answerIndex ===
            currentQuestion.correctAnswer;


        setQuestionAnswers(prev => ({
            ...prev,

            [currentQuestion.id]: {
                selectedAnswer: answerIndex,

                answerStatus:
                    isCorrect
                        ? "correct"
                        : "wrong"
            }
        }));

    };


    /* =========================
       לשאלה הבאה
    ========================= */

    const handleNextQuestion = () => {

        if (answerStatus !== "correct") {
            return;
        }


        if (!isLastQuestion) {

            setCurrentQuestionIndex(
                prev => prev + 1
            );

            return;
        }


        /*
            השאלה האחרונה הסתיימה
            -> ממשיכים לעמוד הבא
        */

        toNextpage();

    };


    /* =========================
       חזרה אחורה
    ========================= */

    const handleBack = () => {

        /*
            יש שאלה קודמת
        */

        if (currentQuestionIndex > 0) {

            setCurrentQuestionIndex(
                prev => prev - 1
            );

            return;
        }


        /*
            נמצאים בשאלה הראשונה
            -> חוזרים ל-OpenScreen בעמוד 7
        */

        toPrevpage();

    };


    return (
        <div className="questions-page">

            <Question
                key={currentQuestion.id}

                question={currentQuestion}

                selectedAnswer={
                    selectedAnswer
                }

                answerStatus={
                    answerStatus
                }

                onSelectAnswer={
                    handleSelectAnswer
                }
            />


            {/* =========================
                לשאלה הבאה
            ========================= */}

            {answerStatus === "correct" &&
                !isLastQuestion && (

                <div
                    className="comet-button-div questions-next-button"

                    onClick={
                        handleNextQuestion
                    }
                >
                    <p>
                        לשאלה הבאה
                    </p>
                </div>

            )}


            {/* =========================
                חץ ימני - אחורה
            ========================= */}

            <button
                type="button"

                className="questions-back-button"

                onClick={handleBack}

                aria-label="חזרה"
            >
                <img
                    src={moon}
                    alt=""
                    draggable="false"
                />
            </button>


            {/* =========================
                אחרי השאלה האחרונה
            ========================= */}

            {isLastQuestion &&
                answerStatus === "correct" && (

                <button
                    type="button"

                    className="questions-forward-button"

                    onClick={
                        handleNextQuestion
                    }

                    aria-label="המשך"
                >
                    <img
                        src={moon}
                        alt=""
                        draggable="false"
                    />
                </button>

            )}

        </div>
    );
}

export default QuestionsPage;