import { useForm } from "react-hook-form";
import React, { useState } from "react";

export const UserRegistration = (props) => {
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
      userCompany: props.newData.userCompany, //need to link this to the logged in user's company ID
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
    console.log("test", newData);
    fetch("http://localhost:5000/user/create", {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setError(data.error[1].msg);
        } else {
          setMessage(
            `You have successfully registered ${data.userFullName}. please, continue and add another employee to the system.`
          );
          reset();
        }
      })
      .catch((err) => {
        setError(err.msg);
      });
  };
  console.log(errors);

  return (
    <div>
      <h3>Hello Admin!</h3>
      <p>Here, you can register all the employees in your team:</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Employee full Name"
          {...register("userFullName", { required: true })}
        />
        <input
          type="text"
          placeholder="Role in the company"
          {...register("userJobTitle", { required: true })}
        />
        <input
          type="text"
          placeholder="Department"
          {...register("userDepartment", { required: true })}
        />
        <input
          type="text"
          placeholder="Street"
          {...register("address", { required: true })}
        />
        <input
          type="text"
          placeholder="ZipCode"
          {...register("zipCode", { required: true })}
        />
        <input type="text" placeholder="City" {...register("city")} />
        <input type="text" placeholder="Country" {...register("country")} />
        <input
          type="email"
          placeholder="Employee E-mail Address"
          {...register("email")}
        />
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
        {error && <div>Error: {error}</div>} {message && <div>{message}</div>}
      </form>
    </div>
  );
};
