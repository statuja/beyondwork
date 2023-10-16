import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import logo from "../../images/Logo_green.png";

function Navbar() {
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/about">About us</Link>
      </div>
      <div className="center">
        <Link to="/about">
          <img src={logo} alt="BeyondWork Logo" />
        </Link>
      </div>
      <div className="right">
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
}
export default Navbar;
