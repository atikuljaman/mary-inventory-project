import React from "react";
import "./styles.css";
import logo from "../../assets/vector-file.png";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-content">
          <img src={logo} style={{ marginBottom:'30px' }} alt="Inventory Management Logo" />
        <h2>Dental Dashboard</h2>
        <p>
          {" "}
          Inventory Management System and the information that is most important
          for our team.
        </p>
        <Link to="/login">
          <button>Get started</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
