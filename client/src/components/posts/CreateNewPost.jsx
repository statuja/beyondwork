import "./CreateNewPost.scss";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";

const CreateNewPost = () => {
  const navigate = useNavigate();

  const { userData, posts, setPosts } = useContext(MyContext);
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
          alert("Session expired, please login again!");
          setPosts({});
          return navigate("/");
        }
        setPosts([responseData, ...posts]);
        reset();
      } else {
        setError("Error updating profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching company details", error);
    }
  };

  return (
    <div className="create-new-post">
      <h4 className="new-post-header">Create a New Post...</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("content", { required: true, maxLength: 500 })}
        />
        <input type="submit" />
        {error && <div className="error">Error: {error}</div>}
        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
};

export default CreateNewPost;
