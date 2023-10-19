import React from "react";
import { useState, useEffect } from "react";
import MyContext from "./MyContext";

const MyProvider = ({ children }) => {
  // const [userCompany, setUserCompany] = useState("");
  const [adminEmail, setAdminEmail] = useState("your admin email");
  const [companyName, setCompanyName] = useState("your company");
  const [companyData, setCompanyData] = useState(null);
  const [userData, setUserData] = useState(null);
  // const [userId, setUserId] = useState("");

  const updateCompanyData = (newData) => {
    setCompanyData(newData);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/myProfile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        setUserData(response);
      } catch (error) {
        setUserData(null);
      }
    };
    getUser();
  }, []);

  // const handlePostCreated = (newPost) => {
  //   setPosts([newPost, ...posts]);
  // };

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
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
export default MyProvider;
