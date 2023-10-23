import "./GetAllPostCards.scss";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MyContext from "../../context/MyContext";

const GetAllPosts = () => {
  const { posts, setPosts } = useContext(MyContext);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

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
  return (
    <>
      <h2 className="posts-title">All Posts</h2>
      <div className="post-Container">

        {error ? (
          <div>Error: {error}</div>
        ) : (
          posts?.map((item) => (
            <div key={item._id} className="postCard">
              <h3>
                created by :
                <Link to={`/user/${item.createdBy._id}`}>
                  {item.createdBy.userFullName}
                </Link>
              </h3>
              <p>{item.company}</p>
              <Link to={`/post/${item._id}`}></Link>
              <p>{item.content}</p>
            </div>
          ))
        )}

      </div>
    </>
  );
};

export default GetAllPosts;
