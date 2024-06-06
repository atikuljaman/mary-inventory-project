// import React, { useState } from "react";
// import { useEffect } from "react";
// import { IoMailOutline } from "react-icons/io5";
// import { IoMdLogIn } from "react-icons/io";
// import { FaRegUser } from "react-icons/fa";
// import "./UserCard.css";
// import axios from "axios";

// const UserCard = ({
//   image,
//   firstName,
//   lastName,
//   email,
//   employer,
//   status,
//   lastLogin,
//   getUser,
// }) => {
//   const user = JSON.parse(localStorage.getItem("User"));

//   const [imagePreview, setImagePreview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleImage = async (e) => {
//     const file = e.target.files[0];

//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("upload_preset", "sch3ictu"); // replace with your upload preset

//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/dyeh9qzrd/image/upload`, // replace with your Cloudinary cloud name
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await res.json();
//       setImagePreview(data.secure_url);
//       updateImage(data.secure_url);
//     } catch (err) {
//       alert(err);
//     }
//   };

//   const updateImage = async (url) => {
//     try {
//       setLoading(true);
//       await axios.post("/api/users/update", { image: url });

//       setLoading(false);
//       getUser(user?._id);
//     } catch (error) {
//       alert("Not Updated");
//     }
//   };

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   return (
//     <div className="user-card-container">
//       {!loading && (
//         <div className="user-card">
//           <div className="user-card-image">
//             <img src={image} alt={firstName} />
//           </div>
//           <div className="user-card-details">
//             <h3>
//               {firstName} {lastName}
//             </h3>
//             <p>
//               <IoMailOutline className="icon" /> {email}
//             </p>
//             <p>
//               <FaRegUser className="icon" /> {employer}
//             </p>
//             <p>{status}</p>
//             <p>
//               <IoMdLogIn className="icon" /> Last login: {lastLogin}
//             </p>
//           </div>
//           {employer !== "Employer" && (
//             <>
//               {/* <label for="upload" class="upload-button">
//                 <span class="button-text">Upload File</span>
//                 <input type="file" id="upload" class="file-input" />
//               </label> */}
//               <div className="img-upload">
//                 <input
//                   onChange={handleImage}
//                   type="file"
//                   className="custom-file-input"
//                   id="uploadInput"
//                   accept="image/*"
//                   hidden
//                 />
//                 <label for="uploadInput" className="custom-file-label">
//                   Change Image
//                 </label>
//               </div>
//               {/* <input onChange={handleImage} type="file" name="" id="" value="Change Image" /> */}
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserCard;

import React, { useState, useEffect, useContext } from "react";
import { IoMailOutline } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";
import "./UserCard.css";
import { AuthContext } from "../../context/authContext";

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
  const { updateAdminImage } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("User"));

  const [loading, setLoading] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [imgChangeLoading, setImgChangeLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleImage = async (e) => {
    const file = e.target.files[0];

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "sch3ictu"); // replace with your upload preset

      setImgChangeLoading(true);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dyeh9qzrd/image/upload`, // replace with your Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setNewImage(data.secure_url);
      setImgChangeLoading(false);
      setShowConfirm(true);
    } catch (err) {
      alert(err);
    }
  };

  const confirmImageChange = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/users/update/image", {
        image: newImage,
      });

      setLoading(false);
      setShowConfirm(false);
      setNewImage(null);
      getUser(user?._id);

      // Call the context function to update Navbar image
      updateAdminImage(newImage);
    } catch (error) {
      alert("Not Updated");
      setLoading(false);
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
            {imgChangeLoading ? (
              <MoonLoader color="#101828" size={20} />
            ) : (
              <img src={newImage || image} alt={firstName} />
            )}
          </div>

          <div className="user-card-details">
            <h3>
              {firstName} {lastName}
            </h3>
            <p>
              <IoMailOutline className="icon" /> {email}
            </p>
            <p>
              <FaRegUser className="icon" /> {employer}
            </p>
            <p>{status}</p>
            <p>
              <IoMdLogIn className="icon" /> Last login: {lastLogin}
            </p>
          </div>
          {employer === "Employer" && (
            <div className="img-upload-container">
              <div className="img-upload">
                <input
                  onChange={handleImage}
                  type="file"
                  className="custom-file-input"
                  id="uploadInput"
                  accept="image/*"
                  hidden
                />
                <label htmlFor="uploadInput" className="custom-file-label">
                  Change Image
                </label>
              </div>
              {showConfirm && (
                <div className="confirm-button-container">
                  <button
                    onClick={confirmImageChange}
                    className="confirm-button"
                  >
                    Confirm
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;
