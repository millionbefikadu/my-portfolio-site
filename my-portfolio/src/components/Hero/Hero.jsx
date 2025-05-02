import React from "react";
import { motion } from "framer-motion";
import "./hero.css"; // Hero styles

const Hero = () => {
  return (
    <header className="hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.img
          src="/my-photo.jpeg"
          alt="Million's Profile"
          loading="lazy"
          className="hero-image"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <motion.h1
          className="display-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          Welcome to My Portfolio
        </motion.h1>
        <motion.p
          className="lead"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.4 }}
        >
          Building professional projects with  React.js, Node.js, Express, GraphQL, Apollo Client, MongoDB, Google Gemini API, MongoDB, and Bootstrap.
        </motion.p>
      </motion.div>
    </header>
  );
};

export default Hero;
