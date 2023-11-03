// import { useState, useEffect } from "react";
// import MyContext from "./MyContext";

// const MyProvider = ({ children }) => {
//   const [adminEmail, setAdminEmail] = useState("your admin email");
//   const [companyName, setCompanyName] = useState("your company");
//   const [companyData, setCompanyData] = useState(null);
//   const [userData, setUserData] = useState("");
//   const [posts, setPosts] = useState([]);

//   const updateCompanyData = (newData) => {
//     setCompanyData(newData);
//   };

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/user/myProfile", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         });
//         const data = await response.json();
//         const formattedDate = new Date(data.dateOfBirth)
//         .toISOString()
//         .split("T")[0];
//         setUserData({...data, dateOfBirth: formattedDate});

//       } catch (error) {
//         setUserData(null);
//       }
//     };
//     getUser();
//   },[]);

//   return (
//     <MyContext.Provider
//       value={{
//         adminEmail,
//         setAdminEmail,
//         companyName,
//         setCompanyName,
//         companyData,
//         updateCompanyData,
//         userData,
//         setUserData,
//         posts,
//         setPosts,
//       }}
//     >
//       {children}
//     </MyContext.Provider>
//   );
// };
// export default MyProvider;

import { useState, useEffect } from "react";
import MyContext from "./MyContext";

const MyProvider = ({ children }) => {
  const [adminEmail, setAdminEmail] = useState("your admin email");
  const [companyName, setCompanyName] = useState("your company");
  const [companyData, setCompanyData] = useState(null);
  const [userData, setUserData] = useState("");
  const [posts, setPosts] = useState([]);
  const [loggedOut, setLoggedOut] = useState(false)
  const [companyRegistered, setCompanyRegistered] = useState(false)

  const updateCompanyData = (newData) => {
    setCompanyData(newData);
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
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
          const formattedDate = new Date(data.dateOfBirth)
            .toISOString()
            .split("T")[0];
          setUserData({ ...data, dateOfBirth: formattedDate });

          // Store the fetched userData in local storage
          localStorage.setItem("userData", JSON.stringify(data));
        } catch (error) {
          setUserData(null);
        }
      };
      getUser();
    }
  }, []);

   const handleLogout = () => {
     // Clear the userData from local storage
     localStorage.removeItem("userData");

     // Clear the userData state
     setUserData(null);

     // Perform any additional logout operations as needed
     // For example, you might want to redirect the user to the login page
     // or perform other cleanup tasks.
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
        handleLogout
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
export default MyProvider;
