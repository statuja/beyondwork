import React from "react";
import "./Contact.scss";
import logo from "../../images/Logo_green.png";
import people from "../../images/Young_people.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Contact() {
  return (
    <div className="contact">
      <div className="contact-left">
        <div className="logo">
        <img src={logo} alt="BeyondWork Logo" />
        </div>
        <div className="textContainer">
          <h2>Welcome to BeyondWork!</h2>
          <p>The digital haven where work and play converge.</p>
        </div>
      </div>
      <div className="contact-right">
        <div className="right-top">
          <h2>Contact us</h2>
          <div className="msg">
            <p>
              If you have any questions about our product, or need support
              please feel free to contact us!
              <p>
                We’re happy to listen and answer to your inquiries and
                suggestions. Your opinion matters!
              </p>
            </p>
          </div>
          <div className="contact-wrapper">
            <a
              href="mailto:info.beyondwork@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="card">
                <p>Write</p>
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
              </div>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="card">
                <p>Follow</p>
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </div>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="card">
                <p>Connect</p>
                <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
              </div>
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="card">
                <p>Befriend</p>
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
              </div>
            </a>
          </div>
        </div>
        <img className="peopleImg" src={people} alt="People connected" />
      </div>
    </div>
  );
}

export default Contact;
