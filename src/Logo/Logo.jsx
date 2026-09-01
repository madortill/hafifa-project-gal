import logo from "../../media/logo.svg"
import "./Logo.css"
function Logo({ onClick, glow}) {
    return (
        <img
            src={logo}
            className={`logo ${glow ? " logo-button logo-glow" : "logo-button"}`}
            onClick={onClick}
            alt=""
        />
    );
}

export default Logo;