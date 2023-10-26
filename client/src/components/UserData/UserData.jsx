import "./UserData.scss";

const UserData = ({ isMe, user }) => {
  if (isMe) {
    return (
      <>
        <div className="profileLeft">
          <div className="header">
            <h4>{user.userFullName}</h4>
            <span>
              Hello my friends! Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Tempora, voluptatum!
            </span>
          </div>
        
        <div className="info">
         
          
          <div className="infoSec">
            <div className="infoItem">
              <span className="infoKey">JobTitle:</span>
              <span className="infoValue">{user.userJobTitle}</span>
            </div>
            <div className="infoItem">
              <span className="infoKey">Department:</span>
              <span className="infoValue">{user.userDepartment}</span>
            </div>
            <div className="infoItem">
              <span className="infoKey">Address:</span>
              <span className="infoValue">{user.userAddress.address}</span>
            </div>
            <div className="infoItem">
              <span className="infoKey">ZipCode:</span>
              <span className="infoValue">123456</span>
            </div>
            <div className="infoItem">
              <span className="infoKey">City:</span>
              <span className="infoValue">{user.userAddress.city}</span>
            </div>
            <div className="infoItem">
              <span className="infoKey">Country:</span>
              <span className="infoValue">Germany</span>
            </div>
            <div className="infoItem">
              <span className="infoKey">Phone Number:</span>
              <span className="infoValue">+123456789</span>
            </div>
            <div className="infoItem">
              <span className="infoKey">Email:</span>
              <span className="infoValue">{user.userContact.email}</span>
            </div>
            <div className="infoItem">
              <span className="infoKey">Password:</span>
              <span className="infoValue">*********</span>
            </div>
            <div className="infoItem">
              <span className="infoKey">Date of Birth:</span>
              <span className="infoValue">12.12.1990</span>
            </div>
          </div>
        </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="userDataWrapper">
        <div className="top">
          <div className="header">
            <h4>Name: {user.userFullName}</h4>
            <span>
              Hello my friends! Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Tempora, voluptatum!
            </span>
          </div>
        </div>
        <div className="info">
          <h4>User information</h4>
          <div className="infoSec">
            <div className="infoItem">
              <span className="infoKey">JobTitle:</span>
              <span className="infoValue">{user.userJobTitle}</span>
            </div>
            <div className="infoItem">
              <span className="infoKey">Department:</span>
              <span className="infoValue">{user.userDepartment}</span>
            </div>

            <div className="infoItem">
              <span className="infoKey">City:</span>
              <span className="infoValue">{user.city}</span>
            </div>
            <div className="infoItem">
              <span className="infoKey">Country:</span>
              <span className="infoValue">{user.country}</span>
            </div>
            <div className="infoItem">
              <span className="infoKey">Date of Birth:</span>
              <span className="infoValue">12.12.1990</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default UserData;
