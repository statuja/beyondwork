import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import UserData from "../../components/UserData/UserData";
import profileCover from "../../images/profile_cover.jpg";
import profileAvatar from "../../images/profile_avatar.jpg";
import MyContext from "../../context/MyContext";
import "./MyProfile.scss";

const UserProfile = () => {
  const { userData } = useContext(MyContext);
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id === "me") {
      setUser(userData); // If it's the user's own profile
      setLoading(false);
    } else {
      // Fetch user data by ID (you need to define the fetching logic)
      const fetchUserDataById = async (userId) => {
        try {
          const response = await fetch(
            `http://localhost:5000/user/getUserProfile/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          if (response.ok) {
            const data = await response.json();
            return data;
          } else {
            // Handle non-200 HTTP response, e.g., user not found or other errors
            throw new Error(
              `Failed to fetch user data. Status: ${response.status}`
            );
          }
        } catch (error) {
          // Handle network errors or any other unexpected issues
          throw new Error(`Error fetching user data: ${error.message}`);
        }
      };
      fetchUserDataById(id)
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user details", error);
          setLoading(false);
        });
    }
  }, [id, userData]);

  return (
    <>
      <div className="profile">
        <div className="left">
          <div className="cover">
            <img className="coverImg" src={profileCover} alt="cover" />
            <img className="userImg" src={profileAvatar} alt="avatar" />
          </div>

          <div className="bottom">
            {loading ? (
              <p>Loading...</p>
            ) : user ? (
              <UserData isMe={id === "me"} user={user} />
            ) : (
              <p>User not found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
