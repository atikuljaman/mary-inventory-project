import React, { useState } from "react";
import { useEffect } from "react";
import QrReader from "react-web-qr-reader";
import axios from "axios";
import "./QrScanner.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Example = () => {
  const delay = 500;
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();

  // const previewStyle = {
  //   height: 240,
  //  width: 320,
  // };
  const [shown, setShown] = useState(false);
  const [result, setResult] = useState("No result");

  const addtodatabase = async (name, type) => {
    try {
      const data = await axios.post("/api/items/sold", {
        type,
        name,
        user_id,
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
      if (data) {
        setResult(data.data);
        setShown(false);

        const item_details = JSON.parse(data.data);
        const type = item_details.type;
        console.log(item_details);
        addtodatabase(item_details.name, type ? type : null);
      }
    } catch (error) {
      toast.error("This QR code is not acceptable!");
      console.log(error);
    }
  };

  const handleError = (error) => {
    console.log(error);
  };

  useEffect(() => {
    if (shown) {
    document.body.style.overflow = "auto";
    document.querySelector(".scanner-window").scrollIntoView({ behavior: "smooth" });
    document.body.style.overflowX = "hidden";

} else {
  document.body.style.overflow = "hidden";
}

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [shown]);
  return (
    <div class='parent'>
      <ToastContainer />
      <h2 className="main_title">Scan Item's QR code</h2>
      <button className="scan-btn" onClick={() => setShown(!shown)}>
        {shown ? (
          <i className="fa fa-times" aria-hidden="true"></i>
        ) : (
          <i className="fa-sharp fa-solid fa-qrcode"></i>
        )}
      </button>
      {shown && (
        <div className="scanner-window">
          <div className="camera-container">
            <QrReader
              delay={delay}
              //style={previewStyle}
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

export default Example;
