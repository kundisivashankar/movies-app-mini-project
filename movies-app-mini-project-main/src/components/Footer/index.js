import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

import "./index.css";

const Footer = () => (
  <div className="footer-container">
    <div className="icon-group">
      <FaGoogle className="social-media-icon" />
      <FaTwitter className="social-media-icon" />
      <FaInstagram className="social-media-icon" />
      <FaYoutube className="social-media-icon" />
    </div>
    <p className="contact-us-text">Contact Us</p>
  </div>
);

export default Footer;
