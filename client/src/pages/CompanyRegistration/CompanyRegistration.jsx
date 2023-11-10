import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./CompanyRegistration.scss";
import logo from "../../images/Logo_green.png";
import { useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";

export const CompanyRegistration = () => {
  const navigate = useNavigate();
  const {
    setAdminEmail,
    setCompanyName,
    companyRegistered,
    setCompanyRegistered,
  } = useContext(MyContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [er, setEr] = useState("");

  const onSubmit = async (data) => {
    try {
      const newData = {
        companyName: data.companyName,
        companyType: data.companyType,
        numberOfEmployees: data.numberOfEmployees,
        companyAddress: {
          address: data.address,
          city: data.city,
          zipCode: data.zipCode,
          country: data.country,
        },
        companyContact: {
          email: data.email,
          phoneNumber: data.phoneNumber,
        },
        defaultAdminEmail: data.defaultAdminEmail,
      };

      const response = await fetch("http://localhost:5000/company/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      const responseData = await response.json();
      if (response.ok) {
        setAdminEmail(responseData.defaultAdminEmail);
        setCompanyName(responseData.companyName);
        setCompanyRegistered(true);
        navigate("/company/thankyou");
        reset();
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(errors);
  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      console.log("Errors:", errors);
      setEr("All fields with * are required");
    }
  }, [errors]);

  return (
    <div className="register">
      <div className="left">
        <div className="logo">
          <img src={logo} alt="BeyondWork Logo" />{" "}
        </div>
        <h1>Register your company and start your journey with us!</h1>
      </div>
      <div className="right">
        <h2>Please fill in all the fields below</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="companyName">* Company Name:</label>
          <input
            type="text"
            placeholder="Company Name"
            {...register("companyName", { required: "This is required." })}
          />

          <div className="fields-wrapper">
            <div className="selection">
              <label htmlFor="companyType">* Industry:</label>
              <select
                {...register("companyType", { required: "This is required." })}
              >
                <option value="" disabled selected>Select</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Building materials">Building materials</option>
                <option value="Chemicals">Chemicals</option>
                <option value="Commerce">Commerce</option>
                <option value="Construction">Construction</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="Education">Education</option>
                <option value="Electronics">Electronics</option>
                <option value="Energy">Energy industry</option>
                <option value="Fashion">Fashion</option>
                <option value="Finance">Financial services</option>
                <option value="Food">Food industry</option>
                <option value="Health care">Health care</option>
                <option value="Hospitality and Tourism">
                  Hospitality and Tourism
                </option>
                <option value="Information technology">
                  Information technology
                </option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Media, Culture">Media, Culture</option>
                <option value="Oil and Gas">Oil and Gas</option>
                <option value="Public Service">Public Service</option>
                <option value="Shipping">Shipping</option>
                <option value="Textiles">Textiles</option>
                <option value="Telecommunication">Telecommunication</option>
                <option value="Transport">Transport</option>
                <option value="Utilities">Utilities</option>
              </select>
            </div>
            <div className="selection">
              <label htmlFor="numberOfEmployees">* Number of Employees:</label>
              <select {...register("numberOfEmployees", { required: true })}>
              <option value="" disabled selected>Select</option>
                <option value="<50">0-50</option>
                <option value="51-100">51-100</option>
                <option value="101-500">101-500</option>
                <option value=">500">more than 500</option>
              </select>
            </div>
          </div>
          <label htmlFor="address">* Company Address:</label>

          <div className="fields-wrapper">
            <input
              type="text"
              placeholder="Street, Building, Office No."
              {...register("address", { required: true })}
            />
            <input
              type="text"
              placeholder="ZipCode"
              {...register("zipCode", { required: true })}
            />
          </div>
          <div className="fields-wrapper">
            <input
              type="text"
              placeholder="City"
              {...register("city", { required: true })}
            />
            <input
              type="text"
              placeholder="Country"
              {...register("country", { required: true })}
            />
          </div>

          <label htmlFor="phoneNumber">* Contact Number:</label>
          <input
            type="text"
            placeholder="Phone Number"
            {...register("phoneNumber", { required: true })}
          />
          <label htmlFor="email">* Company E-mail Address:</label>
          <input
            type="email"
            placeholder="Company E-mail Address"
            {...register("email", { required: true })}
          />
          <label htmlFor="defaultAdminEmail">* Admin E-mail Address:</label>
          <input
            type="email"
            placeholder="Admin E-mail Address"
            {...register("defaultAdminEmail", { required: true })}
          />
          <input type="submit" className="button" />

          {er && <div className="error"> {er}</div>}
        </form>
      </div>
    </div>
  );
};
