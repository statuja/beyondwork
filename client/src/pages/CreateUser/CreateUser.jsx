import { useForm } from "react-hook-form";
import React, { useContext, useState, useEffect } from "react";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import "./CreateUser.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserRegistration = () => {
  const defaultImageUrl = `${process.env.REACT_APP_BACKEND_URL}/user/uploads/default_avatar.jpeg`;

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { userData, setSessionExpired, isDarkMode } = useContext(MyContext);

  const onSubmit = async (data) => {
    const newData = {
      userCompany: userData.userCompany,
      userFullName: data.userFullName,
      userJobTitle: data.userJobTitle,
      userDepartment: data.userDepartment,
      userAddress: {
        address: data.address,
        city: data.city,
        zipCode: data.zipCode,
        country: data.country,
      },
      userContact: {
        email: data.email,
      },
      userPassword: data.userPassword,
      adminRole: data.adminRole,
      // userImage: defaultImageUrl,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/create`,
        {
          method: "POST",
          body: JSON.stringify(newData),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.success === false) {
          setSessionExpired(true);
          reset();
          return navigate("/");
        }
        toast.success(
          `You have successfully registered ${newData.userFullName}. Please continue and add another employee to the system.`
        );
        reset();
      } else {
        console.error("Error updating profile:", response.statusText);
        toast.error("Failed to create profile.");
      }
    } catch (error) {
      console.error("Error creating profile", error);
      toast.error("Error creating profile");
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      console.log("Errors:", errors);
      toast.error("All fields are required.");
    }
  }, [errors]);

  return (
    <>
      <div
        className={`main-container ${isDarkMode ? "dark-mode" : "light-mode"}`}
      >
        <div>
          <h1>Hello Admin!</h1>
          <p>Here, you can register all the employees in your team:</p>
        </div>
        <div className="addUser">
          <form
            className={`form ${isDarkMode ? "dark-mode" : "light-mode"}`}
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="userFullName">Employee Full Name:</label>
            <input
              type="text"
              placeholder="Employee full Name"
              {...register("userFullName", { required: true })}
            />
            <label htmlFor="userJobTitle">Job Title:</label>
            <input
              type="text"
              placeholder="Role in the company"
              {...register("userJobTitle", { required: true })}
            />
            <label htmlFor="userDepartment">Department:</label>
            <input
              type="text"
              placeholder="Department"
              {...register("userDepartment", { required: true })}
            />
            <label htmlFor="address">
              Street, Building, Office (if applicable) Number
            </label>
            <input
              type="text"
              placeholder="Street"
              {...register("address", { required: true })}
            />
            <label htmlFor="zipCode">Zip Code:</label>
            <input
              type="text"
              placeholder="ZipCode"
              {...register("zipCode", { required: true })}
            />
            <label htmlFor="city">City:</label>
            <input type="text" placeholder="City" {...register("city")} />
            <label htmlFor="country">Country:</label>
            <input type="text" placeholder="Country" {...register("country")} />
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              placeholder="Employee E-mail Address"
              {...register("email")}
            />
            <label htmlFor="password">Temporary Password:</label>
            <input
              type="password"
              placeholder="Employee temporary Password"
              {...register("userPassword", {
                required: true,
                min: 8,
                maxLength: 30,
              })}
            />
            <label htmlFor="adminRole">Admin Role:</label>
            {/* <div className="myRow">
              <input
                {...register("adminRole")}
                type="radio"
                value={false}
                defaultChecked
              />{" "}
              No
              <input {...register("adminRole")} type="radio" value={true} /> Yes
            </div> */}
            <select {...register("adminRole")}>
              <option value={false}> No</option>
              <option value={true}>Yes</option>
            </select>

            <input type="submit" className="button" />
          </form>
        </div>
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
    </>
  );
};
