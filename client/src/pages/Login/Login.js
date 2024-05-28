import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Login = ({ setLoggedIn }) => {
  const { updateLoginInfo, loginUser, loginInfo, error, isLoading } =
    useContext(AuthContext);

  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const navigate = useNavigate();

  //   const handleInputChange = (event) => {
  //     const { name, value } = event.target;
  //     if (name === "email") {
  //       setEmail(value);
  //     } else if (name === "password") {
  //       setPassword(value);
  //     }
  //   };

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     try {
  //       const response = await axios.post("/api/users/login", {
  //         email,
  //         password,
  //       });
  //       localStorage.setItem("user_id", response.data.data._id);
  //       setLoggedIn(true);
  //       navigate("/dashboard");
  //     } catch (error) {
  //       alert("Invalid Credentials");
  //     }

  //     // code to submit login form
  //   };

  return (
    <div className="login-page">
      <h1 className="login-heading">Login</h1>
      <form className="login-form" onSubmit={loginUser}>
        <label className="login-label">
          Email:
          <input
            type="email"
            name="email"
            value={loginInfo.email}
            // onChange={handleInputChange}
            onChange={(e) =>
              updateLoginInfo({ ...loginInfo, email: e.target.value })
            }
            className="login-input"
          />
        </label>
        <label className="login-label">
          Password:
          <input
            type="password"
            name="password"
            value={loginInfo.password}
            onChange={(e) =>
              updateLoginInfo({ ...loginInfo, password: e.target.value })
            }
            className="login-input"
          />
        </label>
        {error?.error && <div className="error-message">{error?.message}</div>}
        <button type="submit" className="login-button">
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
      <p className="login-signup-link">
        Don't have an account? <Link to="/register">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
