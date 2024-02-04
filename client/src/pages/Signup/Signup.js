import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("client");
  const [imageURL, setImageURL] = useState("");
  const [error, setError] = useState("");
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/users", {
        firstName,
        lastName,
        email,
        username,
        user_type: userType,
        password,
        image: imageURL,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError("Error Signup");
    }
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "sch3ictu"); // replace with your upload preset

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dyeh9qzrd/image/upload", // replace with your Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setImageURL(data.secure_url);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Choose Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userType">User Type</label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="client">Employee</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Profile Image</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Sign Up</button>
      </form>
      <div className="redirect-link">
        <p>Already have an account?</p>
        <Link to="/login" class="text">Log In</Link>
      </div>
    </div>
  );
};
export default Signup;
