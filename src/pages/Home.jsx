import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Skills from '../components/Skills/Skills';
import Projects from '../components/Projects/Projects';
import Experience from '../components/Experience/Experience';
import Contact from '../components/Contact/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      
      <motion.section 
        id="about"
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="section-title">
            <h2>About Me</h2>
          </div>
          <About />
        </div>
      </motion.section>
      
      <motion.section 
        id="skills"
        className="section bg-light"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="section-title">
            <h2>My Skills</h2>
          </div>
          <Skills />
        </div>
      </motion.section>
      
      <motion.section 
        id="featured-projects"
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="section-title">
            <h2>Featured Projects</h2>
          </div>
          <Projects limit={3} />
          
          <div className="text-center mt-5">
            <Link to="/projects" className="btn">
              View All Projects
            </Link>
          </div>
        </div>
      </motion.section>
      
      <motion.section 
        id="experience"
        className="section bg-light"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="section-title">
            <h2>Experience</h2>
          </div>
          <Experience />
        </div>
      </motion.section>
      
      <motion.section 
        id="demo-sections"
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="section-title">
            <h2>Interactive Demos</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <motion.div 
              className="demo-card"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <h3>AI Assistant Demo</h3>
              <p>Experience Muscat, my custom AI assistant with speech recognition and synthesis capabilities.</p>
              <Link to="/ai-demo" className="btn">Try AI Demo</Link>
            </motion.div>
            
            <motion.div 
              className="demo-card"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <h3>Blockchain Demo</h3>
              <p>Interact with the Ethereum blockchain, connect your wallet, and see Web3 in action.</p>
              <Link to="/blockchain-demo" className="btn">Try Blockchain Demo</Link>
            </motion.div>
            
            <motion.div 
              className="demo-card"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <h3>CyberSecurity Tools</h3>
              <p>Explore interactive cybersecurity demonstrations and vulnerability scanners.</p>
              <Link to="/cybersecurity-demo" className="btn">Try Security Demo</Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      <motion.section 
        id="contact"
        className="section bg-light"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="section-title">
            <h2>Contact Me</h2>
          </div>
          <Contact />
        </div>
      </motion.section>
    </>
  );
};

export default Home;
