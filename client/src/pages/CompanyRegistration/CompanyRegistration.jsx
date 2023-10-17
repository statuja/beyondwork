import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import "./CompanyRegistration.scss";
import logo from "../../images/Logo_green.png";
import { useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";

export const CompanyRegistration = () => {
  const navigate = useNavigate();
  const { setAdminEmail, setCompanyName } = useContext(MyContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
        navigate("/company/thankyou");
        setMessage(
          `You have successfully registered your company. Here is your Admin email ${responseData.defaultAdminEmail} and your temporary password: admin1234. Please change your login password and update your details.`
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
    <div className="register">
      <div className="left">
        <div className="logo">
          <img src={logo} alt="BeyondWork Logo" />{" "}
        </div>
        <h1>Register your company and start your journey with us!</h1>
       
      </div>
      <div className="right">
        <h2>Please fill in the fields below</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            placeholder="Company Name"
            {...register("companyName", { required: true })}
          />
          <div className="wrapper">
            <div className="selection">
              <label htmlFor="companyType">Industry:</label>
              <select {...register("companyType", { required: true })}>
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
              <label htmlFor="numberOfEmployees">Number of Employees:</label>
              <select {...register("numberOfEmployees")}>
                <option value="<50">0-50</option>
                <option value="51-100">51-100</option>
                <option value="101-500">101-500</option>
                <option value=">500">more than 500</option>
              </select>
            </div>
          </div>
          <label htmlFor="address">Company Address:</label>
          <div className="wrapper">
            
          <input
            type="text"
            placeholder="Street, Building, Office No."
            {...register("address")}
          />
          <input type="text" placeholder="ZipCode" {...register("zipCode")} />
          </div>
          <div className="wrapper"> <input type="text" placeholder="City" {...register("city")} />
          <input type="text" placeholder="Country" {...register("country")} /></div>
         
         
          
          <label htmlFor="phoneNumber">Contact Number:</label>
          <input
            type="text"
            placeholder="Phone Number"
            {...register("phoneNumber")}
          />
          <label htmlFor="email">Company E-mail Address:</label>
          <input
            type="email"
            placeholder="Company E-mail Address"
            {...register("email")}
          />
          <label htmlFor="defaultAdminEmail">Admin E-mail Address:</label>
          <input
            type="email"
            placeholder="Admin E-mail Address"
            {...register("defaultAdminEmail")}
          />
          <input type="submit" className="button" />
          {error && <div>Error: {error}</div>} {message && <div>{message}</div>}
        </form>
      </div>
    </div>
  );
};
