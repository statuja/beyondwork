import React, { useContext, useEffect, useState } from "react";
import "./CompanyProfile.scss";
import MyContext from "../../context/MyContext";
import { Link } from "react-router-dom";

const CompanyProfile = () => {
  const { userData } = useContext(MyContext);
  const [company, setCompany] = useState({});
  const companyID = userData.userCompany;

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/company/viewCompanyProfile/${companyID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        setCompany(data);
      } catch (error) {
        console.error("Error fetching company details", error);
      }
    };
    fetchCompanyDetails();
  }, [companyID]);

  return (
    <>
      <div className="profile-main-container">
        <div className="companyProfile">
          <h1>Company Profile</h1>
          {company.companyLogo ? (
            <img
              style={{ width: "200px" }}
              src={`http://localhost:5000/uploads/${company.companyLogo}`}
              alt="Company Logo"
            />
          ) : (
            <p>No logo available</p>
          )}
          <div className="cards">
            <div className="card-wrapper">
              <h3>Company Details</h3>
              <div className="flex-wrapper">
                <h5>Company Name:</h5>
                <p>{company.companyName}</p>
              </div>
              <div className="flex-wrapper">
                <h5> Company Type:</h5> <p>{company.companyType}</p>{" "}
              </div>
              <div className="flex-wrapper">
                <h5> Number of Employees:</h5>
                <p> {company.numberOfEmployees}</p>
              </div>
            </div>
            <div className="card-wrapper">
              <h3>Address</h3>
              <div className="flex-wrapper">
                <h5> Address:</h5>
                <p>
                  {company.companyAddress && company.companyAddress.address}
                </p>
              </div>
              <div className="flex-wrapper">
                <h5> City:</h5>
                <p>{company.companyAddress && company.companyAddress.city}</p>
              </div>
              <div className="flex-wrapper">
                <h5> Zip Code:</h5>
                <p>
                  {company.companyAddress && company.companyAddress.zipCode}
                </p>
              </div>
              <div className="flex-wrapper">
                <h5>Country:</h5>
                <p>
                  {company.companyAddress && company.companyAddress.country}
                </p>
              </div>
            </div>
            <div className="card-wrapper">
              <h3>Contact Details</h3>
              <div className="flex-wrapper">
                <h5> Email: </h5>
                <p>{company.companyContact && company.companyContact.email}</p>
              </div>
              <div className="flex-wrapper">
                <h5> Phone Number:</h5>
                <p>
                  {company.companyContact && company.companyContact.phoneNumber}
                </p>
              </div>
            </div>
          </div>
          <Link
            to={{
              pathname: "/updateCompanyProfile",
              state: {
                company: company,
              },
            }}
          >
            Edit Company Profile
          </Link>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
