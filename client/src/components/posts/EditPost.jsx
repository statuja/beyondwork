import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./EditPost.scss";
import "react-toastify/dist/ReactToastify.css";
import MyContext from "../../context/MyContext";

const EditPost = ({ postId, getAllPosts, setShowEditForm }) => {
  const [postContent, setPostContent] = useState("");
  const { posts, setPosts } = useContext(MyContext);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/post/getOne/${postId}`,
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
        toast.error("Error fetching post data.");
      }
    };

    fetchCompanyData();
  }, [postId]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/post/edit/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: postContent }),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        data.content = postContent;
        setShowEditForm(false);
        console.log(data);
        const updatedPosts = posts.map((item) => {
          if (item._id === data._id) {
            return { ...item, content: data.content };
          } else {
            return item;
          }
        });
        setPosts(updatedPosts);
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
        <label htmlFor="content">Edit here:</label>
        <textarea
          name="content"
          value={postContent}
          onChange={(e) => {
            setPostContent(e.target.value);
          }}
        ></textarea>
        <input type="submit"></input>
      </form>
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
    </div>
  );
};

export default EditPost;
