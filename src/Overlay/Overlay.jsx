import finishOverlay from "../../media/Overlay/finishOverlay.svg"
import loseOverlay from "../../media/Overlay/loseOverlay.svg"
import "./Overlay.css"

function Overlay ({isWin}){
return (
    <>
    <div className="shdaow-div"></div>
    <img src={isWin? finishOverlay : loseOverlay} className="overlay"/>
    <p className={isWin? x-button-blue : x-button-red}>x</p>
    </>
)
}

export default Overlay;