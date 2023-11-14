import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import "./AllUsers.scss";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllUsers() {
  const navigate = useNavigate();
  const { userData, setSessionExpired, isDarkMode } = useContext(MyContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user/allUsers/${userData.userCompany}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        if (response.ok) {
          const data = await response.json();
          if (data.success === false) {
            setSessionExpired(true);
            setUsers({});
            return navigate("/");
          }
          if (Array.isArray(data)) {
            setUsers(data);
            console.log(users);
          }
        } else {
          toast.error("Invalid data format.");
          throw new Error("Invalid data format");
        }
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      }
    };
    if (userData) {
      fetchAllUsers();
    }
  }, [userData]);

  return (
    <div className={`wrapper ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div
        className={`user-cards-container ${
          isDarkMode ? "dark-mode" : "light-mode"
        }`}
      >
        <h1>Your Colleagues</h1>
        <div
          className={`user-cards ${isDarkMode ? "dark-mode" : "light-mode"}`}
        >
          {users.map((user) => (
            <div
              key={user._id}
              className={`user-card ${isDarkMode ? "dark-mode" : "light-mode"}`}
            >
              <MailOutlineIcon
                className={`icon ${isDarkMode ? "dark-mode" : "light-mode"} `}
              />
              <Link to={`/user/profile/${user._id}`}>
                <div className="user-image-placeholder">
                  {user && user.userImage && (
                    <img
                      className="user-image-placeholder"
                      src={`${process.env.REACT_APP_BACKEND_URL}/user/uploads/${user.userImage}`}
                      alt="userImage"
                    />
                  )}
                </div>
              </Link>
              <div className="user-details">
                <p>
                  <b>Name: </b>

                  {user.userFullName}
                </p>
                <p>
                  <b>Job Title:</b> {user.userJobTitle}
                </p>
                <p>
                  <b>Department:</b> {user.userDepartment}
                </p>
                <p className="emails">
                  <b>Email:</b> {user.userContact.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      ></ToastContainer>
    </div>
  );
}

export default AllUsers;
