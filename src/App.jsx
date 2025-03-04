import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import AIDemo from './pages/AIDemo';
import BlockchainDemo from './pages/BlockchainDemo';
import CyberSecurityDemo from './pages/CyberSecurityDemo';
import Contact from './pages/Contact';
import MuscatAI from './components/MuscatAI/MuscatAI';
import './App.css';

function App() {
  const location = useLocation();
  const [showMuscat, setShowMuscat] = useState(false);

  useEffect(() => {
    // Wait for initial page load before showing Muscat
    const timer = setTimeout(() => {
      setShowMuscat(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/ai-demo" element={<AIDemo />} />
          <Route path="/blockchain-demo" element={<BlockchainDemo />} />
          <Route path="/cybersecurity-demo" element={<CyberSecurityDemo />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      
      {showMuscat && <MuscatAI />}
      
      <Footer />
    </div>
  );
}

export default App;
