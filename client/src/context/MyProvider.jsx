import React from "react";
import { useState } from "react";
import MyContext from "./MyContext";

const MyProvider = ({ children }) => {
  const [userCompany, setUserCompany] = useState("");

  return <MyContext.Provider value={{userCompany,setUserCompany}}>{children}</MyContext.Provider>;
};
export default MyProvider;
