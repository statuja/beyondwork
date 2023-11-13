import "./GetAllPostCards.scss";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import EditPost from "./EditPost";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const GetAllPosts = ({ userPosts }) => {
  const navigate = useNavigate();

  const {
    userData,
    posts,
    setPosts,
    setSessionExpired,
    isDarkMode,
    savedPosts,
    setSavedPosts,
    likedPosts,
    setLikedPosts,
  } = useContext(MyContext);
  const [editPostId, setEditPostId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const getAllPosts = async () => {
    try {
      if (userPosts) {
        setPosts(userPosts);
        return;
      }
      const response = await fetch("http://localhost:5000/post/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success === false) {
          setSessionExpired(true);
          return navigate("/");
        }
        setPosts(data);
      } else {
        console.error("Error updating profile:", response.statusText);
        toast.error("Failed to fetch posts.");
      }
    } catch (error) {
      console.error("Error fetching company details", error);
      toast.error("Error fetching posts.");
    }
  };

  useEffect(() => {
    getAllPosts();
  }, [userPosts, setSavedPosts, setLikedPosts]);

  const onSavePost = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/user/savePost/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ postId: postId }),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.action === "unsave") {
          const updatedSavedPosts = savedPosts.filter((id) => id !== postId);
          setSavedPosts(updatedSavedPosts);
          toast.success("Post successfully unsaved.");
        } else if (responseData.action === "save") {
          const updatedSavedPosts = [...savedPosts, postId];
          setSavedPosts(updatedSavedPosts);
          toast.success("Post successfully saved.");
        } else if (responseData.action === "already_saved") {
          // Optionally, you can show a message or handle it in a different way
          console.log("Post is already saved.");
        }
      } else {
        toast.error("Failed to save/unsave the post.");
      }
    } catch (error) {
      toast.error("An error occurred while saving/unsaving the post.");
    }
  };

  // New function for unsaving posts
  const onUnsavePost = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/user/unsavePost/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.action === "unsave") {
          const updatedSavedPosts = savedPosts.filter((id) => id !== postId);
          setSavedPosts(updatedSavedPosts);
          toast.success("Post successfully unsaved.");
        } else {
          // Optionally, you can show a message or handle it in a different way
          console.log("Post was not saved.");
        }
      } else {
        toast.error("Failed to unsave the post.");
      }
    } catch (error) {
      toast.error("An error occurred while unsaving the post.");
    }
  };

  const handleOnDelete = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/post/delete/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ postId: postId }),
        }
      );

      if (response.ok) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
        toast.success("Post has been successfully deleted.");
      } else {
        toast.error("Failed to delete the post.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the post.");
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/post/like/${postId}/${userData._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const updatedPost = await response.json();

        // Check if the post is in the likedPosts array
        const isLiked = likedPosts.includes(postId);

        // Update likedPosts based on the response
        if (isLiked) {
          const updatedLikedPosts = likedPosts.filter((id) => id !== postId);
          setLikedPosts(updatedLikedPosts);
        } else {
          const updatedLikedPosts = [...likedPosts, postId];
          setLikedPosts(updatedLikedPosts);
        }

        // Update the posts state
        const updatedPosts = posts.map((item) =>
          item._id === postId ? updatedPost : item
        );
        setPosts(updatedPosts);
      } else {
        const errorData = await response.json();
        console.error("Error liking post:", errorData.message);
        toast.error("Failed to like the post.");
      }
    } catch (error) {
      console.error("An error occurred while liking the post:", error);
      toast.error("An error occurred while liking the post.");
    }
  };

  const handleOnEditPostOn = (postId) => {
    setEditPostId(postId);
    setShowEditForm(true);
  };

  const renderEditPostComponent = (postId) => {
    if (editPostId === postId && showEditForm) {
      return (
        <EditPost
          postId={postId}
          getAllPosts={getAllPosts}
          setShowEditForm={setShowEditForm}
        />
      );
    }
    return null;
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${day}.${month}.${year}`;
    const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    return `${formattedDate} at ${formattedTime}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        // Adjust this value as needed
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to scroll to the top of the posts
  const scrollToTopOfPosts = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can use "auto" for instant scrolling
    });
  };
  console.log("all", posts);
  console.log("saved", savedPosts);
  return (
    <>
      <div
        className={`post-Container ${isDarkMode ? "dark-mode" : "light-mode"}`}
      >
        {showScrollToTop && (
          <div
            className={`scroll-to-top ${
              showScrollToTop ? "sticky-scroll-to-top" : ""
            }`}
            onClick={scrollToTopOfPosts}
          >
            <KeyboardArrowUpIcon className="arrow-icon" />
          </div>
        )}

        {savedPosts &&
          likedPosts &&
          posts?.map((item) => (
            <div key={item._id} className="postCard">
              <Link to={`/post/${item._id}`}></Link>

              <div className="post-owner">
                <div className="img-container">
                  <Link to={`/user/profile/${item.createdBy._id}`}>
                    <img
                      className="userImg"
                      src={
                        item.createdBy.userImage
                          ? `http://localhost:5000/user/uploads/${item.createdBy.userImage}`
                          : "http://localhost:5000/user/uploads/default_avatar.jpeg"
                      }
                      alt="userImage"
                    />
                  </Link>
                </div>
                <div className="name">
                  <h3>
                    <Link to={`/user/profile/${item.createdBy._id}`}>
                      {item.createdBy.userFullName}
                    </Link>
                  </h3>
                  <div id="date">{formatDateTime(item.createdOn)}</div>
                </div>
              </div>

              <p className="post-content">{item.content}</p>
              <div className="post-img">
                {item && item.image && (
                  <img
                    className="post-img"
                    src={`http://localhost:5000/post/uploads/${item.image}`}
                    alt="post"
                  />
                )}
              </div>
              <span className="post-footer">
                <div className="likesAndComments">
                  <div className="left">
                    <div className="right">
                      {savedPosts.includes(item._id) ? (
                        <span>
                          <BookmarkIcon
                            className="icon"
                            onClick={() => onUnsavePost(item._id)}
                          />
                        </span>
                      ) : (
                        <span>
                          <BookmarkBorderIcon
                            className="icon"
                            onClick={() => onSavePost(item._id)}
                          />
                        </span>
                      )}
                    </div>
                    <span title="Comment">
                      <CommentIcon className="icon" />
                    </span>
                    <span title="Like">
                      {item.likedBy.includes(userData._id) ? (
                        <ThumbUpIcon
                          className="icon"
                          onClick={() => handleLikePost(item._id)}
                        />
                      ) : (
                        <ThumbUpOffAltIcon
                          className="icon"
                          onClick={() => handleLikePost(item._id)}
                        />
                      )}
                    </span>

                    <div className="likes">
                      <div>{item.like}</div>
                      <div className="people-liked-it"> people liked it</div>
                    </div>
                  </div>
                </div>

                <div className="right">
                  {userData._id === item.createdBy._id && (
                    <span title="Edit this post">
                      <EditIcon
                        className="icon"
                        onClick={() => handleOnEditPostOn(item._id)}
                      />
                    </span>
                  )}
                  {userData._id === item.createdBy._id && (
                    <span title="Delete this post">
                      <DeleteIcon
                        className="icon"
                        onClick={() => handleOnDelete(item._id)}
                      />
                    </span>
                  )}
                </div>
              </span>
              {renderEditPostComponent(item._id)}
            </div>
          ))}
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

export default GetAllPosts;
