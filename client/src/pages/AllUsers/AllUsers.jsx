import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyContext from "../../context/MyContext";
import "./AllUsers.scss";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

function AllUsers() {
  const { userData } = useContext(MyContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/user/allUsers/${userData.userCompany}`,
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
        const data = await response.json();

        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        setError(error.message);
      }
    };
    if (userData) {
      fetchAllUsers();
    }
  }, [userData]);
  if (error) {
    return (
      <div className="user-cards-container">
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }
  return (
    <div className="user-cards-container">
      <h2>User List</h2>
      <div className="user-cards">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <MailOutlineIcon className="icon" />
            <div className="user-image-placeholder"></div>
            <div className="user-details">
              <p>
                <b>Name: </b>
                <Link to={`/user/profile/${user._id}`}>
                  {user.userFullName}
                </Link>{" "}
              </p>
              <p>
                <b>Job Title:</b> {user.userJobTitle}
              </p>
              <p>
                <b>Department:</b> {user.userDepartment}
              </p>
              <p>
                <b>Email:</b> {user.userContact.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllUsers;
