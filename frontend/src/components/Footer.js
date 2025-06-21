import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import "../Footer.css";

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="footer-container">

        <div className="footer-section footer-days">
          <h2 className="footer-heading">
            <span className="footer-heading-icon">| </span>Working Days
          </h2>
          <div className="footer-days-list">
            <p className="footer-days-item">
              Mon - Fri <span className="footer-days-hours">8:00 AM - 11:00 PM</span>
            </p>
            <p className="footer-days-item">
              Sat - Sun <span className="footer-days-hours">8:00 AM - 05:00 PM</span>
            </p>
          </div>
        </div>


        <div className="footer-section footer-contact">
          <h2 className="footer-heading">
            <span className="footer-heading-icon">| </span>Contact Us
          </h2>
          <p className="footer-contact-details">
            MUCYO EMMANUEL, AUCA, Gishushu <br />
            <span>Info@parkmate.com</span> <br />
            <span>Support@parkmate.com</span>
          </p>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF size={25} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={25} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn size={25} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}