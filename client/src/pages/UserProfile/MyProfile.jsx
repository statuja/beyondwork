import "./MyProfile.scss";
import profileCover from "../../images/profile_cover.jpg";
import profileAvatar from "../../images/profile_avatar.jpg"
import Topbar from "../../components/Topbar/Topbar";


const MyProfile = () => {
  
  return (
    <>
     <Topbar /> 
    <div className="profile">
      {/* <Sidebar /> */}
      <div className="right">
        <div className="rightTop">
          <div className="cover">
            <img
              className="coverImg"
              src={profileCover}
              alt="cover"
            />
            <img
              className="userImg"
              src={profileAvatar}
              alt="avatar"
            />
          </div>
          <div className="info">
              <h4 className="infoName">Meni Bakd</h4>
              <span className="infoDesc">Hello my friends!</span>
          </div>
        </div>
        <div className="rightBottom">
         {/*  <NewsFeed /> */}
          {/* <Rightbar /> */}
        </div>
      </div>
    </div>
  </>
  )
}

export default MyProfile