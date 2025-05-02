import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import "./Footer.css"; // Optional: to style it nicely

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4">
      <div className="social-icons mb-2">
        <a href="https://www.linkedin.com/in/million-eshetu-081686291" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
          <FaLinkedin size={24} />
        </a>
        <a href="https://github.com/millionbefikadu" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
          <FaGithub size={24} />
        </a>
        <a href="mailto:eshetubefkadu291@gmail.com" className="text-white mx-2">
          <FaEnvelope size={24} />
        </a>
      </div>
      <p className="mb-0">© 2025 Million Eshetu Portfolio. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
