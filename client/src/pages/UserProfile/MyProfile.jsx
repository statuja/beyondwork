import "./MyProfile.scss";
import profileCover from "../../images/profile_cover.jpg";
import profileAvatar from "../../images/profile_avatar.jpg";
import Topbar from "../../components/Topbar/Topbar";
import Leftbar from "../../components/Leftbar/Leftbar";
import CreatNewPost from "../../components/posts/CreateNewPost";

const MyProfile = () => {
  return (
    <>
      <Topbar />
      <div className="profile">
        {/* <Menu/> */}
        <div className="left">
          <div className="cover">
            <img className="coverImg" src={profileCover} alt="cover" />
            <img className="userImg" src={profileAvatar} alt="avatar" />
          </div>
          <div className="top">
            <div className="header">
              <h4>Meni Bakd</h4>
              <span>
                Hello my friends! Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Tempora, voluptatum!
              </span>
            </div>
            <button>Edit Profile</button>
          </div>
          <div className="info">
            <h4>User information</h4>
            <div className="infoSec">
              <div className="infoItem">
                <span className="infoKey">City:</span>
                <span className="infoValue">Berlin</span>
              </div>
              <div className="infoItem">
                <span className="infoKey">JobTitle:</span>
                <span className="infoValue">Backend Developer</span>
              </div>
              <div className="infoItem">
                <span className="infoKey">Department:</span>
                <span className="infoValue">IT Support</span>
              </div>
            </div>
          </div>

          <div className="bottom">
          </div>
          {/*  <NewsFeed /> */}
        </div>
      </div>
    </>
  );
};

export default MyProfile;
