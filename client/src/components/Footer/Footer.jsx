import React from "react";
import "./Footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="footer">
      <div className="left">All rights reserved</div>
      <div className="right">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
    </div>
  );
}

export default Footer;
