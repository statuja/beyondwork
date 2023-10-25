import React, { useState } from "react";

function LikePost({ post }) {
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (!liked) {
      try {
        // Send a POST request to your API endpoint for liking a post
        const response = await fetch(`http://localhost:5000/post/like`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          setLikeCount(likeCount + 1);
          setLiked(true);
        } else {
          console.error("Error liking post");
        }
      } catch (error) {
        console.error("Error liking post: ", error);
      }
    }
  };

  return (
    <div>
      <h3>{post.content}</h3>
      <button onClick={handleLike}>Like</button>
      <span>{likeCount}</span>
    </div>
  );
}

export default LikePost;
