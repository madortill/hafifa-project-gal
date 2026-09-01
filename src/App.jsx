import { useState } from "react";
import "./App.css";

import Material from "./Material/Material.jsx";
import OpenScreen from "./OpenScreen/OpenScreen.jsx";
import Explanations from "./Explanations/Explanations.jsx";
import NavigationArrows from "./NavigationArrows/NavigationArrows.jsx";
import Logo from "./Logo/Logo.jsx";
import CardsPage from "./CardsPage/CardsPage.jsx";
import QuestionsPage from "./QuestionsPage/QuestionsPage.jsx";
import Game from "./Game/Game.jsx"

import logo from "./../media/logo.svg"

function App() {
  const [pageNum, setPageNum] = useState(10);
  const toNextpage = () => {
    setPageNum(prev => prev + 1);
  };


  const toPrevpage = () => {
    setPageNum(prev => prev - 1);
  };


  return (
    <div className="app">
        <img className="logo" src={logo}/>
      {/* עמוד 0 - מסך פתיחה
          עמוד 7 - מסך פתיחה לתרגול */}
      {(pageNum === 0 || pageNum === 7 || pageNum===9) && (
        <OpenScreen
          pageNum={pageNum}
          toNextpage={toNextpage}
        />
      )}


      {/* עמודים 1-2 - הסברים */}
      {(pageNum === 1 || pageNum === 2) && (
        <Explanations
          pageNum={pageNum}
          toNextpage={toNextpage}
        />
      )}


      {/* עמוד 2 - לוגו זוהר + חצים */}
      {pageNum === 2 && (
        <>
          <Logo glow={true} />

          <NavigationArrows
            toPrevpage={toPrevpage}
            toNextpage={toNextpage}
          />
        </>
      )}


      {/* עמודים 3,4,6 - חומר */}
      {(pageNum === 3 ||
        pageNum === 4 ||
        pageNum === 6) && (
        <Material
          pageNum={pageNum}
        />
      )}


      {/* עמוד 5 - קלפים */}
      {pageNum === 5 && (
        <CardsPage
          toPrevpage={toPrevpage}
          toNextpage={toNextpage}
        />
      )}


      {/* עמוד 8 - שאלות */}
      {pageNum === 8 && (
        <QuestionsPage
          toPrevpage={toPrevpage}
          toNextpage={toNextpage}
        />
      )}

      {pageNum===10 && <Game/>}

      {/* לוגו רגיל בכל העמודים אחרי 2
          חוץ מעמוד 7 */}
      {pageNum > 2 && pageNum !== 7 && (
        <Logo glow={false} />
      )}


      {/* חצים רגילים
          לא בעמוד 5 - CardsPage מנהלת אותם
          לא בעמוד 7 - יש כפתור "שנתחיל?"
          לא בעמוד 8 - QuestionsPage מנהלת אותם */}
      {pageNum > 2 &&
        pageNum !== 5 &&
        pageNum !== 7 &&
        pageNum !== 8 && (
          <NavigationArrows
            toPrevpage={toPrevpage}
            toNextpage={toNextpage}
          />
        )}

    </div>
  );
}

export default App;