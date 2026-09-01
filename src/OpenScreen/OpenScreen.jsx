import "./OpenScreen.css"
import comet from "../../media/comet.png"
import asteroid from "../../media/OpenPage/asteroid.png";
import expBubble from "../../media/OpenPage/expBubble.svg" 
import holdingTom from "../../media/holdingTom.svg"
function OpenScreen({ pageNum, toNextpage }) {

  return (
    <>
      {pageNum === 0 &&
        <><div className="open-page-div">
          <h3 className="secondary-title">ברוכים הבאים ללומדת</h3>
          <h1 className="main-title">אסטרואידים</h1>
        </div>

          <img className="main-asteroid" src={asteroid} alt="asteroid" />
        </>}

      {pageNum === 7 &&
        <div className="practiceDiv">
          <p>אז עכשיו אחרי שלמדנו הכל, </p>
          <h1 className="practiceTitle">זמן לתרגול!</h1>
        </div>
      }

      {pageNum===9 &&
      <>
      <img className="exp-bubble" src={expBubble}/>
      <img src={holdingTom} className="holding-tom"/>
      <div className="comet-button-div open-page-button rotate-button" onClick={toNextpage}>
        <p>למשחק</p>
      </div>
      </>
      }

      {pageNum!==9 && <div className="comet-button-div open-page-button" onClick={toNextpage}>
        <p>שנתחיל?</p>
      </div>}

    </>
  );
}

export default OpenScreen;