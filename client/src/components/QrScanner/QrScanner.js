// import React, { useState } from "react";
// import { useEffect } from "react";
// import QrReader from "react-web-qr-reader";
// import axios from "axios";
// import "./QrScanner.css";
// import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { BsQrCodeScan } from "react-icons/bs";
// import { FaArrowLeft } from "react-icons/fa";

// const Example = () => {
//   const delay = 500;
//   const user_id = localStorage.getItem("user_id");
//   const navigate = useNavigate();

//   // const previewStyle = {
//   //   height: 240,
//   //  width: 320,
//   // };
//   const [shown, setShown] = useState(false);
//   const [result, setResult] = useState("No result");

//   const addtodatabase = async (name, type) => {
//     try {
//       const data = await axios.post("/api/items/sold", {
//         type,
//         name,
//         user_id,
//       });
//       toast.success("Item Scanned!");
//       navigate("/");
//     } catch (error) {
//       toast.error("Data Duplicate");
//       setShown(true);
//     }
//   };
//   const handleScan = (data) => {
//     try {
//       if (data) {
//         setResult(data.data);
//         setShown(false);

//         const item_details = JSON.parse(data.data);
//         const type = item_details.type;
//         console.log(item_details);
//         addtodatabase(item_details.name, type ? type : null);
//       }
//     } catch (error) {
//       toast.error("This QR code is not acceptable!");
//       console.log(error);
//     }
//   };

//   const handleError = (error) => {
//     console.log(error);
//   };

//   useEffect(() => {
//     if (shown) {
//       document.body.style.overflow = "auto";
//       document
//         .querySelector(".scanner-window")
//         .scrollIntoView({ behavior: "smooth" });
//       document.body.style.overflowX = "hidden";
//     } else {
//       document.body.style.overflow = "hidden";
//     }

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [shown]);

//   return (
//     <div class="parent">
//       <ToastContainer />
//       <h2 className="sec-title">Scan Item's QR code</h2>

//       {!shown && (
//         <div className="scanner-btn-wrapper">
//           <button className="scan-btn" onClick={() => setShown(!shown)}>
//             <BsQrCodeScan />
//           </button>
//         </div>
//       )}

//       {shown && (
//         <div className="scanner-window">
//           <div className="scanner-window-header">
//             <button onClick={() => setShown(!shown)}>
//               <FaArrowLeft />
//             </button>
//             <h4>QR Scanner</h4>
//           </div>

//           <div className="camera-container">
//             <QrReader
//               delay={delay}
//               //style={previewStyle}
//               onError={handleError}
//               onScan={handleScan}
//               className="camera-preview"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Example;

// -------------------------------------------------
import React, { useState, useEffect } from "react";
import QrReader from "react-web-qr-reader";
import axios from "axios";
import "./QrScanner.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BsQrCodeScan } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";

const QrScanner = () => {
  const delay = 500;
  const user = localStorage.getItem("User");
  const navigate = useNavigate();

  const [shown, setShown] = useState(false);
  const [result, setResult] = useState("No result");

  const addtodatabase = async (name, type) => {
    try {
      await axios.post("http://localhost:5000/api/items/sold", {
        type,
        name,
        user_id: user?._id,
      });
      toast.success("Item Scanned!");
      navigate("/");
    } catch (error) {
      toast.error("Data Duplicate");
      setShown(true);
    }
  };

  const handleScan = (data) => {
    try {
      if (data && data.data) {
        setResult(data.data);
        setShown(false);

        let item_details;
        try {
          item_details = JSON.parse(data.data);
        } catch (parseError) {
          toast.error("Invalid QR code format!");
          console.error(parseError);
          return;
        }

        const { name, type } = item_details;
        if (!name) {
          toast.error("QR code does not contain valid item details!");
          return;
        }

        Swal.fire({
          title: "Confirm Scan",
          text: "Do you want to add this item to the database?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            addtodatabase(name, type ? type : null);
          } else {
            toast.info("Item not added to the database.");
          }
        });

        // addtodatabase(name, type ? type : null);
      }
    } catch (error) {
      toast.error("This QR code is not acceptable!");
      console.error(error);
    }
  };

  const handleError = (error) => {
    console.error(error);
    toast.error("QR code scanning failed!");
  };

  useEffect(() => {
    if (shown) {
      document.body.style.overflow = "auto";
      document
        .querySelector(".scanner-window")
        .scrollIntoView({ behavior: "smooth" });
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [shown]);

  return (
    <div className="parent">
      <ToastContainer />
      <h2 className="sec-title">Scan Item's QR code</h2>

      {!shown && (
        <div className="scanner-btn-wrapper">
          <button className="scan-btn" onClick={() => setShown(!shown)}>
            <BsQrCodeScan />
          </button>
        </div>
      )}

      {shown && (
        <div className="scanner-window">
          <div className="scanner-window-header">
            <button onClick={() => setShown(!shown)}>
              <FaArrowLeft />
            </button>
            <h4>QR Scanner</h4>
          </div>

          <div className="camera-container">
            <QrReader
              delay={delay}
              onError={handleError}
              onScan={handleScan}
              className="camera-preview"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QrScanner;
