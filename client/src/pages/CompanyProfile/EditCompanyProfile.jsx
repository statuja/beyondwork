import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import Topbar from "../../components/Topbar/Topbar";
import Footer from "../../components/Footer/Footer";
import Menu from "../../components/Menu/Menu";

export const UpdateCompanyProfile = () => {
  const navigate = useNavigate();
  const { setCompanyName } = useContext(MyContext);

  const {
    register,
    handleSubmit,
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
      const response = await fetch(
        "http://localhost:5000/company/updateCompanyProfile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",

          body: JSON.stringify(newData),
        }
      );

      const responseData = await response.json();
      if (response.ok) {
        setCompanyName(responseData.companyName);
        navigate("/company/profile");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      console.log("Errors:", errors);
      setEr("All fields with * are required");
    }
  }, [errors]);

  return (
    <>
      <Topbar />
      <div className="main-container">
        <div className="edit-profile">
          <h1>Edit Your Company Profile</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="cards">
              <div className="card-wrapper">
                <h3>Company Details</h3>
                <div className="flex-wrapper">
                  <h5>Company Name:</h5>
                  <input
                    type="text"
                    {...register("companyName")}
                  />
                </div>
                <div className="flex-wrapper">
                  <h5> Company Type:</h5>
                  <label htmlFor="companyType">Industry:</label>
                  <select {...register("companyType")}>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Building materials">
                      Building materials
                    </option>
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
                    <option value="Utilities">Utilities</option>{" "}
                  </select>
                </div>
                <div className="flex-wrapper">
                  <h5> Number of Employees:</h5>

                  <select {...register("numberOfEmployees")}>
                    <option value="<50">0-50</option>
                    <option value="51-100">51-100</option>
                    <option value="101-500">101-500</option>
                    <option value=">500">more than 500</option>
                  </select>
                </div>
              </div>
              <div className="card-wrapper">
                <h3>Address</h3>
                <div className="flex-wrapper">
                  <h5> Address:</h5>
                  <input
                    type="text"
                    placeholder="Street, Building, Office No."
                    {...register("address")}
                  />{" "}
                </div>
                <div className="flex-wrapper">
                  <h5> Zip Code:</h5>
                  <input
                    type="text"
                    placeholder="ZipCode"
                    {...register("zipCode")}
                  />
                </div>
                <div className="flex-wrapper">
                  <h5> City:</h5>
                  <input type="text" placeholder="City" {...register("city")} />
                </div>
                <div className="flex-wrapper">
                  <h5>Country:</h5>
                  <input
                    type="text"
                    placeholder="Country"
                    {...register("country")}
                  />
                </div>
              </div>
              <div className="card-wrapper">
                <h3>Contact Details</h3>
                <div className="flex-wrapper">
                  <h5> Email: </h5>
                  <input
                    type="text"
                    placeholder="E-mail"
                    {...register("email")}
                  />
                </div>
                <div className="flex-wrapper">
                  <h5> Phone Number:</h5>{" "}
                  <input
                    type="text"
                    placeholder="Phone Number"
                    {...register("phoneNumber")}
                  />
                </div>
              </div>

              <input type="submit" className="button" />

              {er && <div className="error"> {er}</div>}
            </div>{" "}
          </form>
        </div>
      </div>
      <div className="leftmenu">
        <Menu />
      </div>
      <Footer />
    </>
  );
};
