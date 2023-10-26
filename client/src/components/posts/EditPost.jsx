import React, { useState, useEffect } from "react";
const EditPost = ({postId}) => {

  const [postContent, setPostContent] = useState("")

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
          console.log(postContent);
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
    e.preventDefault()

    const formData = new FormData()
    formData.append("content", postContent.content)

    try {
      const response = await fetch(
        `http://localhost:5000/post/edit/${postId}`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Post updated:", data);
      } else {
        console.error("Error updating post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }

  return (
    <div>

        <form onSubmit={handleOnSubmit}>
            <label htmlFor="content">Your post:</label>
            <input 
              type='textarea' 
              id="content" 
              value={postContent}
              onChange={(e) => {
                setPostContent({postContent: e.target.value})
              }}></input>
            <input type='submit'></input>
        </form>
    </div>
  )
}

export default EditPost
