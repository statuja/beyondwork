import "./MyProfile.scss";
import profileCover from "../../images/profile_cover.jpg";
import profileAvatar from "../../images/profile_avatar.jpg";
import Topbar from "../../components/Topbar/Topbar";
import Leftbar from "../../components/Leftbar/Leftbar";
import CreatNewPost from "../../components/posts/CreateNewPost"

const MyProfile = () => {
  return (
    <>
      <Topbar />
      <div className="profile">
        {/* <Sidebar /> */}
        <div className="left">
          <div className="cover">
            <img className="coverImg" src={profileCover} alt="cover" />
            <img className="userImg" src={profileAvatar} alt="avatar" />
          </div>
          <div className="top">
            <div className="header">
              <h4 className="name">Meni Bakd</h4>
              <span className="desc">
                Hello my friends! Lorem ipsum, dolor sit amet consectetur
                adipisicing elit. Tempora, voluptatum!
              </span>
            </div>
            <button>Edit Profile</button>
          </div>
          <div className="info">
          <h4 className="title">User information</h4>
          <div className="infoSec">
            <div className="leftbarInfoItem">
              <span className="leftbarInfoKey">City:</span>
              <span className="leftbarInfoValue">Berlin</span>
            </div>
            <div className="leftbarInfoItem">
              <span className="leftbarInfoKey">JobTitle:</span>
              <span className="leftbarInfoValue">Backend Developer</span>
            </div>
            <div className="leftbarInfoItem">
              <span className="leftbarInfoKey">Department:</span>
              <span className="leftbarInfoValue">IT Support</span>
            </div>
          </div>
        </div>
          
          <div className="bottom">
            
            <CreatNewPost/>
          </div>
          {/*  <NewsFeed /> */}
        </div>
      </div>
    </>
  );
};

export default MyProfile;
