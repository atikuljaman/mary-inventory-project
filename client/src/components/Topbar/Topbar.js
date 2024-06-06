import { useContext } from "react";
import logo from "../../assets/logo.png";
import logo_text from "../../assets/logo-text.png";
import { RiMenu2Fill } from "react-icons/ri";
import { AuthContext } from "../../context/authContext";
import "./Topbar.css";

const Topbar = ({ loggedIn, handleInstallClick }) => {
  const { toggleSideBar } = useContext(AuthContext);

  return (
    <div className={loggedIn ? "topbar-container" : "topbar-container active"}>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="img-fluid logo-symbol" />
        <img src={logo_text} alt="Logo text" className="img-fluid logo-text" />
      </div>

      <div className="topbar-right">
        <button onClick={toggleSideBar} className="toggle-btn">
          <RiMenu2Fill />
        </button>
        <button className="install-btn" onClick={handleInstallClick}>
          Install
        </button>
      </div>
    </div>
  );
};

export default Topbar;
