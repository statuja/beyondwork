import React, { useContext, useEffect, useState } from "react";
import "./CompanyProfile.scss";
import MyContext from "../../context/MyContext";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyProfile = () => {
  const navigate = useNavigate();
  const { userData, setSessionExpired, isDarkMode } = useContext(MyContext);
  const [company, setCompany] = useState({});
  const companyID = userData.userCompany;

  useEffect(() => {
    const fetchCompanyDetails = async () => {
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
          if (data.success === false) {
            setSessionExpired(true);
            setCompany({});
            return navigate("/");
          }
          setCompany(data);
        } else {
          console.error("Error fetching data:", response.statusText);
          toast.error("Failed to fetch company details.");
        }
      } catch (error) {
        console.error("Error fetching company details", error);
        toast.error("Error fetching company details.");
      }
    };
    fetchCompanyDetails();
  }, [companyID]);

  return (
    <div
      className={`companyProfile ${isDarkMode ? "dark-mode" : "light-mode"}`}
    >
      <h1>Company Profile</h1>
      {company.companyLogo ? (
        <img
          style={{ width: "200px" }}
          src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${company.companyLogo}`}
          alt="Company Logo"
        />
      ) : (
        <p>No logo available</p>
      )}
      <div className="bottom">
        <div className="cards-container">
          <div className="card">
            <div>
              <h3>Company Details</h3>
              <div className="label">
                <h5>Company Name:</h5>
                <p>{company.companyName}</p>
              </div>
              <div className="label">
                <h5>Company Type:</h5>
                <p>{company.companyType}</p>
              </div>
              <div className="label">
                <h5>Number of Employees:</h5>
                <p> {company.numberOfEmployees}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div>
              <h3>Company Address</h3>
              <div className="label">
                <h5>Address:</h5>
                <p>
                  {company.companyAddress && company.companyAddress.address}
                </p>
              </div>
              <div className="label">
                <h5>City:</h5>
                <p>{company.companyAddress && company.companyAddress.city}</p>
              </div>
              <div className="label">
                <h5>Zip Code:</h5>
                <p>
                  {company.companyAddress && company.companyAddress.zipCode}
                </p>
              </div>
              <div className="label">
                <h5>Country:</h5>
                <p>
                  {company.companyAddress && company.companyAddress.country}
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <div>
              <h3>Contact Details</h3>
              <div className="label">
                <h5>Email:</h5>
                <p>{company.companyContact && company.companyContact.email}</p>
              </div>
              <div className="label">
                <h5>Phone Number:</h5>
                <p>
                  {company.companyContact && company.companyContact.phoneNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {userData.adminRole ? (
        <Link
          to={{
            pathname: "/updateCompanyProfile",
            state: {
              company: company,
            },
          }}
        >
          Edit Profile
        </Link>
      ) : null}
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

export default CompanyProfile;
