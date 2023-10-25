import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../context/MyContext";
import "./CompanyProfile.scss";
import { useNavigate } from "react-router-dom";

const EditCompanyProfile = () => {
  const navigate = useNavigate();
  const { userData } = useContext(MyContext);
  const companyID = userData.userCompany;
  const [companyData, setCompanyData] = useState({
    companyName: "",
    companyType: "",
    numberOfEmployees: "",
    companyLogo: null,
  });

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/company/viewCompanyProfile/${userData.userCompany}`,
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
          setCompanyData({
            companyName: data.companyName,
            companyType: data.companyType,
            numberOfEmployees: data.numberOfEmployees,
            companyLogo: data.companyLogo, // Assuming the company logo URL is received from the backend
          });
        } else {
          console.error("Failed to fetch company data");
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, [userData.userCompany]);

  const handleFileChange = (e) => {
    setCompanyData({ ...companyData, companyLogo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("companyName", companyData.companyName);
    formData.append("companyType", companyData.companyType);
    formData.append("numberOfEmployees", companyData.numberOfEmployees);
    formData.append("companyLogo", companyData.companyLogo);

    try {
      const response = await fetch(
        `http://localhost:5000/company/updateCompanyProfile/${companyID}`,
        {
          method: "PUT",
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
      }
    } catch (error) {
      console.error("Error updating company profile:", error);
    }
  };

  return (
    <>
      <div className="profile-main-container">
        <div className="companyProfile">
          <h1>Company Profile</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={companyData.companyName}
                onChange={(e) =>
                  setCompanyData({
                    ...companyData,
                    companyName: e.target.value,
                  })
                }
              />
              <input
                type="text"
                name="companyType"
                placeholder="Company Type"
                value={companyData.companyType}
                onChange={(e) =>
                  setCompanyData({
                    ...companyData,
                    companyType: e.target.value,
                  })
                }
              />
              <input
                type="text"
                name="numberOfEmployees"
                placeholder="Number of Employees"
                value={companyData.numberOfEmployees}
                onChange={(e) =>
                  setCompanyData({
                    ...companyData,
                    numberOfEmployees: e.target.value,
                  })
                }
              />
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <button type="submit">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCompanyProfile;
