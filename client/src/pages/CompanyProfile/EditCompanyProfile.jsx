import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../context/MyContext";
import "./EditCompanyProfile.scss";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCompanyProfile = () => {
  const navigate = useNavigate();
  const { userData, isDarkMode } = useContext(MyContext);
  const companyID = userData.userCompany;
  const [companyData, setCompanyData] = useState({
    companyName: "",
    companyType: "",
    numberOfEmployees: "",
    companyAddress: {
      address: "",
      city: "",
      zipCode: "",
      country: "",
    },
    companyContact: {
      email: "",
      phoneNumber: "",
    },
    companyLogo: null,
  });

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/company/viewCompanyProfile/${companyID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCompanyData(data);
        } else {
          console.error("Failed to fetch company data");
          toast.error("Failed to fetch company data.");
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
        toast.error("Error fetching company data.");
      }
    };

    fetchCompanyData();
  }, [userData.userCompany]);

  const handleFileChange = (e) => {
    setCompanyData({ ...companyData, companyLogo: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...companyData };

    if (name.includes(".")) {
      const [nestedKey, nestedField] = name.split(".");
      updatedFormData[nestedKey][nestedField] = value;
    } else if (name.startsWith("CompanyContact")) {
      const [parentKey, nestedField] = name.split(".");
      updatedFormData[parentKey][nestedField] = value;
    } else {
      updatedFormData[name] = value;
    }
    console.log(updatedFormData);
    setCompanyData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("companyName", companyData.companyName);
    formData.append("CompanyID", companyData.companyID);
    formData.append("companyType", companyData.companyType);
    formData.append("numberOfEmployees", companyData.numberOfEmployees);
    formData.append("companyLogo", companyData.companyLogo);
    formData.append(
      "companyAddress.address",
      companyData.companyAddress.address
    );
    formData.append("companyAddress.city", companyData.companyAddress.city);
    formData.append(
      "companyAddress.zipCode",
      companyData.companyAddress.zipCode
    );
    formData.append(
      "companyAddress.country",
      companyData.companyAddress.country
    );
    formData.append("companyContact.email", companyData.companyContact.email);
    formData.append(
      "companyContact.phoneNumber",
      companyData.companyContact.phoneNumber
    );

    try {
      const response = await fetch(
       `${process.env.REACT_APP_BACKEND_URL}/company/updateCompanyProfile/${companyID}`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        navigate("/company/profile");
        console.log("Company profile updated:", data);
      } else {
        console.error("Error updating company profile");
        toast.error("Error updating company data.");
      }
    } catch (error) {
      console.error("Error updating company profile:", error);
      toast.error("Failed to update company data.");
    }
  };

  const handleCancel = () => {
    navigate("/company/profile");
  };

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div
      className={`EditcompanyProfile ${isDarkMode ? "dark-mode" : "light-mode"}`}
    >
      <h1>Edit Company Profile</h1>
      {companyData.companyLogo ? (
        <img
          style={{ width: "200px" }}
          src={``${process.env.REACT_APP_BACKEND_URL}/uploads/${companyData.companyLogo}`}
          alt="Company Logo"
        />
      ) : (
        <p>No logo available</p>
      )}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button type="button" onClick={handleClick}>
        Upload a new logo
      </button>
      <div className="bottom">
        <form className="cards-container" onSubmit={handleSubmit}>
          <div className="card">
            <h3>Company Details</h3>
            <div className="flex-wrapper">
              <div className="labels">
                <div className="label">
                  <h5>Company Name:</h5>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={companyData.companyName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="label">
                  <h5> Company Type:</h5>
                  <input
                    type="text"
                    name="companyType"
                    placeholder="Company Type"
                    value={companyData.companyType}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="label">
                  <h5> Number of Employees:</h5>
                  <input
                    type="text"
                    name="numberOfEmployees"
                    placeholder="Number of Employees"
                    value={companyData.numberOfEmployees}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <h3>Company Address</h3>
            <div className="flex-wrapper">
              <div className="labels">
                <div className="label">
                  <h5> Address:</h5>
                  <input
                    type="text"
                    name="companyAddress.address"
                    placeholder="Address"
                    value={companyData.companyAddress.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="label">
                  <h5> City:</h5>
                  <input
                    type="text"
                    name="companyAddress.city"
                    placeholder="city"
                    value={companyData.companyAddress.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="label">
                  <h5> Zip Code:</h5>
                  <input
                    type="text"
                    name="companyAddress.zipCode"
                    placeholder="zipCode"
                    value={companyData.companyAddress.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="label">
                  <h5>Country:</h5>
                  <input
                    type="text"
                    name="companyAddress.country"
                    placeholder="country"
                    value={companyData.companyAddress.country}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <h3>Contact Details</h3>
            <div className="flex-wrapper">
              <div className="labels">
                <div className="label">
                  <h5> Email: </h5>
                  <input
                    type="email"
                    name="companyContact.email"
                    placeholder="email"
                    value={companyData.companyContact.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="label">
                  <h5> Phone Number:</h5>
                  <input
                    type="text"
                    name="companyContact.phoneNumber"
                    placeholder="phone Number"
                    value={companyData.companyContact.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>{" "}
        </form>{" "}
        <div className="Submitbuttons">
          <Link onClick={handleSubmit}>Save Changes</Link>
          <Link onClick={handleCancel}>Cancel</Link>
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
    </div>
  );
};

export default EditCompanyProfile;
