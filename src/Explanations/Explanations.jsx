import { useState } from "react";

import majorTom from "../../media/tom.png";
import ExplanationsData from "../../data/Explanations.json";
import textBubble from "../../media/Explanations/textBubble.png";
import NavigationArrows from "../NavigationArrows/NavigationArrows";

import "./Explanations.css";

function Explanations({ pageNum, toNextpage }) {
    const [explanationNum, setExplanationNum] = useState(0);

    // אם אנחנו בעמוד 2 תמיד נציג את ההסבר השלישי
    const currentExplanation =
        pageNum === 2 ? 2 : explanationNum;


    const handleNext = () => {

        // בעמוד 1 - הסבר ראשון
        if (pageNum === 1 && explanationNum === 0) {
            setExplanationNum(1);
            return;
        }

        // בעמוד 1 - הסבר שני
        // עוברים לעמוד 2
        if (pageNum === 1 && explanationNum === 1) {
            toNextpage();
            return;
        }

        // בעמוד 2 - ממשיכים לעמוד הבא
        if (pageNum === 2) {
            toNextpage();
        }
    };


    return (
        <>
            <img
                src={majorTom}
                className="tom-explanations"
                alt=""
            />

            <img
                src={textBubble}
                className={
                    currentExplanation === 2
                        ? "large-text-bubble"
                        : "small-text-bubble"
                }
                alt=""
            />

            <div
                className="comet-button-div open-page-button"
                onClick={handleNext}
            >
                <p>המשך</p>
            </div>

            <p
                className={
                    currentExplanation === 2
                        ? "explanations-large-text"
                        : "explanations-text"
                }
            >
                {ExplanationsData[currentExplanation].text}
            </p>

            {/* רק בהסבר השני של עמוד 1 */}
            {pageNum === 1 && explanationNum === 1 && (
                <NavigationArrows glow />
            )}

        </>
    );
}

export default Explanations;