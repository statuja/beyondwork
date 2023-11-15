import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./MyProfile.scss";
import "react-toastify/dist/ReactToastify.css";
import UserData from "../../components/UserData/UserData";
import MyContext from "../../context/MyContext";
import GetAllPosts from "../../components/posts/GetAllPosts";

const UserProfile = () => {
  const navigate = useNavigate();
  const { userData, setSessionExpired, isDarkMode } = useContext(MyContext);
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id === userData._id) {
      setUser(userData);
      fetchAllPosts();
      setLoading(false);
    } else {
      const fetchUserDataById = async (userId) => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/user/getUserProfile/${userId}`,
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
            if (data.success === false) {
              setSessionExpired(true);
              setUser({});
              return navigate("/");
            }
            setUser(data);
            setLoading(false);
          } else {
            console.error("Error fetching profile:", response.statusText);
            toast.error("Error fetching profile.");
          }
        } catch (error) {
          console.error("Error fetching profile", error);
          toast.error("Error fetching profile.");
          setLoading(false);
        }
      };
      fetchUserDataById(id);
    }
  }, [id, userData]);

  const fetchAllPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/post/getUsersPosts/${id}`,
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
        setUserPosts(data);
      } else {
        toast.error("Failed to fetch user's posts.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching user's posts.");
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, [userData]);

  return (
    <>
      <div className={`profile ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        <div className="profileCover">
          {user && user.coverImage && (
            <img
              className="coverImg"
              src={`${process.env.REACT_APP_BACKEND_URL}/user/uploads/${user.coverImage}`}
              alt="coverImage"
            />
          )}
          {user && user.userImage && (
            <img
              className="userImg"
              src={`${process.env.REACT_APP_BACKEND_URL}/user/uploads/${user.userImage}`}
              alt="userImage"
            />
          )}
        </div>

        <div className="profileBottom">
          <div className="profileLeft">
            {loading ? (
              <p>Loading...</p>
            ) : user ? (
              <UserData isMe={id === userData._id} user={user} />
            ) : (
              <p>User not found</p>
            )}
          </div>
          <div
            className={`profileRight ${
              isDarkMode ? "dark-mode" : "light-mode"
            }`}
          >
            <h3>Recent posts</h3>
            {id === userData._id && (
              <Link className="create-link" to="/newsfeed">
                Create a post
              </Link>
            )}
            {loading ? (
              <p>Loading...</p>
            ) : userPosts && userPosts.length > 0 ? (
              <GetAllPosts userPosts={userPosts} />
            ) : (
              <p>No posts created yet.</p>
            )}
          </div>
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
    </>
  );
};

export default UserProfile;
