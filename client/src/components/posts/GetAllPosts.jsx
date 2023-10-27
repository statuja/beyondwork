import "./GetAllPostCards.scss";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MyContext from "../../context/MyContext";
import EditPost from "./EditPost";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";
//import ReactTooltip from "react-tooltip";

const GetAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const { userData } = useContext(MyContext);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editPostId, setEditPostId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const getAllPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/post/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        setError("Failed to fetch posts. Please try again later.");
      }
    } catch (error) {
      setError(
        "An error occurred while fetching posts. Please try again later."
      );
    }
  };

  useEffect(() => {
    getAllPosts();
  }, [posts]);

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
        setMessage("Post has been saved successfully.");
      } else {
        setError("Failed to save the post.");
      }
    } catch (error) {
      setError("An error occurred while saving the post.");
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
        setMessage("Post has been successfully deleted.");
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      } else {
        setError("Failed to delete the post.");
      }
    } catch (error) {
      setError("An error occurred while deleting the post.");
    }
  };

  const handleLikePost = async (postId) => {
    console.log(postId);
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
      console.log(response.ok);

      if (response.ok) {
        const updatedPost = await response.json();

        const oldPosts = [...posts]

        const idx = oldPosts.findIndex(item => item._id === postId)
        oldPosts[idx] = updatedPost

        setPosts([...oldPosts])
        // setPosts((prevPosts) =>
        //   prevPosts?.map((post) => (post._id === postId ? updatedPost : post))
        // );
      } else {
        const errorData = await response.json();
        console.error("Error liking post:", errorData.message);
        setError("Failed to like the post.");
      }
    } catch (error) {
      console.error("An error occurred while liking the post:", error);
      setError("An error occurred while liking the post.");
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

  return (
    <>
      <div className="post-Container">
        {error && <div>Error: {error}</div>}
        {message && <div>{message}</div>}
        {posts?.map((item) => (
          <div key={item._id} className="postCard">
            <Link to={`/post/${item._id}`}></Link>

            <p id="date">{formatDateTime(item.createdOn)}</p>
            <h3 className="post-owner-name">
              <Link to={`/user/${item.createdBy._id}`}>
                {item.createdBy.userFullName}
              </Link>{" "}
            </h3>
            <p className="post-content">{item.content}</p>
            <span className="post-footer">
              <div className="likesAndComments">
                {/* Like button and count */}
                <span title="Like this post">
                  <ThumbUpOffAltIcon

            <div className="post-owner">
              <h3>
                <Link to={`/user/${item.createdBy._id}`}>
                  {item.createdBy.userFullName}
                </Link>{" "}
              </h3>

              <div id="date">{formatDateTime(item.createdOn)}</div>
            </div>
            <div className="post-content">{item.content}</div>
            <div className="post-footer">
              <div className="left">
                
                  <CommentIcon className="icon" />
                  <BookmarkBorderIcon

                    className="icon"
                    onClick={() => onSavePost(item._id)}
                  />
                  <ThumbUpOffAltIcon
                  className="icon"
                  onClick={() => handleLikePost(item._id)}
                />
                <div className="likes">
                  <div>{item.like}</div>
                  <div>like people it</div>
                </div>
              </div>

              {renderEditPostComponent(item._id)}

              <div className="right">
                {userData._id === item.createdBy._id && (
                 
                    <DeleteIcon
                      className="icon"
                      onClick={() => handleOnDelete(item._id)}
                    />
               
                )}
                {userData._id === item.createdBy._id && (
                
                    <EditIcon
                      className="icon"
                      onClick={() => handleOnEditPostOn(item._id)}
                    />
               
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GetAllPosts;
