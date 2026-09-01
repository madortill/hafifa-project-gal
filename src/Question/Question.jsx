import saturn from "../../media/QuestionsPage/saturn.png";
import questioningTom from "../../media/Material/questioningTom.svg";
import textBubble from "../../media/QuestionsPage/textBubble.svg";

import "./Question.css";


function Question({
    question,
    selectedAnswer,
    answerStatus,
    onSelectAnswer
}) {

    return (
        <div className="quiz-question">

            <div className="quiz-question-heading">

                <p className="quiz-question-number">
                    שאלה {question.number}
                </p>

                <h1 className="quiz-question-title">
                    {question.title}
                </h1>

            </div>


            <div className="quiz-feedback-area">

                {answerStatus === "correct" && (
                    <p className="quiz-correct-feedback">
                        כל הכבוד!
                    </p>
                )}

            </div>


            <div className="quiz-answers-grid">

                {question.answers.map((answer, index) => {

                    const isSelected =
                        selectedAnswer === index;

                    let answerClass = "";

                    if (isSelected && answerStatus === "correct") {
                        answerClass = "quiz-answer-correct";
                    }

                    if (isSelected && answerStatus === "wrong") {
                        answerClass = "quiz-answer-wrong";
                    }


                    return (
                        <button
                            key={index}
                            type="button"
                            className={`quiz-answer ${answerClass}`}
                            style={{
                                "--saturn-image": `url(${saturn})`
                            }}
                            onClick={() => onSelectAnswer(index)}
                        >
                            <span>
                                {answer}
                            </span>
                        </button>
                    );
                })}

            </div>


            {answerStatus === "wrong" && (

                <div className="quiz-wrong-feedback">

                    <img
                        src={questioningTom}
                        className="quiz-questioning-tom"
                        alt=""
                        draggable="false"
                    />

                    <img
                        src={textBubble}
                        className="quiz-text-bubble"
                        alt=""
                        draggable="false"
                    />

                </div>

            )}

        </div>
    );
}

export default Question;