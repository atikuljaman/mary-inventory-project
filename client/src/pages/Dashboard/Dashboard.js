import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import UserCard from "../../components/UserCard/UserCard";
import moment from "moment";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const localStorageUser = JSON.parse(localStorage.getItem("User"));
  // console.log("User ID:", user_id);
  const getUser = async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/users/find/${id}`
    );
    // console.log("response", response.data._id);
    setUser(response.data);
  };
  //  logout if last login is more than 2 hours ago
  const logout = async () => {
    const lastLogin = moment(user?.last_login);
    const now = moment();
    const diff = now.diff(lastLogin, "minutes");
    if (diff > 119) {
      localStorage.clear();
      localStorage.removeItem("User");
      window.location.replace("/");
    }
  };

  useEffect(() => {
    getUser(localStorageUser?._id);
  }, []);

  useEffect(() => {
    logout();
  }, [user]);

  if (!user) {
    return (
      <div className="loader">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45"></circle>
        </svg>
      </div>
    );
  }
  return (
    <div className="dashboard mt-5 mt-md-0">
      <h1 className="sec-title">Your Information</h1>
      <UserCard
        getUser={getUser}
        image={user.image}
        firstName={user.firstName}
        lastName={user.lastName}
        lastLogin={moment(user.last_login).fromNow()}
        email={user.email}
        employer={user.user_type === "admin" ? "Employer" : "Employee"}
      />
    </div>
  );
};

export default Dashboard;
