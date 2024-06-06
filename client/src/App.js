import { Dashboard, Login, Signup } from "./pages";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useContext, useEffect, useState } from "react";
import Profile from "./pages/Profile/Profile";
// import Navbar from "./components/Navbar.js/Navbar";
import Navbar from "./components/Navbar.js/NavbarTwo";
import Topbar from "./components/Topbar/Topbar";
import QrScanner from "./components/QrScanner/QrScanner";
import "react-toastify/dist/ReactToastify.css";
import ItemList from "./pages/ItemList/ItemList";
import EditItem from "./pages/EditItems/EditItem";
import Chat from "./pages/Chat/Chat";
import { Button } from "react-bootstrap";
import MessageForm from "./components/MessageForm/MessageForm";
import Message from "./components/MessageForm/Message";
import LandingPage from "./pages/LandingPage/LandingPage";
import ChatStart from "./components/ChatStart/ChatStart";
import axios from "axios";
import Footer from "./components/Footer/Footer";
import { AuthContext } from "./context/authContext";
import { ChatContextProvider } from "./context/chatContext";

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("user_id"));
  const [isAdmin, setIsAdmin] = useState(false);
  const userLocalStorage = JSON.parse(localStorage.getItem("User"));
  const [openMenu, setOpenMenu] = useState(false);

  const { user } = useContext(AuthContext);

  // const getAdmin = async () => {
  //   const data = await axios.get("/api/users/getAdmin");
  //   if (data.data.data[0]._id === userLocalStorage?._id) {
  //     setIsAdmin(true);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("beforeinstallprompt", (event) => {
  //     event.preventDefault(); // Prevent the default prompt from showing
  //     getAdmin();
  //     // Store the deferred prompt for later use
  //     setDeferredPrompt(event);
  //   });
  // }, [deferredPrompt]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      console.log("beforeinstallprompt event fired");
      event.preventDefault(); // Prevent the default prompt from showing
      getAdmin();
      setDeferredPrompt(event); // Store the deferred prompt for later use
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if the event listener is added
    console.log("Added event listener for beforeinstallprompt");

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  useEffect(() => {
    console.log("DEFERRED PROMPT", deferredPrompt);
  }, [deferredPrompt]);

  // const handleInstallClick = () => {
  //   if (deferredPrompt) {
  //     // Show the install prompt
  //     deferredPrompt.prompt();
  //     console.log("first");
  //     // Wait for the user to respond to the prompt
  //     deferredPrompt.userChoice.then((choiceResult) => {
  //       // Reset the deferred prompt so it can be used again
  //       setDeferredPrompt(null);
  //     });
  //   }
  // };

  const handleInstallClick = () => {
    if (deferredPrompt) {
      console.log("Prompting install");
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null); // Reset the deferred prompt
      });
    } else {
      console.log("No deferred prompt available");
    }
  };

  const chats = [
    {
      id: "group-12345",
      name: "General Group",
      message: "Last message in General",
      time: "1h",
      image: "https://example.com/image.jpg",
    },
    {
      id: "user-1",
      name: "John Doe",
      message: "Hey, how are you?",
      time: "20m",
      image: "https://example.com/image.jpg",
    },
    // Add more chats as needed
  ];

  return (
    <ChatContextProvider user={user}>
      {/* <Button
        style={{
          position: "absolute",
          zIndex: 1,
          top: "10px",
          right: "25px",
        }}
        className="install-btn"
        onClick={handleInstallClick}
      >
        Install
      </Button> */}

      <Topbar loggedIn={user} handleInstallClick={handleInstallClick} />

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
        {user && (
          <Navbar
            setLoggedIn={setLoggedIn}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          />
        )}

        <main className={!user && "active-main"}>
          <Routes>
            <Route
              path="/"
              element={
                user ? <Navigate replace to={"/dashboard"} /> : <LandingPage />
              }
            />
            <Route
              path="/dashboard"
              element={
                user ? <Dashboard /> : <Navigate replace to={"/login"} />
              }
            />
            <Route
              path="/employee"
              element={user ? <Profile /> : <Navigate replace to={"/login"} />}
            />
            <Route
              path="/scan"
              element={
                user ? <QrScanner /> : <Navigate replace to={"/login"} />
              }
            />
            <Route
              path="/itemList"
              element={user ? <ItemList /> : <Navigate replace to={"/login"} />}
            />
            <Route
              path="/editItems"
              element={user ? <EditItem /> : <Navigate replace to={"/login"} />}
            />
            <Route
              path="/chat"
              element={
                user ? (
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
                  // <MessageForm isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
                  <Message
                    isAdmin={isAdmin}
                    setIsAdmin={setIsAdmin}
                    chats={chats}
                  />
                }
              />
            </Route>

            <Route
              path="/login"
              element={
                user ? <Navigate replace to={"/dashboard"} /> : <Login />
              }
            />
            <Route
              path="/register"
              element={
                user ? <Navigate replace to={"/dashboard"} /> : <Signup />
              }
            />
          </Routes>
          {/* <Footer /> */}
        </main>
      </div>
    </ChatContextProvider>
  );
};

export default App;
