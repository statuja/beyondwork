import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (data) => {
    const newData = {
      email: data.email,
      password: data.password
    };
    console.log(newData);
    fetch(
      "http://localhost:5000/user/login",
      {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
        },
      },
      reset()
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //console.log(data);
        if (data.error) {
          setError(data.error);
        } else {
          setMessage(`You successfully logged in.`);
        }
      })
      .catch((err) => {
        setError(err.msg);
      });
  };
  console.log(errors);

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
        {error && <div>Error: {error}</div>} {message && <div>{message}</div>}
      </form>
    </div>
  );
};

export default Login;
