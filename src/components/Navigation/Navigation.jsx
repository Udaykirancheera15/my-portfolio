import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ isMobile }) => {
  return (
    <nav className={`navigation ${isMobile ? 'mobile' : ''}`}>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink to="/ai-demo" className={({ isActive }) => isActive ? 'active' : ''}>
            AI Demo
          </NavLink>
        </li>
        <li>
          <NavLink to="/blockchain-demo" className={({ isActive }) => isActive ? 'active' : ''}>
            Blockchain
          </NavLink>
        </li>
        <li>
          <NavLink to="/cybersecurity-demo" className={({ isActive }) => isActive ? 'active' : ''}>
            Security
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
