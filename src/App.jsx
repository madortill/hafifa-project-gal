import { useState } from "react";
import "./App.css";

import Material from "./Material/Material.jsx"
import OpenScreen from "./OpenScreen/OpenScreen.jsx";
import Explanations from "./Explanations/Explanations.jsx";
import NavigationArrows from "./NavigationArrows/NavigationArrows.jsx";
import Logo from "./Logo/Logo.jsx";

function App() {
  const [pageNum, setPageNum] = useState(0);

  const toExplanations = () => {
    setPageNum(1);
  };

  const toNextpage = () => {
    setPageNum(prev => prev + 1);
  };

  const toPrevpage = () => {
    setPageNum(prev => prev - 1);
  };

  return (
    <div className="app">

      {pageNum === 0 && (
        <OpenScreen
          setPageNum={toExplanations}
        />
      )}

      {(pageNum === 1 || pageNum === 2) && (
        <Explanations
          pageNum={pageNum}
          toNextpage={toNextpage}
        />
      )}

      {pageNum === 2 && (
        <>
          <Logo glow={true} />
          <NavigationArrows
            toPrevpage={toPrevpage}
            toNextpage={toNextpage}
          />
        </>
      )}

      {pageNum > 2 && (
        <>
          <Logo glow={false} />
          <NavigationArrows
            toPrevpage={toPrevpage}
            toNextpage={toNextpage}
          />
        </>
      )}

      {(pageNum === 3 || pageNum===4) && <Material pageNum={pageNum}/>}

    </div>
  );
}

export default App;