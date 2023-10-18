import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
<<<<<<< HEAD
=======
import icon from "../../images/small_icon_green.png"
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import {faFacebookF} from "@fortawesome/free-brands-svg-icons";
>>>>>>> 0620b54e31d3f8b226aebb85f881dfb746afe6b2

function Navbar() {
  return (
    <div className="navbar">
      <div className="left">
      <Link to="/user/login">
        <img src={icon} alt="small-icon"/>
      </Link>
       

      </div>
      <div className="right">
      <Link to="/about">About us</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
}
export default Navbar;
