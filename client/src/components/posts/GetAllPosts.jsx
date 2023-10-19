import React from "react";

const GetAllPosts = ({ posts }) => {
  return (
    <div>
      <h2>All Posts</h2>
      {posts.map((post) => (
        <div key={post._id} className="post">
          <p>{post.content}</p>
          {/* Display other post details, such as createdBy, image, etc. */}
        </div>
      ))}
    </div>
  );
};

export default GetAllPosts;
