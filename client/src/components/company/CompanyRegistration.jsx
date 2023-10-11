import React, { useState } from "react";
import { useForm } from 'react-hook-form';
//import dotenv from "dotenv";

export const CompanyRegistration = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const onSubmit = data => {
    fetch("http://localhost:5000/company/create", {
      method: "POST",
      body: JSON.stringify(data),
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
          setMessage(`You successfully register your company. here is your Admin email ${data.defaultAdminEmail} and your temporary password: admin1234
        please change your logging password and update your details.`);
        }
      })
      .catch((err) => {
        setError(err.msg);
       
      });
    console.log(data)
  };
  console.log(errors);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  
    


      return (
        <div>
          <h1>Register your company </h1>
       
          <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Company Name" {...register("Company Name", {required: true})} />
          <input type="text" placeholder="Company Type " {...register("Company Type ", {required: true})} />
          <select {...register("Number of Employees")}>
            <option value="<50">0-50</option>
            <option value="51-100">51-100</option>
            <option value="101-500">101-500</option>
            <option value=">500">more than 500</option>
          </select>
          <input type="text" placeholder="Street, Building, Office(if applicable) No" {...register("Street, Building, Office(if applicable) No", {required: true})} />
          <input type="text" placeholder="Zip Code" {...register("Zip Code", {required: true})} />
          <input type="text" placeholder="City" {...register} />
          <input type="text" placeholder="Country" {...register} />
          <input type="text" placeholder="Phone Number" {...register("Phone Number")} />
          <input type="text" placeholder="Company E-mail Address" {...register("Company E-mail Address" )} />
          <input type="email" placeholder="Admin E-mail Address" {...register("Admin E-mail Address" )} />
    
          <input type="submit" />
         
            {error && <div>Error: {error}</div>} {message && <div>{message}</div>}
            {/* Display error message if there is an error */}
        </form>
        </div>
      );
  };

  // console.log(error);
 
