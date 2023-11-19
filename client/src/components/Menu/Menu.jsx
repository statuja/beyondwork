import "./menu.scss";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SpaIcon from "@mui/icons-material/Spa";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const Menu = () => {
  const navigate = useNavigate();
  const { userData, setUserData, setLoggedOut, isDarkMode } =
    useContext(MyContext);

  const handleOnClick = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/logout`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        localStorage.clear();
        setUserData({});
        setLoggedOut(true);
        navigate("/");
      } else {
        alert(responseData.error[0].msg);
      }
    } catch (error) {
      alert(
        "An error occurred while processing your request. Please try again later."
      );
    }
  };
  return (
    <>
      <ul className={`menu ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        <li>
          <Link to={`/user/profile/${userData._id}`}>
            <AccountCircleOutlinedIcon className="icon" /> My Profile
          </Link>
        </li>
        <li>
          <Link to="/company/profile">
            <ApartmentOutlinedIcon className="icon" /> Company Profile
          </Link>
        </li>
        <li>
          <Link to="/newsfeed">
            <NewspaperIcon className="icon" /> News Feed
          </Link>
        </li>
        {userData.adminRole ? (
          <li>
            <Link to="/user/create">
              <PersonAddAltOutlinedIcon className="icon" /> Add New User
            </Link>
          </li>
        ) : null}
        <li>
          <Link to="/savedposts">
            <BookmarkIcon className="icon" /> Saved Posts
          </Link>
        </li>
        <li>
          <Link to="/allusers">
            <Groups2OutlinedIcon className="icon" /> Your Colleagues
          </Link>
        </li>
        <li>
          <Link to="#">
            <CalendarMonthIcon className="icon" /> Events
          </Link>
        </li>
        <li>
          <Link to="#">
            <SmartToyIcon className="icon" /> Trivia and Quizzes
          </Link>
        </li>
        <li>
          <Link to="#">
            <SpaIcon className="icon" /> Wellness and Sport
          </Link>
        </li>
        <li>
          <Link to="#">
            <StorefrontIcon className="icon" /> Marketplace
          </Link>
        </li>
        <li>
          <Link to="#">
            <TipsAndUpdatesOutlinedIcon className="icon" /> Suggestions Box
          </Link>
        </li>
        <li onClick={handleOnClick}>
          <LogoutOutlinedIcon className="icon" /> Logout
        </li>
      </ul>
    </>
  );
};

export default Menu;
