import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserRegistration } from "../CreateUser/CreateUser";

const Login = () => {
  const [newData, setNewData] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // const onSubmit = (data) => {
  //   const newData = {
  //     email: data.email,
  //     password: data.password,
  //   };
  //   console.log(newData);
  //   fetch(
  //     "http://localhost:5000/user/login",
  //     {
  //       method: "POST",
  //       body: JSON.stringify(newData),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //     // reset()
  //   )
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       if (data.error) {
  //         setError(data.error);
  //       } else {
  //         setMessage(`You successfully logged in.`);
  //       }
  //     })
  //     .then(() =>
  //       fetch("http://localhost:5000/user/myProfile", {
  //         method: "GET", // or 'GET', 'PUT', etc.
  //         credentials: "include", // include credentials (cookies)
  //       })
  //         .then((res) => res.json())
  //         .then((data) => console.log(`responses, ${data}`))
  //     )
  //     .catch((err) => {
  //       setError(err.msg);
  //     });
  // };
  const onSubmit = async (data) => {
    const newDataObject = {
      email: data.email,
      password: data.password,
    };
    setNewData(newDataObject)
    console.log(newDataObject);

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        body: JSON.stringify(newDataObject),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Login data:)", data);
      setMessage(`You successfully logged in.`);

      const profileResponse = await fetch(
        "http://localhost:5000/user/myProfile",
        {
          method: "GET", // or 'GET', 'PUT', etc.
          credentials: "include", // include credentials (cookies)
        }
      );

      const profileData = await profileResponse.json();
      console.log("profileData", profileData);
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
            <UserRegistration userData={newData}/>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
