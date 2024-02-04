import { Dashboard, Login, Signup } from "./pages";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/Navbar.js/Navbar";
import QrScanner from "./components/QrScanner/QrScanner";
import "react-toastify/dist/ReactToastify.css";
import ItemList from "./pages/ItemList/ItemList";
import EditItem from "./pages/EditItems/EditItem";
import Chat from "./pages/Chat/Chat";
import { Button } from "react-bootstrap";
import MessageForm from "./components/MessageForm/MessageForm";
import LandingPage from "./pages/LandingPage/LandingPage";
import ChatStart from "./components/ChatStart/ChatStart";
import axios from "axios";
import Footer from "./components/Footer/Footer";

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("user_id"));
  const [isAdmin, setIsAdmin] = useState(false);
  const user_id = localStorage.getItem("user_id");
  const [openMenu, setOpenMenu] = useState(false);
  const getAdmin = async () => {
    const data = await axios.get("/api/users/getAdmin");
    if (data.data.data[0]._id === user_id) {
      setIsAdmin(true);
    }
  };
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault(); // Prevent the default prompt from showing
      getAdmin();
      // Store the deferred prompt for later use
      setDeferredPrompt(event);
    });
  }, [deferredPrompt]);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      console.log("first");
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        // Reset the deferred prompt so it can be used again
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <>
    <Button
          style={
            {
              position: "absolute",
              zIndex: 1,
              top: "10px",
              right: "25px",
            }
          }
          className="install-btn"
          onClick={handleInstallClick}
        >
          Install
        </Button>

        
        {/* {loggedIn && (
          <Button
            style={
              {
                background:'transparent',
                padding: "0px",
                position: "sticky",
                // zIndex: ,
                top: "0px",
                left: "15px",
              }
            }
            className={`hamburger ${openMenu ? "active" : ""}`}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <span></span>
            <span></span>
            <span></span>
          </Button>
        )} */}
      <div className="main_container">
        {loggedIn && (
          <Navbar
            setLoggedIn={setLoggedIn}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          />
        )}

        <main>
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate replace to={"/dashboard"} />
                ) : (
                  <LandingPage />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                loggedIn ? <Dashboard /> : <Navigate replace to={"/login"} />
              }
            />
            <Route
              path="/employee"
              element={
                loggedIn ? <Profile /> : <Navigate replace to={"/login"} />
              }
            />
            <Route
              path="/scan"
              element={
                loggedIn ? <QrScanner /> : <Navigate replace to={"/login"} />
              }
            />
            <Route
              path="/itemList"
              element={
                loggedIn ? <ItemList /> : <Navigate replace to={"/login"} />
              }
            />
            <Route
              path="/editItems"
              element={
                loggedIn ? <EditItem /> : <Navigate replace to={"/login"} />
              }
            />
            <Route
              path="/chat"
              element={
                loggedIn ? (
                  <Chat isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
                ) : (
                  <Navigate replace to={"/login"} />
                )
              }
            >
              <Route
                path=""
                element={
                  <ChatStart isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
                }
              />
              <Route
                path="start"
                element={
                  <MessageForm isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
                }
              />
            </Route>

            <Route
              path="/login"
              element={<Login setLoggedIn={setLoggedIn} />}
            />
            <Route path="/register" element={<Signup />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default App;
