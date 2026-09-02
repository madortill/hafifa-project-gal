import bowie1 from "../../media/Navbar/bowie1.svg";
import bowie2 from "../../media/Navbar/bowie2.svg";
import bowie3 from "../../media/Navbar/bowie3.svg";
import bowie4 from "../../media/Navbar/bowie4.svg";
import bowie5 from "../../media/Navbar/bowie5.svg";
import bowie6 from "../../media/Navbar/bowie6.svg";
import rope from "../../media/Navbar/rope.svg";
import walkingTom from "../../media/Navbar/walkingTom.svg";
import "./Navbar.css";

const navItems = [
    {id: 1, page: 1, image: bowie1},
    {id: 2, page: 3, image: bowie2},
    {id: 3, page: 5, image: bowie3},
    {id: 4, page: 6, image: bowie4},
    {id: 5, page: 8, image: bowie5},
    {id: 6, page: 10, image: bowie6}
];

function getCurrentIndex(currentPage) {
    let currentIndex = -1;
    navItems.forEach((item, index) => {
        if (currentPage >= item.page) currentIndex = index;
    });
    return currentIndex;
}

function Navbar({currentPage, highestReachedIndex, onNavigate, onClose}) {
    const currentIndex = getCurrentIndex(currentPage);

    const handleNodeClick = (item, index) => {
        const canNavigate = index <= highestReachedIndex + 1;
        if (!canNavigate) return;

        if (index === currentIndex) {
            onClose();
            return;
        }

        onNavigate(item.page);
    };

    return (
        <div className="navbar-overlay">
            <button
                type="button"
                className="navbar-close-button"
                onClick={onClose}
                aria-label="סגירת המפה"
            >
                ×
            </button>

            <img
                src={rope}
                className="navbar-rope"
                alt=""
                draggable="false"
            />

            {navItems.map((item, index) => {
                const isCurrent = index === currentIndex;
                const isPassed = index < currentIndex;
                const isReached = index <= highestReachedIndex;
                const isNext = index === highestReachedIndex + 1;
                const isLocked = index > highestReachedIndex + 1;

                let stateClass = "";

                if (isCurrent) {
                    stateClass = "navbar-node-current";
                } else if (isPassed || isReached) {
                    stateClass = "navbar-node-passed";
                } else if (isNext) {
                    stateClass = "navbar-node-next";
                } else if (isLocked) {
                    stateClass = "navbar-node-locked";
                }

                return (
                    <button
                        key={item.id}
                        type="button"
                        className={`navbar-node navbar-node-${item.id} ${stateClass}`}
                        onClick={() => handleNodeClick(item, index)}
                        disabled={isLocked}
                    >
                        {isCurrent && (
                            <img
                                src={walkingTom}
                                className="navbar-walking-tom"
                                alt=""
                                draggable="false"
                            />
                        )}

                        <img
                            src={item.image}
                            className="navbar-bowie"
                            alt=""
                            draggable="false"
                        />
                    </button>
                );
            })}

           
        </div>
    );
}

export default Navbar;