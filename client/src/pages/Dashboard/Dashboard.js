import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import UserCard from "../../components/UserCard/UserCard";
import moment from "moment";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const user_id = localStorage.getItem("user_id");
  const getUser = async (id) => {
    const response = await axios.get(`/api/users/${id}`);
    setUser(response.data.data);
  };
  //  logout if last login is more than 2 hours ago
  const logout = async () => {
    const lastLogin = moment(user?.last_login);
    const now = moment();
    const diff = now.diff(lastLogin, "minutes");
    console.log(diff);
    if (diff > 119) {
      localStorage.clear()
      localStorage.removeItem("user_id");
      window.location.replace("/");
    }
  };

  useEffect(() => {
    getUser(user_id);
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
      <h1 className="yourInfo">Your Information</h1>
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
