import React, { useRef, useState } from "react";
//import dotenv from "dotenv";

export const CompanyRegistration = () => {
  const companyNameRef = useRef();
  const companyTypeRef = useRef();
  const numberOfEmpRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const zipCodeRef = useRef();
  const countryRef = useRef();
  const phoneRef = useRef();
  const companyEmailRef = useRef();
  const defaultAdminEmail = useRef();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const company = {
      companyName: companyNameRef.current.value,
      companyType: companyTypeRef.current.value,
      numberOfEmployees: numberOfEmpRef.current.value,
      companyAddress: {
        address: streetRef.current.value,
        city: cityRef.current.value,
        zipCode: zipCodeRef.current.value,
        country: countryRef.current.value,
      },
      companyContact: {
        email: companyEmailRef.current.value,
        phoneNumber: phoneRef.current.value,
      },
      defaultAdminEmail: defaultAdminEmail.current.value,
    };
    fetch("http://localhost:5001/company/create", {
      method: "POST",
      body: JSON.stringify(company),
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
          setMessage(`You successfully register your company. here is your Admin email ${company.defaultAdminEmail} and your temporary password: admin1234
        please change your logging password and update your details.`);
        }
      })
      .catch((err) => {
        setError(err.msg);
      });
  };

  // console.log(error);
  return (
    <div>
      <h1>Register your company </h1>
      <form onSubmit={handleSubmit}>
        <label> Company Name:</label>
        <input type="text" ref={companyNameRef} />
        <label> Company type:</label>
        <input type="text" ref={companyTypeRef} />
        <label> Number of Employees</label>
        <select id="empNum" name="empNum" ref={numberOfEmpRef}>
          <option value="lessthan50">Less than 50</option>
          <option value="51to100">51-100</option>
          <option value="101to500">101-500</option>
          <option value="morethan500">More than 500</option>
        </select>
        <label> Company Address:</label>
        <input
          type="text"
          placeholder="Street, Building/Office Number"
          ref={streetRef}
        />
        <input type="text" placeholder="City" ref={cityRef} />
        <input type="text" placeholder="Zip Code" ref={zipCodeRef} />
        <input type="text" placeholder="Country" ref={countryRef} />
        <label>Company Contact Details:</label>
        <input type="text" placeholder="Phone Number" ref={phoneRef} />
        <input
          type="email"
          placeholder="Company E-mail Address"
          ref={companyEmailRef}
        />
        <input
          type="email"
          placeholder="Admin E-mail Address"
          ref={defaultAdminEmail}
        />
        <button type="submit">Register</button>
        {error && <div>Error: {error}</div>} {message && <div>{message}</div>}
        {/* Display error message if there is an error */}
      </form>
    </div>
  );
};
