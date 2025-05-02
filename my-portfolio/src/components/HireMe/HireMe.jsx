import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import "./HireMe.css"; // Make sure this path matches your file structure

const HireMe = () => {
  return (
    <div className="hire-container">
      <div className="hire-card">
        <h2>Hire Me</h2>
        <p>
          Interested in working together? Feel free to reach out or download my resume.
        </p>
        <a
          href="/Million_resume_Software (1) 2 (2).docx"
          download
          className="btn btn-primary"
        >
          <FaEnvelope style={{ marginRight: "8px" }} />
          Download Resume
        </a>
        <a
          href="mailto:eshetubefkadu291@gmail.com"
          className="btn btn-outline"
        >
          <FaEnvelope style={{ marginRight: "8px" }} />
          Email Me
        </a>
        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/million-eshetu-081686291"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/millionbefikadu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HireMe;
