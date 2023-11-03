import "./CreateNewPost.scss";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateNewPost = () => {
  const navigate = useNavigate();

  const { userData, posts, setPosts, setSessionExpired } = useContext(MyContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    const newData = {
      content: data.content,
      createdBy: userData._id,
      company: userData.userCompany,
      //  image: data.image,
    };
    try {
      const response = await fetch("http://localhost:5000/post/create", {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success === false) {
          //alert("Session expired, please login again!");
          //toast.warn('Session expired, please login again!')
          setSessionExpired(true)
          setPosts({});
          return navigate("/");
        }
        setPosts([responseData, ...posts]);
        reset();
      } else {
        //setError("Error updating profile:", response.statusText);
        toast.error('An error occurred while creating the post.')

      }
    } catch (error) {
      console.error("Error fetching company details", error);
      toast.error('An error occurred while creating the post.')
    }
  };

  return (
    <div className="create-new-post">
      <h4 className="new-post-header">Create a New Post...</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("content", { required: true, maxLength: 1000 })}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.target.value += "\n";
            }
          }}
        />
        <input type="submit" />
        {/* {error && <div className="error">Error: {error}</div>}
        {message && <div className="message">{message}</div>} */}
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
