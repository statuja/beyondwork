import React from "react";
import { useState } from "react";
import MyContext from "./MyContext";

const MyProvider = ({ children }) => {
  const [userCompany, setUserCompany] = useState("");
  const [adminEmail, setAdminEmail] = useState("your admin email");
  const [companyName, setCompanyName] = useState("your company");
  const [companyData, setCompanyData] = useState(null);
  const updateCompanyData = (newData) => {
    setCompanyData(newData);
  };
  return (
    <MyContext.Provider
      value={{
        userCompany,
        setUserCompany,
        adminEmail,
        setAdminEmail,
        companyName,
        setCompanyName,
        companyData,
        updateCompanyData,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
export default MyProvider;
