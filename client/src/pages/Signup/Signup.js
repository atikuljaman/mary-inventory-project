import React, { useContext, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import signUpImg from "../../assets/sign-up-img.svg";
import "./Signup.css";

const Signup = () => {
  const { registerInfo, updateRegisterInfo, registerUser, error, isLoading } =
    useContext(AuthContext);

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    try {
      setLoading(true);

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
      // setImageURL(data.secure_url);
      setImagePreview(data.secure_url);
      updateRegisterInfo({ ...registerInfo, image: data.secure_url });
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false); // Set loading back to false after upload completes
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-left-header">
            <h2>Create an account</h2>
            <p>
              Streamline Your Inventory Management: Start by Creating Your
              Account Today!
            </p>
          </div>

          <form onSubmit={registerUser}>
            <div className="input-box-wrapper">
              <div className="input-box">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={registerInfo.firstName}
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      firstName: e.target.value,
                    })
                  }
                  placeholder="First Name"
                />
              </div>
              <div className="input-box">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={registerInfo.lastName}
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      lastName: e.target.value,
                    })
                  }
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="input-box-wrapper">
              <div className="input-box">
                <label htmlFor="username">Choose Username</label>
                <input
                  type="text"
                  id="username"
                  value={registerInfo.username}
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      username: e.target.value,
                    })
                  }
                  placeholder="Enter a Username"
                />
              </div>
              <div className="input-box">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={registerInfo.email}
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      email: e.target.value,
                    })
                  }
                  placeholder="Enter your Email"
                />
              </div>
            </div>

            <div className="input-box-wrapper">
              <div className="input-box">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={registerInfo.password}
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      password: e.target.value,
                    })
                  }
                  placeholder="Enter your Password"
                />
              </div>
              <div className="input-box">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={registerInfo.confirmPassword}
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm your Password"
                />
              </div>
            </div>

            <div className="input-box-wrapper">
              <div className="input-box user-type">
                <label htmlFor="userType">User Type</label>
                <select
                  id="userType"
                  value={registerInfo.user_type}
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      user_type: e.target.value,
                    })
                  }
                >
                  <option value="">Select User Type</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>

              <div className="avatar-input-box">
                <label htmlFor="image" className="avatar-label">
                  {loading ? (
                    <div className="img-loader">
                      <label className="">Profile Image</label>
                      <MoonLoader color="#101828" size={20} />
                    </div>
                  ) : imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Avatar Preview"
                      className="avatar-preview"
                    />
                  ) : (
                    <div className="input-box">
                      <label>Profile Image</label>
                      <div className="avatar-placeholder">Select Image</div>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            {error?.error && (
              <div className="error-message">{error?.message}</div>
            )}

            <button type="submit">
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </form>
          <div className="redirect-link">
            <p>Already have an account?</p>
            <Link to="/login" class="text">
              Log In
            </Link>
          </div>
        </div>
        <div className="auth-right">
          <img src={signUpImg} alt="signup" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};
export default Signup;
