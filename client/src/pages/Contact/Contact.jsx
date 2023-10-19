import React from "react";
import logo from "../../images/Logo_green.png";
import "./Contact.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Contact() {
  const emailAddress = "info.beyondwork@gmail.com";

  return (
    <div className="contact">
      <div className="left">
        <img src={logo} alt="BeyondWork Logo" />
        <div className="textContainer">
          <h1>Welcome to BeyondWork!</h1>
          <p>The digital haven where work and play converge.</p>
        </div>
      </div>
      <div className="right">
        <h2>Contact us</h2>
        <p>
          If you have any questions about our product, or need support please
          feel free to contact us!
        </p>

        <div className="wrapper">
          <a
            href="mailto:info.beyondwork@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="card">
              <FontAwesomeIcon icon={faEnvelope} size="lg" />

              <p>Write</p>
            </div>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="card">
              <FontAwesomeIcon icon={faInstagram} size="lg" />

              <p>Follow</p>
            </div>
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="card">
              <FontAwesomeIcon icon={faLinkedinIn} size="lg" />

              <p>Connect</p>
            </div>{" "}
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <div class="card">
              <FontAwesomeIcon icon={faFacebookF} size="lg" />

              <p>Befriend</p>
            </div>
          </a>
        </div>
        <p className="last">
          We’re happy to listen and answer to your inquiries and suggestions.
          Your opinion matters!
        </p>
      </div>
    </div>
  );
}

export default Contact;
