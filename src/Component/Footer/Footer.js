import React from "react";
import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinFilled, // Fallback icon
  InstagramOutlined,
} from "@ant-design/icons";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            We are a leading provider of bus tracking and booking solutions.
            Learn more about our mission and team.
          </p>
          <Link to="/about">Read More</Link>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@example.com</p>
          <p>Phone: (123) 456-7890</p>
          <p>Address: 123 Bus Street, City, Country</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookOutlined />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterOutlined />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinFilled /> {/* Updated icon */}
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramOutlined />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Newsletter Signup</h4>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
          <Link to="/faq">FAQ</Link>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <p>Made By Syed Ali</p>
          <p>
            &copy; {new Date().getFullYear()} Syed Ali. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
