import React, { useState, useEffect, useContext } from "react";
import MyContext from "../../context/MyContext";
import { Link, useNavigate } from "react-router-dom";
import "./MyProfile.scss";
import "./EditMyProfile.scss"

function EditMyProfile() {
  const { userData, setUserData } = useContext(MyContext);
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

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/myProfile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          const formattedDate = new Date(data.dateOfBirth)
            .toISOString()
            .split("T")[0];
          setFormData(data); // Set the fetched data to the formData state

          setFormData({ ...data, dateOfBirth: formattedDate });
          setLoading(false);
        } else {
          throw new Error(
            `Failed to fetch user data. Status: ${response.status}`
          );
        }
      } catch (error) {
        throw new Error(`Error fetching user data: ${error.message}`);
      }
    };
    fetchMyProfile()
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details", error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };

    if (name.includes(".")) {
      const [nestedKey, nestedField] = name.split(".");
      updatedFormData[nestedKey][nestedField] = value;
    } else if (name.startsWith("userContact")) {
      const [parentKey, nestedField] = name.split(".");
      updatedFormData[parentKey][nestedField] = value;
    } else {
      updatedFormData[name] = value;
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
    const { savedPosts, ...formDataWithoutSavedPosts } = formData; // Destructure formData to exclude the savedPosts field
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
        `http://localhost:5000/user/updateMyProfile/${userId}`,
        requestOptions
      );

      if (response.ok) {
        const data = await response.json();

        if (data.success === false) {
          alert("Server error");
          setUserData({});
          return navigate("/");
        }

        setUserData({ ...data });
        console.log("profile updated:", data);
        navigate(`/user/profile/${userData._id}`);
      } else {
        console.error("Error updating profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
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
      <div className="profile">
      <h1>Edit Your Profile</h1>
        <div className="cover">
          <div className="user-images">
          {userData && userData.coverImage && (
            <img
              style={{ width: "400px" }}
              className="coverImg"
              src={`http://localhost:5000/user/uploads/${userData.coverImage}`}
              alt="coverImage"
            />
          )}
          {userData && userData.userImage && (
            <img
              className="userImg"
              src={`http://localhost:5000/user/uploads/${userData.userImage}`}
              alt="userImage"
            />
          )}
          </div>
          <div className="upload-buttons">
            <button type="button" onClick={handleClickCover}>
            Upload a new cover photo
            </button>
            {/* <label htmlFor="coverImage">Change Cover Image</label> */}
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              id="coverInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <button type="button" onClick={handleClickProfile}>
            Upload a new profile picture
            </button>
            {/* <label htmlFor="userImage">Change Avatar</label> */}
            <input
              type="file"
              name="userImage"
              accept="image/*"
              id="profileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="bottom">

            <form onSubmit={handleSubmit}>
              <div>
                <label name="userFullName">Full Name: </label>
              <input
                type="text"
                name="userFullName"
                value={formData.userFullName}
                onChange={handleInputChange}
                placeholder="Full Name"
              />
              </div>
              <div>
                <label name="userJobTitle">Job Title: </label>
              <input
                type="text"
                name="userJobTitle"
                value={formData.userJobTitle}
                onChange={handleInputChange}
                placeholder="Job Title"
              />
              </div>
              
              <div>
                <label name="userDepartment">Department: </label>
              <input
                type="text"
                name="userDepartment"
                value={formData.userDepartment}
                onChange={handleInputChange}
                placeholder="Department"
              />
              </div>
              
              <div>
                <label name="userAddress.address">Address: </label>
                <input
                type="text"
                name="userAddress.address"
                value={
                  formData.userAddress.address && formData.userAddress.address
                    ? formData.userAddress.address
                    : ""
                }
                onChange={handleInputChange}
                placeholder="Address"
              />
              </div> 
              
              <div>
                <label name="userAddress.city">City: </label>
              <input
                type="text"
                name="userAddress.city"
                value={
                  formData.userAddress.city && formData.userAddress.city
                    ? formData.userAddress.city
                    : ""
                }
                onChange={handleInputChange}
                placeholder="city"
              />
              </div>
              
              <div>
              <label name="userAddress.country">Country: </label>
              <input
                type="text"
                name="userAddress.country"
                value={
                  formData.userAddress.country && formData.userAddress.country
                    ? formData.userAddress.country
                    : ""
                }
                onChange={handleInputChange}
                placeholder="country"
              />
              </div>
              
              <div>
                <label name="userAddress.zipCode">Zipcode: </label>
              <input
                type="text"
                name="userAddress.zipCode"
                value={
                  formData.userAddress.zipCode && formData.userAddress.zipCode
                    ? formData.userAddress.zipCode
                    : ""
                }
                onChange={handleInputChange}
                placeholder="zipCode"
              />
              </div>
              
              <div>
                <label name="dateOfBirth">Date of Birth: </label>
                <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                placeholder="DateOfBirth"
              />
              </div>
              
              <div>
                <label name="description">Description: </label>
                <br></br>
                <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="description"
              />
              </div>
              
              <div>
                <label name="userContact.email">Email: </label>
              <input
                type="email"
                name="userContact.email"
                value={formData.userContact?.email || ""}
                onChange={handleInputChange}
                placeholder="E-mail"
              />
              </div>

              <div>
                <label name="userPassword">Password: </label>
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
              <Link onClick={handleCancel}>Cancel</Link>
              <button type="submit">Save Changes</button>
              </div>
            </form>
        </div>
      </div>
    </>
  );
}

export default EditMyProfile;
