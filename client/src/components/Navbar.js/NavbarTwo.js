import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegUser } from "react-icons/fa";
import { BiQrScan, BiChat, BiLogOut } from "react-icons/bi";
import { TbReport } from "react-icons/tb";
import "./NavbarTwo.css";
import { AuthContext } from "../../context/authContext";
import Notification from "../Notification/Notification";

const NavbarTwo = ({ setLoggedIn, openMenu, setOpenMenu }) => {
  // const [userRole, setUserRole] = useState("");
  // const [image, setImage] = useState("");
  // const [name, setName] = useState("");
  const navigate = useNavigate();
  // const user_id = localStorage.getItem("user_id");

  const { user, logoutUser } = useContext(AuthContext);

  // useEffect(() => {
  //   // Fetch user data and set the user role and profile pic
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get(`/api/users/${user_id}`);
  //       setUserRole(response.data.data.user_type);
  //       setImage(response.data.data.image);
  //       setName(
  //         response.data.data.firstName + " " + response.data.data.lastName
  //       );
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchUserData();
  // }, [userRole, user_id]);

  // const handleLogout = () => {
  //   // Clear local storage and navigate to the login page
  //   localStorage.clear();
  //   setLoggedIn(null);
  //   navigate("/");
  // };

  return (
    <div className="navigation-container">
      <div className="navigation-top">
        <div className="avatar-container">
          <div className="avatar">
            <img src={user?.image} alt="avatar" className="img-fluid" />
          </div>
          <div className="avatar-details">
            <h3>{user?.firstName + " " + user?.lastName}</h3>
            {/* <p>{userRole === "admin" ? "Employer" : "Employee"}</p> */}
            <p>{user?.user_type}</p>
          </div>
        </div>

        <Notification />
      </div>
      <div className="navigation-bottom">
        <ul>
          <li>
            <Link to="/dashboard">
              <FaRegUser className="icon" />
              Your Profile
            </Link>
          </li>
          <li>
            <Link to="/scan">
              <BiQrScan className="icon" />
              Scan Items
            </Link>
          </li>
          <li>
            <Link to="/itemList">
              <TbReport className="icon report-icon" />
              Scanned Report
            </Link>
          </li>
          <li>
            <Link to="/chat" className="active">
              <BiChat className="icon chat-icon" />
              Chat
            </Link>
          </li>
          <li>
            <button onClick={logoutUser}>
              <BiLogOut className="icon chat-icon" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarTwo;
