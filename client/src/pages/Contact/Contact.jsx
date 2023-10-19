import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    inquiry: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div className="form-container">
      <div className="contact-form">
        <h3 className="TEXT">How to contact Us</h3>
        <p>
          We're here to assist you. Feel free to reach out to us with any
          questions, feedback, or inquiries you may have.
        </p>
        <p>
          If you have any questions about our product, feel free to contact us
          here: <b>beyondwork@gmail.com</b>, or fill in the form on this page.
        </p>
        <p>We are also available on the main social media platforms:</p>
        <div>
          {" "}
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
        <form action="info.beyondwork@gmail.com" method="POST">
          <div className="form-first-section">
            <label>
              <input
                className="name"
                type="text"
                name="name"
                placeholder="First and Last Name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              <input
                className="email"
                type="email"
                name="email"
                placeholder="Your E-mail"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              <input
                className="tel"
                type="tel"
                name="phoneNumber"
                placeholder="Your Phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </label>
          </div>
          <label>
            <textarea
              label="your inquiry"
              name="inquiry"
              placeholder="write your text here"
              rows="10"
              cols="50"
              value={formData.moreDetails}
              onChange={handleChange}
            ></textarea>
          </label>
          <br />

          <button type="submit">Send</button>
        </form>
      </div>
      <p>
        We`re happy to listen and answer to your inquiries and suggestions. Your
        opinion matters!
      </p>
    </div>
  );
}

export default Contact;
