import "./CreateNewPost.scss";
import React, { useContext, useState } from "react";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateNewPost = () => {
  const navigate = useNavigate();
  const { userData, posts, setPosts, setSessionExpired } =
    useContext(MyContext);
  const [newPost, setNewPost] = useState({
    content: "",
    image: null,
    createdBy: userData._id,
    company: userData.userCompany,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", newPost.content);
    formData.append("createdBy", userData._id);
    formData.append("company", userData.userCompany);

    if (newPost.image) {
      formData.append("image", newPost.image);
    }
    try {
      const response = await fetch("http://localhost:5000/post/create", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success === false) {
          setSessionExpired(true);
          setPosts({});
          return navigate("/");
        }
        const imageUrl = `${responseData.image}`;
        const newPost = {
          ...responseData,
          image: imageUrl,
        };

        setPosts([newPost, ...posts]);
        console.log("this", responseData.image);
      } else {
        toast.error("An error occurred while creating the post.");
      }
    } catch (error) {
      console.error("Error fetching company details", error);
      toast.error("An error occurred while creating the post.");
    }
  };

  return (
    <div className="create-new-post">
      <h4 className="new-post-header">Create a New Post...</h4>
      <form onSubmit={handleSubmit}>
        <textarea
          maxLength={1500}
          id="content"
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => {
            const selectedImage = e.target.files[0];
            console.log("Selected image:", selectedImage);
            setNewPost({ ...newPost, image: selectedImage });
          }}
        />

        <input type="submit" />
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

export default CreateNewPost;
