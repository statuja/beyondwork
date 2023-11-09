import "./ThankYou.scss";
import logo from "../../images/Logo_green.png";
import { useContext } from "react";
import MyContext from "../../context/MyContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import people from "../../images/Young_people.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      const response = await fetch("http://localhost:5000/user/login", {
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
        navigate("/company/profile");
      } else {
        const errorData = await response.json();
        //setError(errorData.error);
        toast.error(errorData.error);
      }
    } catch (error) {
      console.log("Fetch error:", error);
      //setError("An error occurred during login.");
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

  //console.log(errors);
  return (
    <div className="thankyou">
      <div className="left">
        <div className="logo">
          <img src={logo} alt="BeyondWork Logo" />
        </div>{" "}
        <div className="textContainer">
          <h1>Thank you for registering your company with BeyondWork!</h1>
        </div>
      </div>
      <div className="right">
        <div className="right-top">
          <div className="thankMsg">
            <br></br>
            <br></br>
            <p>
              Here are your login credentials.
              <br></br>
              <br></br>
              Your admin email: <b>{adminEmail}</b>
              Your temporary password:<b> admin1234</b>
            </p>
          </div>
          <h2>Login to {companyName} admin account</h2>
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
            <input type="submit" value="Login" className="button" />
            {error && <div> {error}</div>}
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
