import React, { useEffect, useState } from "react";
import "./SavedPosts.scss";

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
  return (
    <>
      <div className="main-container">
        <div className="savedPosts">
          <h2>Saved Posts</h2>
          {savedPosts?.map((post) => (
            <div className="post-card" key={post._id}>
              <p>Post content: {post.content}</p>
              <p>By {post.createdBy}</p>
              <p>Created on {post.createdOn}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SavedPosts;
