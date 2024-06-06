import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../../context/authContext";
import loginImg from "../../assets/login-img.svg";

const Login = ({ setLoggedIn }) => {
  const { updateLoginInfo, loginUser, loginInfo, error, isLoading } =
    useContext(AuthContext);

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-left login-left">
          <div className="auth-left-header">
            <h2>Welcome Back!</h2>
            <p>
              Log in to manage your inventory efficiently and keep track of your
              stock seamlessly.
            </p>
          </div>

          <form className="login-form" onSubmit={loginUser}>
            {/* <div className="input-box-wrapper"> */}
            <div className="input-box">
              <label className="login-label">Email</label>
              <input
                type="email"
                name="email"
                value={loginInfo.email}
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, email: e.target.value })
                }
                className="login-input"
                placeholder="Enter your email"
              />
            </div>
            <div className="input-box">
              <label className="login-label">Password</label>
              <input
                type="password"
                name="password"
                value={loginInfo.password}
                onChange={(e) =>
                  updateLoginInfo({
                    ...loginInfo,
                    password: e.target.value,
                  })
                }
                className="login-input"
                placeholder="Enter your password"
              />
            </div>
            {/* </div> */}

            {error?.error && (
              <div className="error-message">{error?.message}</div>
            )}
            <button type="submit" className="login-button">
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
          <div className="redirect-link">
            <p>Don't have an account?</p>
            <Link to="/register">Sign up here</Link>
          </div>
        </div>
        <div className="auth-right">
          <img src={loginImg} alt="signup" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default Login;
