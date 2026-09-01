import { useRef, useState } from "react";

import Card from "../Card/Card";
import NavigationArrows from "../NavigationArrows/NavigationArrows";

import CardsData from "../../data/AsteroidCard.json";

import babyAsteroid from "../../media/CardsPage/babyAsteroid.png";
import teenagerAsteroid from "../../media/CardsPage/teenagerAsteroid.png";
import oldAsteroid from "../../media/CardsPage/oldAsteroid.png";

import "./CardsPage.css";


const asteroidImages = {
    babyAsteroid,
    teenagerAsteroid,
    oldAsteroid
};


function CardsPage({
    toNextpage,
    toPrevpage
}) {

    // מתחילים באסטרואיד בייבי
    const [currentCard, setCurrentCard] = useState(0);

    const startX = useRef(null);
    const currentX = useRef(null);

    const swipeDistance = 50;


    /* =========================
       מעבר קדימה
    ========================= */

    const goToNextCard = () => {

        if (currentCard < CardsData.length - 1) {
            setCurrentCard(prev => prev + 1);
        }

    };


    /* =========================
       מעבר אחורה
    ========================= */

    const goToPrevCard = () => {

        if (currentCard > 0) {
            setCurrentCard(prev => prev - 1);
        }

    };


    /* =========================
       חץ שמאלי - קדימה
    ========================= */

    const handleNextArrow = () => {

        // אם יש עוד כרטיס
        if (currentCard < CardsData.length - 1) {
            goToNextCard();
            return;
        }

        // אם אנחנו כבר בכרטיס האחרון
        // ממשיכים לעמוד הבא בלומדה
        toNextpage();

    };


    /* =========================
       חץ ימני - אחורה
    ========================= */

    const handlePrevArrow = () => {

        // אם יש כרטיס קודם
        if (currentCard > 0) {
            goToPrevCard();
            return;
        }

        // אם אנחנו בבייבי
        // חוזרים לעמוד הקודם בלומדה
        toPrevpage();

    };


    /* =========================
       SWIPE
    ========================= */

    const handlePointerDown = (event) => {

        startX.current = event.clientX;
        currentX.current = event.clientX;

        event.currentTarget.setPointerCapture?.(
            event.pointerId
        );

    };


    const handlePointerMove = (event) => {

        if (startX.current === null) {
            return;
        }

        currentX.current = event.clientX;

    };


    const handlePointerUp = () => {

        if (
            startX.current === null ||
            currentX.current === null
        ) {
            return;
        }


        const distance =
            startX.current - currentX.current;


        // החלקה שמאלה = קדימה
        if (distance > swipeDistance) {

            if (currentCard < CardsData.length - 1) {
                goToNextCard();
            }

        }


        // החלקה ימינה = אחורה
        if (distance < -swipeDistance) {

            if (currentCard > 0) {
                goToPrevCard();
            }

        }


        startX.current = null;
        currentX.current = null;

    };


    return (
        <div className="cards-page">

            {/* כותרת */}

            <h1 className="cards-page-title">
                סוגי אסטרואידים
            </h1>


            {/* הקרוסלה */}

            <div
                className="cards-carousel"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >

                {CardsData.map((card, index) => {

                    const offset =
                        index - currentCard;

                    const isActive =
                        index === currentCard;


                    return (
                        <div
                            key={card.id}

                            className={`
                                cards-carousel-item
                                ${isActive ? "active-card" : ""}
                            `}

                            style={{

                                /*
                                    הסדר הוא מימין לשמאל:

                                    בייבי
                                    ← נער
                                    ← בוגר
                                */

                                transform: `
                                    translateX(
                                        calc(
                                            -50% - ${offset * 72}cqw
                                        )
                                    )
                                    scale(
                                        ${isActive ? 1 : 0.9}
                                    )
                                `,

                                opacity:
                                    Math.abs(offset) > 1
                                        ? 0
                                        : isActive
                                            ? 1
                                            : 0.4,

                                zIndex:
                                    isActive
                                        ? 3
                                        : 1
                            }}
                        >

                            <Card
                                image={
                                    asteroidImages[
                                        card.image
                                    ]
                                }
                                title={card.title}
                                text={card.text}
                            />

                        </div>
                    );
                })}

            </div>


            {/* בר התקדמות */}

            <div className="cards-progress">

                {CardsData.map((card, index) => (

                    <button
                        key={card.id}
                        type="button"

                        className={`
                            cards-progress-dot
                            ${
                                currentCard === index
                                    ? "active-progress-dot"
                                    : ""
                            }
                        `}

                        onClick={() =>
                            setCurrentCard(index)
                        }

                        aria-label={
                            `מעבר לכרטיס ${index + 1}`
                        }
                    />

                ))}

            </div>


            {/* החצים */}

            <NavigationArrows
                toPrevpage={handlePrevArrow}
                toNextpage={handleNextArrow}
            />

        </div>
    );
}

export default CardsPage;