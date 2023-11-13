import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import logo from "../../images/Logo_green.png";
import people from "../../images/Young_people.png";
import "./Login.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const { setUserData, loggedOut} = useContext(MyContext);
  const [error, setError] = useState("");
  const [animation, setAnimation] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (loggedOut === true) {
      toast.warn("You successfully logged out.");
    }
  }, []);

  useEffect(()=>{
    const delay = setTimeout(()=>{
      setAnimation(true);
      clearTimeout(delay);
    }, 100)
  }, [])

  // useEffect(() => {
  //   if (sessionExpired === true) {
  //     toast.warn('Session expired, please login again.')
  //   }
  // }, [])

  const onSubmit = async (data) => {
    const newDataObject = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
        method: "POST",
        body: JSON.stringify(newDataObject),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const responseData = await response.json();
        setUserData(responseData.user);
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
    <div className='login'>
      <div className="login-left">
        <div className="logo">
          <img src={logo} alt="BeyondWork Logo" />
        </div>
        <div className={`textContainer ${animation ? 'animate': ''}`}>
          <h2>Welcome to BeyondWork!</h2>
          <p>The digital haven where work and play converge.</p>
          <p>
            We understand that work is just one facet of a fulfilling life, and
            that's why we've created this space - to foster a vibrant, engaging,
            and well-rounded employee community.
          </p>
        </div>
      </div>
      <div className="login-right">
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
            <div>
              <input type="submit" value="Login" className="button" />
            </div>

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
        <img className="peopleImg" src={people} alt="People connected" />
      </div>

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

export default Login;
