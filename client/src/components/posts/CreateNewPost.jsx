import React, { useState } from "react";
import { useForm } from "react-hook-form";
//import axios from "axios";

const CreateNewPost = () => {
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
      //  image: data.image,
    };
    try {
      const response = await fetch("http://localhost:5001/post/create", {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        setMessage(`You post has been successfully published.`);
      } else {
        setError(responseData.error[0].msg);
      }
    } catch (error) {
      setError(
        "An error occurred while processing your request. Please try again later."
      );
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("content", { required: true, maxLength: 100 })}
        />
        <input type="submit" />

        {error && <div>Error: {error}</div>}
        {message && <div>{message}</div>}
      </form>
    </div>
  );
};

export default CreateNewPost;
