import React, { useContext, useEffect, useState } from "react";
import "./CompanyProfile.scss";
import MyContext from "../../context/MyContext";

const CompanyProfile = () => {
  const { userCompany } = useContext(MyContext);
  const [company, setCompany] = useState({});

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/company/viewCompanyProfile/:${userCompany}`,
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
  }, [userCompany, company]);
  return (
    <div className="companyProfile">
      <h1>Company Profile</h1>
      <p>Company Name: {company.companyName}</p>
      <p>Company Type: {company.companyType}</p>
      <p>Number of Employees: {company.numberOfEmployees}</p>
      <p>Company Address:</p>
      <p>Address: {company.companyAddress && company.companyAddress.address}</p>
      <p>City: {company.companyAddress && company.companyAddress.city}</p>
      <p>
        Zip Code: {company.companyAddress && company.companyAddress.zipCode}
      </p>
      <p>Country: {company.companyAddress && company.companyAddress.country}</p>
      <p>Company Contact Details:</p>
      <p>Email: {company.companyContact && company.companyContact.email}</p>
      <p>
        Phone Number:{" "}
        {company.companyContact && company.companyContact.phoneNumber}
      </p>
    </div>
  );
};

export default CompanyProfile;
