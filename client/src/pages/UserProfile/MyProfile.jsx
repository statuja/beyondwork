import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import UserData from "../../components/UserData/UserData";
import MyContext from "../../context/MyContext";
import "./MyProfile.scss";

const UserProfile = () => {
  const navigate = useNavigate();
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
            setUser(data); // Set the user data including images
            // if (data.success === false) {
            //   alert("Server error");
            //   setUser({});
            //   return navigate("/");
            // }
            setLoading(false);
          } else {
            throw new Error(
              `Failed to fetch user data. Status: ${response.status}`
            );
          }
        } catch (error) {
          console.error("Error fetching user details", error);
          setLoading(false);
        }
      };
      fetchUserDataById(id);
    }
  }, [id, userData]);
  console.log(userData);
  return (
    <>
      <div className="profile">
        <div className="cover">
          {user && user.coverImage && (
            <img
              className="coverImg"
              src={`http://localhost:5000/user/uploads/${user.coverImage}`}
              alt="coverImage"
            />
          )}
          {user && user.userImage && (
            <img
              className="userImg"
              src={`http://localhost:5000/user/uploads/${user.userImage}`}
              alt="userImage"
            />
          )}
        </div>

        <div className="bottom">
          <div className="left">
            {loading ? (
              <p>Loading...</p>
            ) : user ? (
              <UserData isMe={id === "me"} user={userData} />
            ) : (
              <p>User not found</p>
            )}
            <div>
              <Link to="/user/editmyprofile">Edit My Profile</Link>
            </div>
          </div>
          <div className="right"></div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
