import logo from "../../assets/logo.png";
import logo_text from "../../assets/logo-text.png";
import "./Topbar.css";

const Topbar = ({ loggedIn }) => {
  return (
    <div className={loggedIn ? "topbar-container" : "topbar-container active"}>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="img-fluid logo-symbol" />
        <img src={logo_text} alt="Logo text" className="img-fluid logo-text" />
      </div>

      <button>Install</button>
    </div>
  );
};

export default Topbar;
