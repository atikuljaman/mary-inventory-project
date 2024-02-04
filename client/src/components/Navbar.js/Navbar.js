import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import axios from "axios";
import logo from "../../assets/vector-file.png";
import { Button } from "react-bootstrap";
const Navbar = ({ setLoggedIn, openMenu, setOpenMenu }) => {
  const [userRole, setUserRole] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    // Fetch user data and set the user role and profile pic
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${user_id}`);
        setUserRole(response.data.data.user_type);
        setImage(response.data.data.image);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [userRole, user_id]);

  const handleLogout = () => {
    // Clear local storage and navigate to the login page
    localStorage.clear();
    setLoggedIn(null);
    navigate("/");
  };

  return (
    <div className="sidebar">
      <Button
        style={{
          marginTop: "10px",
          background: "transparent",
          padding: "0px",
          // position: "sticky",
          // // zIndex: ,
          // top: "0px",
          left: "15px",
        }}
        className={`hamburger ${openMenu ? "active" : ""}`}
        onClick={() => setOpenMenu(!openMenu)}
      >
        <span></span>
        <span></span>
        <span></span>
      </Button>
      <aside className={`${openMenu ? "" : "hidden"}`}>
        <img src={logo} alt="Logo " className="logo" />
        <div className="sidebar-profile">
          <Link to="/dashboard" onClick={() => setOpenMenu(!openMenu)}>
            <img src={image} alt="" />
          </Link>
          <p className="sidebar-user-role">
            {userRole === "admin" ? "Employer" : "Employee"}
          </p>
        </div>

        <nav>
          <Link
            to="/dashboard"
            className="sidebar-link"
            onClick={() => setOpenMenu(!openMenu)}
          >
            Your Profile
          </Link>

          {userRole === "admin" && (
            <Link
              to="/employee"
              className="sidebar-link"
              onClick={() => setOpenMenu(!openMenu)}
            >
              Employees Record
            </Link>
          )}

          <Link
            to="/scan"
            className="sidebar-link"
            onClick={() => setOpenMenu(!openMenu)}
          >
            Scan Items
          </Link>

          <Link
            to="/itemList"
            className="sidebar-link"
            onClick={() => setOpenMenu(!openMenu)}
          >
            Scanned Report{" "}
          </Link>

          <Link
            to="/chat"
            className="sidebar-link"
            onClick={() => setOpenMenu(!openMenu)}
          >
            Chat
          </Link>
        </nav>

        <div className="sidebar-logout">
          <button onClick={handleLogout} className="sidebar-logout-btn">
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Navbar;
