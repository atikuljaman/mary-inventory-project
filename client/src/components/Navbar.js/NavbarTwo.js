import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import { BiQrScan, BiChat, BiLogOut } from "react-icons/bi";
import { RiMenu2Fill } from "react-icons/ri";
import { TbReport } from "react-icons/tb";
import "./NavbarTwo.css";
import { AuthContext } from "../../context/authContext";
import Notification from "../Notification/Notification";

const NavbarTwo = ({ setLoggedIn, openMenu, setOpenMenu }) => {
  const {
    user,
    logoutUser,
    isSideBarOpen,
    setIsSideBarOpen,
    toggleSideBar,
    adminUpdatedImage,
  } = useContext(AuthContext);

  return (
    <div className={`navigation-container ${isSideBarOpen ? "active" : ""} `}>
      <div className="navigation-top">
        <div className="avatar-container">
          <div className="avatar">
            <img
              src={adminUpdatedImage || user?.image}
              alt="avatar"
              className="img-fluid"
            />
          </div>
          <div className="avatar-details">
            <h3>{user?.firstName + " " + user?.lastName}</h3>
            {/* <p>{userRole === "admin" ? "Employer" : "Employee"}</p> */}
            <p>{user?.user_type === "admin" ? "Employer" : "Employee"}</p>
          </div>
        </div>

        <div className="navigation-btn-wrapper">
          <button onClick={toggleSideBar} className="toggle-btn">
            <RiMenu2Fill />
          </button>
          <Notification />
        </div>
      </div>
      <div className="navigation-bottom">
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive, isPending }) => {
                return isActive ? "active" : isPending ? "pending" : "";
              }}
              onClick={toggleSideBar}
            >
              <FaRegUser className="icon" />
              Your Profile
            </NavLink>
          </li>

          {user?.user_type === "admin" && (
            <li>
              <NavLink
                to="/employee"
                className={({ isActive, isPending }) => {
                  return isActive ? "active" : isPending ? "pending" : "";
                }}
                onClick={toggleSideBar}
              >
                <HiOutlineUsers className="icon employees-icon" />
                Employees Record
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/scan"
              className={({ isActive, isPending }) => {
                return isActive ? "active" : isPending ? "pending" : "";
              }}
              onClick={toggleSideBar}
            >
              <BiQrScan className="icon" />
              Scan Items
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/itemList"
              className={({ isActive, isPending }) => {
                return isActive ? "active" : isPending ? "pending" : "";
              }}
              onClick={toggleSideBar}
            >
              <TbReport className="icon report-icon" />
              Scanned Report
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chat"
              className={({ isActive, isPending }) => {
                return isActive ? "active" : isPending ? "pending" : "";
              }}
              onClick={toggleSideBar}
            >
              <BiChat className="icon chat-icon" />
              Chat
            </NavLink>
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
