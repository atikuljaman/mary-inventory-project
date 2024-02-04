import React, { useState } from "react";
import { useEffect } from "react";
import "./UserCard.css";
import axios from "axios";

const UserCard = ({
  image,
  firstName,
  lastName,
  email,
  employer,
  status,
  lastLogin,
  getUser,
}) => {
  const user_id = localStorage.getItem("user_id");
  const [loading, setLoading] = useState(false);
  const handleImage = async (e) => {
    const file = e.target.files[0];

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "sch3ictu"); // replace with your upload preset

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dyeh9qzrd/image/upload`, // replace with your Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      updateImage(data.secure_url);
    } catch (err) {
      alert(err);
    }
  };

  const updateImage = async (url) => {
    try {
      setLoading(true);
      await axios.post("/api/users/update", { image: url });

      setLoading(false);
      getUser(user_id);
    } catch (error) {
      alert("Not Updated");
    }
  };

  useEffect(() => {
      document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);



  return (
    <div className="user-card-container">
      {!loading && (
        <div className="user-card">
          <div className="user-card-image">
            <img src={image} alt={firstName} />
          </div>
          <div className="user-card-details">
            <h3>
              {firstName} {lastName}
            </h3>
            <p>{email}</p>
            <p>{employer}</p>
            <p>{status}</p>
            <p>Last login: {lastLogin}</p>
          </div>
          {employer === "Employer" && (
            <>
              {/* <label for="upload" class="upload-button">
                <span class="button-text">Upload File</span>
                <input type="file" id="upload" class="file-input" />
              </label> */}
              <div className="img-upload">
                <input onChange={handleImage} 
                  type="file"
                  className="custom-file-input"
                  id="uploadInput"
                  accept="image/*"
                  hidden
                />
                <label for="uploadInput" className="custom-file-label">
                  Change Image
                </label>
              </div>
              {/* <input onChange={handleImage} type="file" name="" id="" value="Change Image" /> */}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;
