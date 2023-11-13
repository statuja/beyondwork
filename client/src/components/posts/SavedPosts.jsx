import React, { useEffect, useState } from "react";
import GetAllPosts from "../../components/posts/GetAllPosts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SavedPosts = () => {
  const [loading, setLoading] = useState(true);
  const [savedPosts, setSavedPosts] = useState([]); // State variable for user's posts

  const fetchSavedPosts = async () => {
    try {
      const response = await fetch( `${process.env.REACT_APP_BACKEND_URL}/user/savedPosts`, {
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


  return (
    <div className="saved-posts-container ">
      <h1>Your Saved Posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : savedPosts && savedPosts.length > 0 ? (
        <GetAllPosts userPosts={savedPosts} />
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
