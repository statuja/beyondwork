import React from "react";
import { useState } from "react";
import MyContext from "./MyContext";

const MyProvider = ({ children }) => {
  const [userCompany, setUserCompany] = useState("");
  const [adminEmail, setAdminEmail] = useState("your admin email");
  const [companyName, setCompanyName] = useState("your company");

  return (
    <MyContext.Provider
      value={{
        userCompany,
        setUserCompany,
        adminEmail,
        setAdminEmail,
        companyName,
        setCompanyName,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
export default MyProvider;
