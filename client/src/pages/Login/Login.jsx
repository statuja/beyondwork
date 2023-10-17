import React, { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import logo from "../../images/Logo_green.png";
import "./Login.scss";

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
    <div className="login">
      <div className="left">
        <div className="logo">
          <img src={logo} alt="BeyondWork Logo" />
        </div>
        <h1>
          Welcome to Beyond Work, the digital haven where work and play
          converge.
        </h1>
        <p>
          We understand that work is just one facet of a fulfilling life, and
          that's why we've created this space - to foster a vibrant, engaging,
          and well-rounded employee community.
        </p>
      </div>
      <div className="right">
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
          <input type="submit" value="Login" />
          {error && <div>Error: {error}</div>} {message && <div>{message}</div>}
        </form>
        <div className="signUp">
          <p>Your company is not on BeyondWork yet?</p>{" "}
          <button
            onClick={() => {
              navigate("/company/create");
            }}
            className="button"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
