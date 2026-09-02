import "./OpenScreen.css";
import asteroid from "../../media/OpenPage/asteroid.png";
import expBubble from "../../media/OpenPage/expBubble.svg";
import holdingTom from "../../media/holdingTom.svg";

function OpenScreen({ pageNum, toNextpage, restartCourse, astronautName, setAstronautName }) {
  return (
    <>
      {pageNum === 0 && (
        <>
          <div className="open-page-div">
            <h3 className="secondary-title">ברוכים הבאים ללומדת</h3>
            <h1 className="main-title">אסטרואידים</h1>
          </div>

          <img
            className="main-asteroid"
            src={asteroid}
            alt="asteroid"
          />

          <input
            type="text"
            className="astronaut-name-input"
            value={astronautName}
            onChange={event => setAstronautName(event.target.value)}
            placeholder="איך קוראים לכם?"
          />

          <div
            className="comet-button-div open-page-button"
            onClick={toNextpage}
          >
            <p>שנתחיל?</p>
          </div>
        </>
      )}

      {pageNum === 7 && (
        <>
          <div className="practiceDiv">
            <p>אז עכשיו אחרי שלמדנו הכל,</p>
            <h1 className="practiceTitle">זמן לתרגול!</h1>
          </div>
          <div className="comet-button-div open-page-button" onClick={toNextpage}>
            <p>שנתחיל?</p>
          </div>
        </>
      )}

      {pageNum === 9 && (
        <>
          <img className="exp-bubble" src={expBubble} alt="" />
          <img src={holdingTom} className="holding-tom" alt="" />
          <div
            className="comet-button-div open-page-button rotate-button"
            onClick={toNextpage}
          >
            <p>למשחק</p>
          </div>
        </>
      )}

      {pageNum === 11 && (
        <>
          <h1 className="end-title">
            מייג׳ור טום גאה בכם{astronautName ? `, ${astronautName}` : ""}! </h1>
          <h1 className="end-title title-down">סיימתם את לומדת אסטרואידים</h1>
          <img className="main-asteroid" src={asteroid} alt="asteroid" />
          <img src={holdingTom} className="holding-tom-last" alt="" />
          <div
            className="comet-button-div open-page-button"
            onClick={restartCourse}
          >
            <p>חזרה ללומדה</p>
          </div>
        </>
      )}
    </>
  );
}

export default OpenScreen;