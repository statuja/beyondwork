import React, { useState, useEffect } from "react";
//import "./EditPost.scss"

const EditPost = ({postId, getAllPosts, setShowEditForm}) => {

  const [postContent, setPostContent] = useState("");

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/post/getOne/${postId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setPostContent(data.content);
        } else {
          console.error("Failed to fetch post data");
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchCompanyData();
  }, [postId]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/post/edit/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({content: postContent}),
          credentials: "include",
        }
      );

      //console.log(formData);

      if (response.ok) {
        const data = await response.json();
        data.content = postContent
        setShowEditForm(false)
        getAllPosts()
        //console.log("Post updated:", data, postContent);
      } else {
        console.error("Error updating post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="edit-post-wrapper">
        <form onSubmit={handleOnSubmit}>
            <label htmlFor="content">Edit your post here:</label>
            <textarea 
              name="content" 
              value={postContent}
              onChange={(e) => {
                setPostContent(e.target.value)
              }}></textarea>
            <input type='submit'></input>
        </form>
    </div>
  );
};

export default EditPost;
