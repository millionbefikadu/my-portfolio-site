import React from "react";
import { motion } from "framer-motion";
import "./projects.css";
import aiPortal from "../assets/Screenshot 2025-05-02 112155.png";
import aiAssistant from "../assets/Screenshot 2025-05-02 112212.png";

const projects = [
  {
    title: "Community AI Portal",
    description:
      "A full-stack AI-powered platform with login/signup, community posts, and a chatbot assistant using Google Gemini API and LangChain.",
    image: aiPortal,
    github: "https://github.com/millionbefikadu/my-portfolio",
  },
  {
    title: "AI Chat Assistant View",
    description:
      "User can ask the AI about any posts or community discussions. Backend uses Node.js, Express, MongoDB, and GraphQL.",
    image: aiAssistant,
    github: "https://github.com/millionbefikadu/my-portfolio",
  },
];

const Projects = () => {
  return (
    <section className="projects-wrapper">
      <motion.div
        className="projects-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2>My Projects</h2>
        <div className="projects-list">
          {projects.map((proj, index) => (
            <motion.div
              className="project-card"
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={proj.image}
                alt={proj.title}
                className="project-image"
              />
              <h3>{proj.title}</h3>
              <p>{proj.description}</p>
              <a
                href={proj.github}
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
