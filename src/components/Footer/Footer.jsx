import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <Link to="/">
              <span className="logo-text">Portfolio</span>
            </Link>
            <p className="tagline">Building the future with Web3, AI, and Cybersecurity</p>
          </div>
          
          <div className="footer-links">
            <div className="link-column">
              <h3>Navigation</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/ai-demo">AI Demo</Link></li>
                <li><Link to="/blockchain-demo">Blockchain</Link></li>
                <li><Link to="/cybersecurity-demo">Security</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            
            <div className="link-column">
              <h3>Technologies</h3>
              <ul>
                <li><a href="#">Blockchain</a></li>
                <li><a href="#">Artificial Intelligence</a></li>
                <li><a href="#">Machine Learning</a></li>
                <li><a href="#">Web Development</a></li>
                <li><a href="#">Cybersecurity</a></li>
              </ul>
            </div>
            
            <div className="link-column">
              <h3>Connect</h3>
              <ul>
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                <li><a href="mailto:your.email@example.com">Email</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} Your Name. All rights reserved.
          </p>
          <div className="footer-social">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="social-icon github">GitHub</i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="social-icon linkedin">LinkedIn</i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="social-icon twitter">Twitter</i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
