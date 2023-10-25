import "./GetAllPostCards.scss";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MyContext from "../../context/MyContext";
import EditPost from "./EditPost";

const GetAllPosts = () => {
  const { posts, setPosts } = useContext(MyContext);
  const {userData} = useContext(MyContext)
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editPostId, setEditPostId] = useState(null);

  useEffect(() => {
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
    getAllPosts();
  }, []);

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
        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
      } else {
        setError("Failed to delete the post.");
      }
    } catch (error) {
      setError("An error occurred while deleting the post.");
    }
  }

  const handleOnEditPostOn = (postId) => {
    setEditPostId(postId);
  }

  const renderEditPostComponent = (postId) => {
    if (editPostId === postId) {
      return <EditPost postId={postId} onCancel={() => setEditPostId(null)} />;
    }
    return null;
  }

  return (
    <>
      <div className="post-Container">
        {error && <div>Error: {error}</div>}
        {message && <div>{message}</div>}
        {posts?.map((item) => (
          <div key={item._id} className="postCard">
            <Link to={`/post/${item._id}`}></Link>

            <h3>
              created by :
              <Link to={`/user/${item.createdBy._id}`}>
                {item.createdBy.userFullName}
              </Link>{" "}
              <p>{item.content}</p>
            </h3>
            <p>Created on: {item.createdOn}</p>
            <button onClick={() => onSavePost(item._id)}>Save Post</button>
            {userData._id === item.createdBy._id && <button onClick={() => handleOnDelete(item._id)}> Delete Post</button>}
            {userData._id === item.createdBy._id && <button onClick={() => handleOnEditPostOn(item._id)}> Edit Post</button>}
            {renderEditPostComponent(item._id)}
          </div>
        ))}
      </div>
    </>
  );
};

export default GetAllPosts;
