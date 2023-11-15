import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./MyProfile.scss";
import "./EditMyProfile.scss";
import MyContext from "../../context/MyContext";
import "react-toastify/dist/ReactToastify.css";

function EditMyProfile() {
  const { userData, setUserData, setSessionExpired, isDarkMode } =
    useContext(MyContext);
  console.log(userData);
  const navigate = useNavigate();
  const userId = userData._id;
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    userFullName: "",
    userJobTitle: "",
    userDepartment: "",
    userAddress: {
      zipCode: "",
      country: "",
      city: "",
      address: "",
    },
    userContact: {
      phoneNumber: "",
      email: "",
    },
    coverImage: null,
    userImage: null,
    description: "",
    dateOfBirth: "",
    userPassword: "",
  });
  const [loading, setLoading] = useState(true);
  console.log(formData);
  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };

    if (name.includes(".")) {
      const [nestedKey, nestedField] = name.split(".");
      if (!updatedFormData[nestedKey]) {
        updatedFormData[nestedKey] = {};
      }
      updatedFormData[nestedKey][nestedField] = value;
    } else if (
      name.startsWith("userContact") ||
      name.startsWith("userAddress")
    ) {
      const [parentKey, nestedField] = name.split(".");
      if (!updatedFormData[parentKey]) {
        updatedFormData[parentKey] = {};
      }
      updatedFormData[parentKey][nestedField] = value;
    } else {
      if (name !== "userPassword") updatedFormData[name] = value;
    }
    console.log(updatedFormData);
    setFormData(updatedFormData);
  };

  const handleImageChange = (e) => {
    const targetName = e.target.name;
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (targetName === "userImage") {
        setFormData((prevData) => ({
          ...prevData,
          userImage: file,
        }));
      } else if (targetName === "coverImage") {
        setFormData((prevData) => ({
          ...prevData,
          coverImage: file,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { savedPosts, userPassword, ...formDataWithoutSavedPosts } = formData;
    const updatedFormData = new FormData();
    for (const key in formDataWithoutSavedPosts) {
      if (key === "userAddress" || key === "userContact") {
        for (const nestedKey in formDataWithoutSavedPosts[key]) {
          updatedFormData.append(
            `${key}.${nestedKey}`,
            formDataWithoutSavedPosts[key][nestedKey]
          );
        }
      } else {
        updatedFormData.append(key, formDataWithoutSavedPosts[key]);
      }
    }

    try {
      const requestOptions = {
        method: "PUT",
        body: updatedFormData,
        credentials: "include",
      };

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/updateMyProfile/${userId}`,
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();

        if (data.success === false) {
          setSessionExpired(true);
          setUserData({});
          return navigate("/");
        }

        setUserData({ ...data });
        console.log("profile updated:", data);
        navigate(`/user/profile/${userData._id}`);
      } else {
        console.error("Error updating profile:", response.statusText);
        toast.error("Error updating profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile.");
    }
  };

  const handleClickCover = () => {
    document.getElementById("coverInput").click();
  };

  const handleClickProfile = () => {
    document.getElementById("profileInput").click();
  };

  const handleCancel = () => {
    navigate(`/user/profile/${userData._id}`);
  };

  return (
    <>
      <div
        className={`edit-profile ${isDarkMode ? "dark-mode" : "light-mode"}`}
      >
        <div className="edit-cover">
          {userData && userData.coverImage && (
            <img
              className="e-coverImg"
              src={`${process.env.REACT_APP_BACKEND_URL}/user/uploads/${userData.coverImage}`}
              alt="coverImage"
            />
          )}
          {userData && userData.userImage && (
            <img
              className="e-userImg"
              src={`${process.env.REACT_APP_BACKEND_URL}/user/uploads/${userData.userImage}`}
              alt="userImage"
            />
          )}
          <div className="upload-buttons">
            <button type="button" onClick={handleClickProfile}>
              Profile picture
            </button>
            <input
              type="file"
              name="userImage"
              accept="image/*"
              id="profileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <button type="button" onClick={handleClickCover}>
              Cover picture
            </button>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              id="coverInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="bottom">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="userFullName">Full Name: </label>
              <input
                type="text"
                name="userFullName"
                value={formData.userFullName}
                onChange={handleInputChange}
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="description">About me: </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="description"
                rows={6}
              />
            </div>
            <div>
              <label htmlFor="userJobTitle">Job Title: </label>
              <input
                type="text"
                name="userJobTitle"
                value={formData.userJobTitle}
                onChange={handleInputChange}
                placeholder="Job Title"
              />
            </div>

            <div>
              <label htmlFor="userDepartment">Department: </label>
              <input
                type="text"
                name="userDepartment"
                value={formData.userDepartment}
                onChange={handleInputChange}
                placeholder="Department"
              />
            </div>

            <div>
              <label htmlFor="userAddress.address">Address: </label>
              <input
                type="text"
                name="userAddress.address"
                value={
                  formData.userAddress?.address && formData.userAddress.address
                    ? formData.userAddress.address
                    : ""
                }
                onChange={handleInputChange}
                placeholder="Address"
              />
            </div>

            <div>
              <label htmlFor="userAddress.city">City: </label>
              <input
                type="text"
                name="userAddress.city"
                value={
                  formData.userAddress?.city && formData.userAddress.city
                    ? formData.userAddress.city
                    : ""
                }
                onChange={handleInputChange}
                placeholder="city"
              />
            </div>

            <div>
              <label htmlFor="userAddress.country">Country: </label>
              <input
                type="text"
                name="userAddress.country"
                value={
                  formData.userAddress?.country && formData.userAddress?.country
                    ? formData.userAddress.country
                    : ""
                }
                onChange={handleInputChange}
                placeholder="country"
              />
            </div>

            <div>
              <label htmlFor="userAddress.zipCode">Zipcode: </label>
              <input
                type="text"
                name="userAddress.zipCode"
                value={
                  formData.userAddress?.zipCode && formData.userAddress.zipCode
                    ? formData.userAddress.zipCode
                    : ""
                }
                onChange={handleInputChange}
                placeholder="zipCode"
              />
            </div>

            <div>
              <label htmlFor="dateOfBirth">Date of Birth: </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                placeholder="DateOfBirth"
              />
            </div>

            <div>
              <label htmlFor="userContact.email">Email: </label>
              <input
                type="email"
                name="userContact.email"
                value={formData.userContact?.email || ""}
                onChange={handleInputChange}
                placeholder="E-mail"
              />
            </div>

            <div>
              <label htmlFor="userPassword">Password: </label>
              <input
                type="password"
                name="userPassword"
                value={
                  formData.userPassword && formData.userPassword
                    ? formData.userPassword
                    : ""
                }
                onChange={handleInputChange}
                placeholder="Password"
              />
            </div>

            <div className="form-buttons">
              <Link className="btn" onClick={handleCancel}>
                Cancel
              </Link>
              <button type="submit" className="btn">
                Save
              </button>
            </div>
          </form>
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
    </>
  );
}

export default EditMyProfile;
