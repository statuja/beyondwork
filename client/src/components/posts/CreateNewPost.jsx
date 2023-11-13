import "./CreateNewPost.scss";
import React, { useContext, useState } from "react";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const CreateNewPost = () => {
  const navigate = useNavigate();
  const { userData, posts, setPosts, setSessionExpired, isDarkMode } =
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
    if (newPost.content) {
      formData.append("content", newPost.content);
    } else {
      formData.append("content", "Check this image"); // Set content to a default message
    }

    if (newPost.image) {
      formData.append("image", newPost.image);
    } else {
      formData.append("image", null); // Set the image to null if no image is selected
    }

    if (!newPost.content && !newPost.image) {
      toast.error(
        "Please provide content or select an image before submitting."
      );
      return;
    }

    formData.append("createdBy", userData._id);
    formData.append("company", userData.userCompany);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/post/create`, {
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
        const imageUrl = responseData.image ? `${responseData.image}` : null;
        const newPost = {
          ...responseData,
          image: imageUrl,
        };

        setPosts([newPost, ...posts]);
        console.log("this", responseData.image);
        e.target.reset();
        setNewPost({
          content: "",
          image: null,
          createdBy: userData._id,
          company: userData.userCompany,
        });
      } else {
        toast.error("An error occurred while creating the post.");
      }
    } catch (error) {
      console.error("Error fetching company details", error);
      toast.error("An error occurred while creating the post.");
    }
  };

  return (
    <div
      className={`create-new-post ${isDarkMode ? "dark-mode" : "light-mode"}`}
    >
      <h4 className="new-post-header">Create a New Post...</h4>
      <form onSubmit={handleSubmit}>
        <textarea
          maxLength={1500}
          id="content"
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <label htmlFor="icon-button-file">
          <input
            type="file"
            id="icon-button-file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => {
              const selectedImage = e.target.files[0];
              setNewPost({ ...newPost, image: selectedImage });
            }}
          />
          <AddPhotoAlternateIcon className="add-photo-icon" />
        </label>

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
