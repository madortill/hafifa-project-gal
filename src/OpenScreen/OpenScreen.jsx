import "./OpenScreen.css"
import comet from "../../media/comet.png"
function OpenScreen({setPageNum}) {

  return (
    <>
      <div className="open-page-div">
        <h3 className="secondary-title">ברוכים הבאים ללומדת</h3>
        <h1 className="main-title">אסטרואידים</h1>
      </div>

      <img className="main-asteroid" src="media/OpenPage/asteroid.png" alt="asteroid"/>
        <div className="comet-button-div open-page-button" onClick={setPageNum}>
        <p>שנתחיל?</p>
        </div>
    
    </>
  );
}

export default OpenScreen;