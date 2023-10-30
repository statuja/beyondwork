import React, { useContext, useEffect, useState } from "react";
import "./CompanyProfile.scss";
import MyContext from "../../context/MyContext";
import { Link, useNavigate } from "react-router-dom";

const CompanyProfile = () => {
  const navigate = useNavigate();
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
        if (response.ok) {
          const data = await response.json();
          if (data.success === false) {
            alert("Session expired, please login again!");
            setCompany({});
            return navigate("/");
          }
          setCompany(data);
        } else {
          console.error("Error updating profile:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching company details", error);
      }
    };
    fetchCompanyDetails();
  }, [companyID]);

  return (
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
      <div className="bottom">
        <div className="cards-container">
          <div className="card">
            <h3>Company Details</h3>
            <div className="flex-wrapper">
              <div className="labels">
                <h5>Company Name:</h5>
                <h5> Company Type:</h5>
                <h5> Number of Employees:</h5>
              </div>
              <div className="data">
                <p>{company.companyName}</p>
                <p>{company.companyType}</p>
                <p> {company.numberOfEmployees}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <h3>Company Address</h3>
            <div className="flex-wrapper">
              <div className="labels">
                <h5> Address:</h5>
                <h5> City:</h5>
                <h5> Zip Code:</h5>
                <h5>Country:</h5>
              </div>
              <div className="data">
                <p>
                  {company.companyAddress && company.companyAddress.address}
                </p>
                <p>{company.companyAddress && company.companyAddress.city}</p>
                <p>
                  {company.companyAddress && company.companyAddress.zipCode}
                </p>
                <p>
                  {company.companyAddress && company.companyAddress.country}
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <h3>Contact Details</h3>
            <div className="flex-wrapper">
              <div className="labels">
                <h5> Email: </h5>
                <h5> Phone Number:</h5>
              </div>
              <div className="data">
                <p>{company.companyContact && company.companyContact.email}</p>{" "}
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
          Edit Company Profile
        </Link>
      ) : null}
    </div>
  );
};

export default CompanyProfile;
