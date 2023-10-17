import React, { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserRegistration } from "../CreateUser/CreateUser";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { userCompany, setUserCompany } = useContext(MyContext);
  const {
    register,
    handleSubmit,
    reset,
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

      const data = await response.json();
      console.log("Login data:)", data);
      setMessage(`You successfully logged in.`);
      setUserCompany(data.user.userCompany);
      navigate("/user/create");

      // const profileResponse = await fetch(
      //   "http://localhost:5000/user/myProfile",
      //   {
      //     method: "GET", // or 'GET', 'PUT', etc.
      //     credentials: "include", // include credentials (cookies)
      //   }
      // );

      // const profileData = await profileResponse.json();
      // console.log("profileData", profileData);
    } catch (error) {
      console.log("Fetch error:", error.message);
      setError(error.msg);
    }
  };
  // console.log(errors);

  return (
    <div>
      <h1>Login here </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Your email"
          {...register("email", { required: true })}
        />
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
            {/* <UserRegistration /> */}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
