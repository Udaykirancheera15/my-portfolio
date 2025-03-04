import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Hi, I'm <span className="highlight">Your Name</span>
            </motion.h1>
            
            <motion.div
              className="typewriter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h2>I'm a
                <span className="typed-text"> Blockchain Developer</span>
              </h2>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Specializing in Web3, AI/ML, and Cybersecurity solutions. Building the future with innovative technologies.
            </motion.p>
            
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <a href="#featured-projects" className="btn">View My Work</a>
              <a href="#contact" className="btn btn-outline">Contact Me</a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="hero-background">
              <div className="tech-symbols">
                {/* Blockchain Symbol */}
                <div className="symbol blockchain">⛓️</div>
                {/* AI Symbol */}
                <div className="symbol ai">🧠</div>
                {/* Security Symbol */}
                <div className="symbol security">🔒</div>
                {/* Code Symbol */}
                <div className="symbol code">&#60;/&#62;</div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div>
            <span className="scroll-text">Scroll Down</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
