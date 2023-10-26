import "./menu.scss";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
//import FeedIcon from '@mui/icons-material/Feed';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StorefrontIcon from "@mui/icons-material/Storefront";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const Menu = () => {
  const navigate = useNavigate();

  const handleOnClick = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const responseData = await response.json();

      if (response.ok) {
        alert("You successfully logged out.");
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
   
      <ul className="menu">
        <li>
          <Link to="/user/profile/me">
            {" "}
            <AccountCircleOutlinedIcon className="icon" /> My Profile
          </Link>
        </li>
        <li>
          <Link to="/company/profile">
            <ApartmentOutlinedIcon className="icon" /> Company Profile
          </Link>
        </li>
        <li>
          <Link to="/company/profile">
            <NewspaperIcon className="icon" /> News Feed
          </Link>
        </li>
        <li>
          <Link to="/user/create">
            <PersonAddAltOutlinedIcon className="icon" /> Add New User
          </Link>
        </li>
        <li>
          <Link to="/savedposts">
            <BookmarkBorderOutlinedIcon className="icon" /> Saved Posts
          </Link>
        </li>
        <li>
          <Link to="/allusers">
            <Groups2OutlinedIcon className="icon" /> Your Team
          </Link>
        </li>
        <li>
          <Link to="">
            <CalendarMonthIcon className="icon" /> Events
          </Link>
        </li>
        <li>
          <Link to="">
            <StorefrontIcon className="icon" /> Marketplace
          </Link>
        </li>
        <li>
          <Link to="">
            <TipsAndUpdatesOutlinedIcon className="icon" /> Suggestions Box
          </Link>
        </li>
        
        <li onClick={handleOnClick}>
          <LogoutOutlinedIcon className="icon" /> Logout
        </li>
      </ul>
   
  );
};

export default Menu;
