import { useState, useEffect } from "react";
import MyContext from "./MyContext";

const MyProvider = ({ children }) => {
  const [adminEmail, setAdminEmail] = useState("your admin email");
  const [companyName, setCompanyName] = useState("your company");
  const [companyData, setCompanyData] = useState(null);
  const [userData, setUserData] = useState("");
  const [posts, setPosts] = useState([]);
  const [loggedOut, setLoggedOut] = useState(false);
  const [companyRegistered, setCompanyRegistered] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [savedPosts, setSavedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const updateCompanyData = (newData) => {
    setCompanyData(newData);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/myProfile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        const formattedDate = new Date(data.dateOfBirth)
          .toISOString()
          .split("T")[0];
        setUserData({ ...data, dateOfBirth: formattedDate });
        setSavedPosts(data.savedPosts);
      } catch (error) {
        setUserData(null);
      }
    };
    getUser();
  }, []);

  const handleLogout = () => {
    setUserData(null);
  };
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  return (
    <MyContext.Provider
      value={{
        adminEmail,
        setAdminEmail,
        companyName,
        setCompanyName,
        companyData,
        updateCompanyData,
        userData,
        setUserData,
        posts,
        setPosts,
        loggedOut,
        setLoggedOut,
        companyRegistered,
        setCompanyRegistered,
        handleLogout,
        sessionExpired,
        setSessionExpired,
        savedPosts,
        setSavedPosts,
        likedPosts,
        setLikedPosts,
        isDarkMode, 
        toggleDarkMode, 
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
export default MyProvider;
