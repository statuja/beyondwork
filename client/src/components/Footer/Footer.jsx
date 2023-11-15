import React, { useContext } from "react";
import "./Footer.scss";
import MyContext from "../../context/MyContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const { isDarkMode } = useContext(MyContext);

  return (
    <div className={`footer ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="left"> Copyright © 2023, Girls Power GmbH</div>
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
