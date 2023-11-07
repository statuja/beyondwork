import "./UserData.scss";
import { Link } from "react-router-dom";

const UserData = ({ isMe, user }) => {
  //console.log("isme", isMe)

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    return `${formattedDate}`;
  };

  if (isMe) {
    return (
      <>
        <div className="profileLeftCont">
          <div className="header">
            <h2>{user.userFullName}</h2>
            <span><h3>About me:</h3> {user.description}</span>
          </div>

          <div className="infoSec">
            <div className="infoItem">
              <span className="infoKey">JobTitle:</span>
              <span className="infoValue">{user?.userJobTitle}</span>
            </div>
            <div className="infoItem">
              <span className="infoKey">Department:</span>
              <span className="infoValue">{user?.userDepartment}</span>
            </div>
            <div className="infoItem">
              <span className="infoKey">Address:</span>
              <span className="infoValue">{user?.userAddress?.address}</span>
            </div>
            <div className="infoItem">
              <span className="infoKey">ZipCode:</span>
              <span className="infoValue">{user?.userAddress?.zipCode}</span>
            </div>
            <div className="infoItem">
              <span className="infoKey">City:</span>
              <span className="infoValue">{user?.userAddress?.city}</span>
            </div>
            <div className="infoItem">
              <span className="infoKey">Country:</span>
              <span className="infoValue">{user?.userAddress?.country}</span>
            </div>
            <div className="infoItem">
              <span className="infoKey">Phone Number:</span>
              <span className="infoValue">
                {user?.userContact?.phoneNumber}
              </span>
            </div>
            <div className="infoItem">
              <span className="infoKey">Email:</span>
              <span className="infoValue">{user?.userContact?.email}</span>
            </div>

            <div className="infoItem">
              <span className="infoKey">Date of Birth:</span>
              <span className="infoValue">
                {formatDateTime(user?.dateOfBirth)}
              </span>
            </div>
          </div>
            <Link to="/user/editmyprofile">Edit profile</Link>
        </div>
      </>
    );
  } else {
    return (
      <div className="profileLeftCont">
        <div className="header">
          <h2>{user?.userFullName}</h2>
          <span>{user.description}</span>
        </div>

        <div className="infoSec">
          <div className="infoItem">
            <span className="infoKey">JobTitle:</span>
            <span className="infoValue">{user?.userJobTitle}</span>
          </div>
          <div className="infoItem">
            <span className="infoKey">Department:</span>
            <span className="infoValue">{user?.userDepartment}</span>
          </div>

          <div className="infoItem">
            <span className="infoKey">City:</span>
            <span className="infoValue">{user?.userAddress?.city}</span>
          </div>
          <div className="infoItem">
            <span className="infoKey">Country:</span>
            <span className="infoValue">{user?.userAddress?.country}</span>
          </div>
          <div className="infoItem">
            <span className="infoKey">Date of Birth:</span>
            <span className="infoValue">
              {formatDateTime(user?.dateOfBirth)}
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default UserData;
