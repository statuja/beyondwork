import { useForm } from "react-hook-form";
import React, { useContext, useState } from "react";
import MyContext from "../../context/MyContext";

export const UserRegistration = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { userCompany } = useContext(MyContext);

  const onSubmit = async (data) => {
    const newData = {
      userCompany: userCompany,
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
    };
    try {
      const response = await fetch("http://localhost:5000/user/create", {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        setMessage(
          `You have successfully registered ${newData.userFullName}. Please continue and add another employee to the system.`
        );
        reset();
      } else {
        setError(responseData.error[0].msg);
      }
    } catch (error) {
      setError(
        "An error occurred while processing your request. Please try again later."
      );
    }
  };

  console.log(errors);

  return (
    <div>
      <h3>Hello Admin!</h3>
      <p>Here, you can register all the employees in your team:</p>

      <form onSubmit={handleSubmit(onSubmit)}>
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
        {/* <select {...register("adminRole")}>
          <option value="No">Not an Admin</option>
          <option value="Yes">Admin</option>
        </select> */}
        {/* <label>Is this user an admin?</label>
        <input {...register("adminRole")} type="radio" value="Yes" />
        <input
          {...register("adminRole")}
          type="radio"
          value=" No"
          defaultChecked
        /> */}
        <input type="submit" />
        {error && <div>Error: {error}</div>}
        {message && <div>{message}</div>}{" "}
      </form>
    </div>
  );
};
