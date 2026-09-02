import finishOverlay from "../../media/Overlay/finishOverlay.svg";
import loseOverlay from "../../media/Overlay/loseOverlay.svg";
import "./Overlay.css";

function Overlay({ isWin, onClose }) {
    return (
        <>
            <div className="shdaow-div"></div>
            <img
                src={isWin ? finishOverlay : loseOverlay}
                className="overlay"
                alt=""
                draggable="false"
            />
            <button
                type="button"
                className={isWin ? "x-button-blue" : "x-button-red"}
                onClick={onClose}
            >
                x
            </button>
        </>
    );
}

export default Overlay;