import { useState, useEffect } from "react";
import MyContext from "./MyContext";

const MyProvider = ({ children }) => {
  const [adminEmail, setAdminEmail] = useState("your admin email");
  const [companyName, setCompanyName] = useState("your company");
  const [companyData, setCompanyData] = useState(null);
  const [userData, setUserData] = useState("");
  const [posts, setPosts] = useState([]);

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
        const data = await response.json();

        setUserData(data);
      } catch (error) {
        setUserData(null);
      }
    };
    getUser();
  }, []);

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
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
export default MyProvider;
