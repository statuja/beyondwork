import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserData from "../../components/UserData/UserData";
import MyContext from "../../context/MyContext";
import GetAllPosts from "../../components/posts/GetAllPosts";
import "./MyProfile.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const { userData, setSessionExpired } = useContext(MyContext);
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState([]); // State variable for user's posts
  const [error, setError] = useState("");

  useEffect(() => {
    if (id === userData._id) {
      setUser(userData); // If it's the user's own profile
      setLoading(false);
    } else {
      // Fetch user data by ID
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
            if (data.success === false) {
              //alert("Session expired, please login again!");
              //toast.warn('Session expired, please login again!')
              setSessionExpired(true);
              setUser({});
              return navigate("/");
            }
            setUser(data); // Set the user data including images
            // if (data.success === false) {
            //   alert("Server error");
            //   setUser({});
            //   return navigate("/");
            // }
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

  //console.log(userData);

  const fetchAllPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/post/getUsersPosts/${id}`,
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
        setUserPosts(data); // Update the user's posts
      } else {
        //setError("Failed to fetch user's posts.");
        toast.error("Failed to fetch user's posts.");
      }
    } catch (error) {
      //setError("An error occurred while fetching user's posts.");
      toast.error("An error occurred while fetching user's posts.");
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, [userData]);

  return (
    <>
      <div className="profile">
        <div className="profileCover">
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
          <div className="profileRight">
            <h3>Recent posts</h3>
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
