import "./Card.css";

function Card({
    image,
    title,
    text
}) {
    return (
        <div className="asteroid-card">

            <div className="asteroid-card-image-container">
                <img
                    src={image}
                    className="asteroid-card-image"
                    alt={title}
                    draggable="false"
                />
            </div>

            <h2 className="asteroid-card-title">
                {title}
            </h2>

            <div className="asteroid-card-line"></div>

            <p className="asteroid-card-text">
                {text}
            </p>

        </div>
    );
}

export default Card;