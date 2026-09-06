import {useEffect,useRef,useState}
from "react";
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
import LoadingScreen
from "./LoadingScreen/LoadingScreen.jsx";

import {
  waitForPageAssets
} from "./utils/waitForPageAssets.js";

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

const MIN_LOADING_TIME = 900;

function delay(ms) {
  return new Promise(
    resolve =>
      setTimeout(resolve, ms)
  );
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
  const appRef = useRef(null);

const [
  isPageLoading,
  setIsPageLoading
] = useState(true);

const goToPage = page => {
  if (page === pageNum) {
    return;
  }

  setIsPageLoading(true);
  setPageNum(page);
};


const toNextpage = () => {
  setIsPageLoading(true);

  setPageNum(
    prev => prev + 1
  );
};


const toPrevpage = () => {
  setIsPageLoading(true);

  setPageNum(
    prev => prev - 1
  );
};

  const openNavbar = () => {
    setShowNavbar(true);
  };

  const closeNavbar = () => {
    setShowNavbar(false);
  };

const navigateFromNavbar = page => {
  goToPage(page);
  setShowNavbar(false);
};

  const restartCourse = () => {
    sessionStorage.removeItem("asteroidQuizCurrentQuestion");
    sessionStorage.removeItem("asteroidQuizAnswers");
    sessionStorage.removeItem("asteroidHighestNavIndex");
    setHighestReachedIndex(-1);
    setShowNavbar(false);
    goToPage(0);
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


useEffect(() => {
  let cancelled = false;

  const loadingStartedAt =
    performance.now();


  async function preparePage() {
    /*
     * נותנים ל-React לסיים להכניס
     * את הקומפוננטה החדשה ל-DOM.
     */
    await new Promise(resolve => {
      requestAnimationFrame(() => {
        requestAnimationFrame(
          resolve
        );
      });
    });


    /*
     * מחכים לכל התמונות,
     * background-images והפונטים.
     */
    await waitForPageAssets(
      appRef.current
    );


    /*
     * זמן מינימום למסך הטעינה.
     */
    const elapsed =
      performance.now() -
      loadingStartedAt;

    const remaining =
      Math.max(
        0,
        MIN_LOADING_TIME -
          elapsed
      );


    if (remaining > 0) {
      await delay(remaining);
    }


    /*
     * רק אם בינתיים המשתמש
     * לא עבר לעמוד אחר.
     */
    if (!cancelled) {
      setIsPageLoading(false);
    }
  }


  preparePage();


  return () => {
    cancelled = true;
  };
}, [pageNum]);




  return (
    <div className="app" ref={appRef}>
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

      {isPageLoading && (
  <LoadingScreen />
)}
    </div>
  );
}

export default App;