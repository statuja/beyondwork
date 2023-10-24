import React from "react";
import "./menu.scss";

import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

const Menu = () => {
  return (
    <div>
        <ul className='menu'>
            <li>
            <Link to="/user/profile"> <AccountCircleOutlinedIcon className='icon'/> My Profile</Link>
            </li>
            <li>
            <Link to="/company/profile"> <ApartmentOutlinedIcon className='icon'/> Company Profile</Link>
            </li>
            <li>
            <Link to="/user/create"> <PersonAddAltOutlinedIcon className='icon'/> Add New User</Link>
            </li>
            <li>
            <Link to="/savedposts">
            <BookmarkBorderOutlinedIcon className='icon'/> Saved Posts</Link>
            </li>
            <li>
            <Link to="/allusers"> 
            <Groups2OutlinedIcon className='icon'/> Your Team</Link>
            </li>
            <li>
            <Link to=""> 
            <CalendarMonthIcon className='icon'/> Events</Link>
            </li>
            <li>
            <Link to=""> 
            <StorefrontIcon className='icon'/> Marketplace</Link>
            </li>
            <li>
            <Link to=""> 
            <PollOutlinedIcon className='icon'/> Polls, Surveys</Link>
            </li>
            <li>
            <Link to=""> 
            <TipsAndUpdatesOutlinedIcon className='icon'/> Suggestions Box</Link>
            </li>
            <li>
            <DarkModeOutlinedIcon className='icon'/> Dark Mode
            </li>
        </ul>
    </div>
  );
};

export default Menu;
