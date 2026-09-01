import { Fragment, useState } from "react";

import majorTom from "../../media/tom.png";
import ExplanationsData from "../../data/Explanations.json";
import textBubble from "../../media/Explanations/textBubble.png";
import NavigationArrows from "../NavigationArrows/NavigationArrows";

import "./Explanations.css";

function Explanations({ pageNum, toNextpage }) {
    const [explanationNum, setExplanationNum] = useState(0);

    const currentExplanation =
        pageNum === 2 ? 2 : explanationNum;


    const handleNext = () => {

        // הסבר ראשון -> הסבר שני
        if (pageNum === 1 && explanationNum === 0) {
            setExplanationNum(1);
            return;
        }

        // הסבר שני -> עמוד 2
        if (pageNum === 1 && explanationNum === 1) {
            toNextpage();
            return;
        }

        // עמוד 2 -> העמוד הבא
        if (pageNum === 2) {
            toNextpage();
        }
    };


    return (
        <>
            <Fragment key={currentExplanation}>

                <img
                    src={majorTom}
                    className="tom-explanations"
                    alt=""
                    draggable="false"
                />

                <img
                    src={textBubble}
                    className={
                        currentExplanation === 2
                            ? "large-text-bubble"
                            : "small-text-bubble"
                    }
                    alt=""
                    draggable="false"
                />

                <p
                    className={
                        currentExplanation === 2
                            ? "explanations-large-text"
                            : "explanations-text"
                    }
                >
                    {ExplanationsData[currentExplanation].text}
                </p>

                <div
                    className="comet-button-div open-page-button explanations-next-button"
                    onClick={handleNext}
                >
                    <p>המשך</p>
                </div>

            </Fragment>


            {/* רק בהסבר השני */}
            {pageNum === 1 && explanationNum === 1 && (
                <NavigationArrows glow />
            )}

        </>
    );
}

export default Explanations;