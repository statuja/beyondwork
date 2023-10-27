import "./Topbar.scss";
import iconMobile from "../../images/small_icon_yellow.png";
import SearchIcon from "@mui/icons-material/Search";
//import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import MyContext from "../../context/MyContext";

export default function Topbar() {
  const { userData } = useContext(MyContext);
  //const isMobile = window.innerWidth <= 768;
  return (
    <div className="topbarContainer">
      <div className="left">
        <span className="logo">
          {/*  {isMobile ? (
             <img src={iconMobile} alt="" />
          ) : (
            <h3>BeyondWork</h3>
          )} */}
          <Link to="/newsfeed">
            <img src={iconMobile} alt="" />
            <h3>BeyondWork</h3>
          </Link>
        </span>
        <DarkModeOutlinedIcon className="icon" />
      </div>
      <div className="center">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input placeholder="Search for..." />
        </div>
      </div>
      <div className="right">
        <div className="icons">
          <div className="iconItem">
            <ChatIcon />
            <span>2</span>
          </div>
          <div className="iconItem">
            <NotificationsIcon />
            <span>1</span>
          </div>
        </div>
        <Link to="/user/profile/me">
          {userData && userData.userImage && (
            <img
              className="user-image-placeholder"
              src={`http://localhost:5000/user/uploads/${userData.userImage}`}
              alt="userImage"
            />
          )}
        </Link>
      </div>
    </div>
  );
}
