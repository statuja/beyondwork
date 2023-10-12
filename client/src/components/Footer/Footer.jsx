import React from "react";
import "./Footer.scss";
import fbicon from "../../images/icons/fb-icon.svg";
import inicon from "../../images/icons/in-icon.svg";
import igicon from "../../images/icons/ig-icon.svg";

function Footer() {
  return (
    <div className="footer">
      <div className="left">All rights reserved</div>
      <div className="right">
        <a href="#">
          <img src={fbicon} alt="Facebook" />
        </a>
        <a href="#">
          <img src={inicon} alt="LinkedIn" />
        </a>
        <a href="#">
          <img src={igicon} alt="Instagram" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
