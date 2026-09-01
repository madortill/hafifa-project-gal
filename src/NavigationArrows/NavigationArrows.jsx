import moon from "../../media/moon.png";
import "./NavigationArrows.css";

function NavigationArrows({
    toPrevpage,
    toNextpage,
    glow = false
}) {
    return (
        <div
            className={`arrows-div ${glow ? "arrows-glow" : ""}`}
        >
            <img
                src={moon}
                className="left-moon"
                onClick={toNextpage}
                alt=""
            />

            <img
                src={moon}
                className="right-moon"
                onClick={toPrevpage}
                alt=""
            />
        </div>
    );
}

export default NavigationArrows;