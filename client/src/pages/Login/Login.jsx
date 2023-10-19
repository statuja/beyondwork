import React, { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import logo from "../../images/Logo_green.png";
import people from "../../images/Young_people.png";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const { setUserCompany } = useContext(MyContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    const newDataObject = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await fetch("http://localhost:5001/user/login", {
        method: "POST",
        body: JSON.stringify(newDataObject),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const responseData = await response.json();
        setUserCompany(responseData.user.userCompany);
        navigate("/newsfeed");
      } else {
        const errorData = await response.json();
        setError(errorData.error); 
      }
    } catch (error) {
      console.log("Fetch error:", error);
      setError("An error occurred during login."); 
    }
  };
  console.log(errors);

  return (
    <div className="login">
      <div className="left">
        <img src={logo} alt="BeyondWork Logo" />
        <div className="textContainer">
          <h1>Welcome to BeyondWork!</h1>
          <p>The digital haven where work and play converge.</p>
          <p>
            We understand that work is just one facet of a fulfilling life, and
            that's why we've created this space - to foster a vibrant, engaging,
            and well-rounded employee community.
          </p>
        </div>
      </div>
      <div className="right">
        <div className="right-top">
          <h2>Login</h2>
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
            {typeof error === "string" && error && (
              <div className="error">{error}</div>
            )}
          </form>
          <div className="signUp">
            <p>Your company is not on BeyondWork yet?</p>
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
        <img src={people} alt="People connected" />
      </div>
    </div>
  );
};

export default Login;
