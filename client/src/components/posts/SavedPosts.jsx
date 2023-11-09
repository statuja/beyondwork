import React, { useEffect, useState, useContext } from "react";
import GetAllPosts from "../../components/posts/GetAllPosts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/savedPosts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setSavedPosts(data);
        setLoading(false);
      } else {
        toast.error("Failed to fetch saved posts.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching saved posts.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  const handleUnsavePost = (postId) => {
    const updatedSavedPosts = savedPosts.filter((post) => post._id !== postId);
    setSavedPosts(updatedSavedPosts);
  };

  useEffect(() => {
    fetchSavedPosts(); 
  }, [savedPosts]);

  return (
    <div className="saved-posts-container ">
        <h1>Your Saved Posts</h1>
        {loading ? (
          <p>Loading...</p>
        ) : savedPosts && savedPosts.length > 0 ? (
          <GetAllPosts
            userPosts={savedPosts}
            handleUnsavePost={handleUnsavePost}
          />
        ) : (
          <p>No saved posts found</p>
        )}
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
};

export default SavedPosts;
