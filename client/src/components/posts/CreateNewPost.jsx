import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import MyContext from "../../context/MyContext";

const CreateNewPost = () => {
  const { userData, posts, setPosts } = useContext(MyContext);
  const {
    register,
    handleSubmit,
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
      const responseData = await response.json();
      console.log("CREATE NEW POST: responseData:", responseData);
      if (response.ok) {
        setMessage(`You post has been successfully published.`);
        setPosts([responseData, ...posts]);
      } else {
        setError(responseData.error[0].msg);
      }
    } catch (error) {
      setError(
        "An error occurred while processing your request. Please try again later."
      );
    }
  };

  

  console.log("check", posts);
  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("content", { required: true, maxLength: 100 })}
        />
        <input type="submit" value="Post" />

        {error && <div>Error: {error}</div>}
        {message && <div>{message}</div>}
      </form>
    </div>
  );
};

export default CreateNewPost;
