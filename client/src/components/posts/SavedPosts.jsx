import React, { useEffect, useState } from "react";
import "./SavedPosts.scss";
import { Link } from "react-router-dom";

const SavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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
          console.log(data);
          setSavedPosts(data);
        } else {
          setError("Failed to fetch saved posts. Please try again later.");
        }
      } catch (error) {
        setError("An error occurred while fetching saved posts.");
      }
    };
    fetchSavedPosts();
  }, []);
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!Array.isArray(savedPosts)) {
    return <div>Unable to fetch saved posts.</div>;
  }
  if (savedPosts.length === 0) {
    return <div>No saved posts yet.</div>;
  }

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
      <div className="saved-posts-container">
        <h1>Your Saved Posts</h1>
        <div className="wrapper">
          <div className="savedPosts">
            {savedPosts?.map((post) => (
              <>
                {post && (
                  <div className="post-card" key={post._id}>
                    <div className="post-content">
                      <div className="postBy">
                        <div className="createdBy">
                          {post.createdBy.userFullName}
                        </div>
                        <div className="img-container">
                          <Link to={`/user/profile/${post.createdBy._id}`}>
                            <img
                              className="userImg"
                              src={
                                post.createdBy.userImage
                                  ? `http://localhost:5000/user/uploads/${post.createdBy.userImage}`
                                  : "http://localhost:5000/user/uploads/default_avatar.jpeg"
                              }
                              alt="userImage"
                            />
                          </Link>
                        </div>
                      </div>

                      <p className="text">{post.content}</p>
                    </div>

                    <span className="date-and-likes">
                      <div>{post.like} people liked it</div>
                      <p>Created on {formatDateTime(post.createdOn)}</p>
                    </span>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedPosts;
