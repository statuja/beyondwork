import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../context/MyContext";
import "./AllUsers.scss";

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
    return <div>Error: {error}</div>;
  }
  return (
    <div className="user-cards-container">
      <h2>User List</h2>
      <div className="user-cards">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <div className="user-image-placeholder"></div>
            <div className="user-details">
              <p>Name: {user.userFullName}</p>

              <p>Job Title: {user.userJobTitle}</p>
              <p>Department: {user.userDepartment}</p>
              <p>Email: {user.userContact.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllUsers;
