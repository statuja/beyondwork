import React, { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setUserCompany } = useContext(MyContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    const newDataObject = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        body: JSON.stringify(newDataObject),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const responseData = await response.json();
      setMessage(`You successfully logged in.`);
      setUserCompany(responseData.user.userCompany);
      navigate("/user/create");
    } catch (error) {
      console.log("Fetch error:", error);
      setError(error);
    }
  };
  console.log(errors);

  return (
    <div>
      <h1>Login here </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Your email"
          {...register("email", { required: true })}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Your password"
          {...register("password", { required: true })}
        />
        <input type="submit" />
        {error && <div>Error: {error}</div>}{" "}
        {message && (
          <div>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
