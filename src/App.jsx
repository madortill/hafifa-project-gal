import { useEffect, useState } from "react";
import "./App.css";
import Material from "./Material/Material.jsx";
import OpenScreen from "./OpenScreen/OpenScreen.jsx";
import Explanations from "./Explanations/Explanations.jsx";
import NavigationArrows from "./NavigationArrows/NavigationArrows.jsx";
import Logo from "./Logo/Logo.jsx";
import CardsPage from "./CardsPage/CardsPage.jsx";
import QuestionsPage from "./QuestionsPage/QuestionsPage.jsx";
import Game from "./Game/Game.jsx";
import Navbar from "./Navbar/Navbar.jsx";
import logo from "./../media/logo.svg";

const NAV_START_PAGES = [1, 3, 5, 6, 8, 10];

function getNavIndexByPage(pageNum) {
  let index = -1;

  NAV_START_PAGES.forEach((page, currentIndex) => {
    if (pageNum >= page) {
      index = currentIndex;
    }
  });

  return index;
}

function App() {
  const [pageNum, setPageNum] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);
  const [astronautName, setAstronautName] = useState(() => {
    return sessionStorage.getItem("astronautName") || "";
  });
  const [highestReachedIndex, setHighestReachedIndex] = useState(() => {
    const saved = sessionStorage.getItem("asteroidHighestNavIndex");
    return saved !== null ? Number(saved) : -1;
  });

  const toNextpage = () => {
    setPageNum(prev => prev + 1);
  };

  const toPrevpage = () => {
    setPageNum(prev => prev - 1);
  };

  const openNavbar = () => {
    setShowNavbar(true);
  };

  const closeNavbar = () => {
    setShowNavbar(false);
  };

  const navigateFromNavbar = page => {
    setPageNum(page);
    setShowNavbar(false);
  };

  const restartCourse = () => {
    sessionStorage.removeItem("asteroidQuizCurrentQuestion");
    sessionStorage.removeItem("asteroidQuizAnswers");
    sessionStorage.removeItem("asteroidHighestNavIndex");
    setHighestReachedIndex(-1);
    setShowNavbar(false);
    setPageNum(0);
  };

  useEffect(() => {
    const currentIndex = getNavIndexByPage(pageNum);

    if (currentIndex > highestReachedIndex) {
      setHighestReachedIndex(currentIndex);
      sessionStorage.setItem(
        "asteroidHighestNavIndex",
        currentIndex.toString()
      );
    }
  }, [pageNum, highestReachedIndex]);

  return (
    <div className="app">
      <img className="logo" src={logo} alt="" />

      {(pageNum === 0 ||
        pageNum === 7 ||
        pageNum === 9 ||
        pageNum === 11) && (
          <OpenScreen
            pageNum={pageNum}
            toNextpage={toNextpage}
            restartCourse={restartCourse}
            astronautName={astronautName}
            setAstronautName={setAstronautName}
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
          <Logo
            glow={true}
            onClick={openNavbar}
          />
          <NavigationArrows
            toPrevpage={toPrevpage}
            toNextpage={toNextpage}
          />
        </>
      )}

      {(pageNum === 3 ||
        pageNum === 4 ||
        pageNum === 6) && (
          <Material pageNum={pageNum} />
        )}

      {pageNum === 5 && (
        <CardsPage
          toPrevpage={toPrevpage}
          toNextpage={toNextpage}
        />
      )}

      {pageNum === 8 && (
        <QuestionsPage
          toPrevpage={toPrevpage}
          toNextpage={toNextpage}
        />
      )}

      {pageNum === 10 && (
        <Game
          toNextpage={toNextpage}
          isPaused={showNavbar}
        />
      )}

      {pageNum > 2 &&
        pageNum !== 7 &&
        pageNum !== 11 && (
          <Logo
            glow={false}
            onClick={openNavbar}
          />
        )}

      {pageNum > 2 &&
        pageNum !== 5 &&
        pageNum !== 7 &&
        pageNum !== 8 &&
        pageNum !== 9 &&
        pageNum !== 10 &&
        pageNum !== 11 && (
          <NavigationArrows
            toPrevpage={toPrevpage}
            toNextpage={toNextpage}
          />
        )}

      {showNavbar && (
        <Navbar
          currentPage={pageNum}
          highestReachedIndex={highestReachedIndex}
          onNavigate={navigateFromNavbar}
          onClose={closeNavbar}
        />
      )}
    </div>
  );
}

export default App;