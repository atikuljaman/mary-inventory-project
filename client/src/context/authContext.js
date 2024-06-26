import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest, baseUrl } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    user_type: "Employee",
    image: "",
  });

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [adminUpdatedImage, setAdminUpdatedImage] = useState(""); // State to store Navbar image

  // Callback function to update Navbar image
  const updateAdminImage = (newImage) => {
    setAdminUpdatedImage(newImage);
  };

  useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user));
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo((prevInfo) => ({
      ...prevInfo,
      ...info,
    }));
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);

      const response = await postRequest(
        `${baseUrl}/users/register`,
        registerInfo
      );

      setIsLoading(false);

      if (response.error) {
        return setError(response);
      } else {
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
      }
    },
    [registerInfo]
  );

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);

      const response = await postRequest(`${baseUrl}/users/login`, loginInfo);

      setIsLoading(false);

      if (response.error) {
        return setError(response);
      } else {
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
      }
    },
    [loginInfo]
  );

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  const toggleSideBar = useCallback(() => {
    setIsSideBarOpen(!isSideBarOpen);
  }, [isSideBarOpen]);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        updateLoginInfo,
        registerUser,
        loginUser,
        loginInfo,
        logoutUser,
        error,
        isLoading,
        toggleSideBar,
        setIsSideBarOpen,
        isSideBarOpen,
        updateAdminImage,
        adminUpdatedImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
