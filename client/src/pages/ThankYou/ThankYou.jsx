import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./ThankYou.scss";
import "react-toastify/dist/ReactToastify.css";
import MyContext from "../../context/MyContext";
import logo from "../../images/Logo_green.png";
import people from "../../images/Young_people.png";

export const ThankYou = () => {
  const navigate = useNavigate();
  const { adminEmail } = useContext(MyContext);
  const { companyName } = useContext(MyContext);
  const { setUserData, companyRegistered } = useContext(MyContext);

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
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/login`,
        {
          method: "POST",
          body: JSON.stringify(newDataObject),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setUserData(responseData.user);

        navigate("/company/profile");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error);
      }
    } catch (error) {
      console.log("Fetch error:", error);
      toast.error("An error occurred during login.");
    }
  };

  useEffect(() => {
    if (companyRegistered === true) {
      toast.success(
        "You successfully registered your company. Please find below your login credentials."
      );
    }
  }, []);

  return (
    <div className="thankyou">
      <div className="left">
        <div className="logo">
          <img src={logo} alt="BeyondWork Logo" />
        </div>{" "}
        <div className="textContainer">
          <h2>
            Thank you for registering your company with <span>BeyondWork</span>!
          </h2>
        </div>
      </div>
      <div className="right">
        <div className="right-top">
          <h2>Login to {companyName} admin account</h2>
          <div className="thankMsg">
            <p>Here are your login credentials:</p>
            <p>
              admin email: <span>{adminEmail}</span>, temporary password:
              <span> admin1234</span>
            </p>
          </div>
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
        </div>
        <img src={people} alt="People connected" />
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
      />
    </div>
  );
};
