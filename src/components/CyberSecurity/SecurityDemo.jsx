import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VulnerabilityScanner from './VulnerabilityScanner';
import './SecurityDemo.css';

const SecurityDemo = () => {
  const [activeTab, setActiveTab] = useState('scanner');
  const [animateTransition, setAnimateTransition] = useState(false);

  const changeTab = (tab) => {
    setAnimateTransition(true);
    setTimeout(() => {
      setActiveTab(tab);
      setAnimateTransition(false);
    }, 300);
  };

  // Sample security tips
  const securityTips = [
    {
      title: "Strong Password Practices",
      description: "Use complex passwords with a mix of uppercase, lowercase, numbers and symbols. Don't reuse passwords across services.",
      icon: "🔐"
    },
    {
      title: "Two-Factor Authentication",
      description: "Enable 2FA whenever possible to add an extra layer of security beyond just passwords.",
      icon: "🔑"
    },
    {
      title: "Regular Software Updates",
      description: "Keep your systems and applications updated to protect against known vulnerabilities.",
      icon: "🔄"
    },
    {
      title: "Phishing Awareness",
      description: "Be cautious of unsolicited emails, especially those asking for credentials or containing suspicious links.",
      icon: "🎣"
    },
    {
      title: "Data Encryption",
      description: "Use encryption for sensitive data both in transit and at rest.",
      icon: "🔒"
    },
    {
      title: "Regular Backups",
      description: "Maintain regular backups of important data using the 3-2-1 strategy.",
      icon: "💾"
    }
  ];

  // Sample network traffic data
  const networkTraffic = [
    { time: "08:15:23", source: "192.168.1.105", destination: "93.184.216.34", protocol: "HTTPS", status: "Allowed", bytes: 1420 },
    { time: "08:15:24", source: "192.168.1.105", destination: "93.184.216.34", protocol: "HTTPS", status: "Allowed", bytes: 1024 },
    { time: "08:16:01", source: "192.168.1.105", destination: "172.217.170.14", protocol: "HTTPS", status: "Allowed", bytes: 2048 },
    { time: "08:16:12", source: "10.0.0.5", destination: "192.168.1.105", protocol: "SSH", status: "Blocked", bytes: 512 },
    { time: "08:16:45", source: "192.168.1.105", destination: "104.244.42.129", protocol: "HTTPS", status: "Allowed", bytes: 1258 },
    { time: "08:17:30", source: "8.8.8.8", destination: "192.168.1.105", protocol: "DNS", status: "Allowed", bytes: 128 },
    { time: "08:18:02", source: "145.224.53.32", destination: "192.168.1.105", protocol: "HTTP", status: "Blocked", bytes: 890 },
    { time: "08:18:15", source: "192.168.1.105", destination: "151.101.65.140", protocol: "HTTPS", status: "Allowed", bytes: 3072 }
  ];

  return (
    <div className="security-demo">
      <div className="security-tabs">
        <button 
          className={`tab-btn ${activeTab === 'scanner' ? 'active' : ''}`}
          onClick={() => changeTab('scanner')}
        >
          Vulnerability Scanner
        </button>
        <button 
          className={`tab-btn ${activeTab === 'traffic' ? 'active' : ''}`}
          onClick={() => changeTab('traffic')}
        >
          Network Monitor
        </button>
        <button 
          className={`tab-btn ${activeTab === 'tips' ? 'active' : ''}`}
          onClick={() => changeTab('tips')}
        >
          Security Tips
        </button>
      </div>
      
      <motion.div 
        className="security-content"
        initial={{ opacity: 1 }}
        animate={{ opacity: animateTransition ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'scanner' && (
          <div className="scanner-tab">
            <h3>Website Vulnerability Scanner</h3>
            <p>Analyze a website for common security vulnerabilities</p>
            <VulnerabilityScanner />
          </div>
        )}
        
        {activeTab === 'traffic' && (
          <div className="traffic-tab">
            <h3>Network Traffic Monitor</h3>
            <p>Real-time visualization of network traffic (simulated)</p>
            
            <div className="traffic-header">
              <div className="traffic-stats">
                <div className="stat">
                  <span className="stat-value">8</span>
                  <span className="stat-label">Requests</span>
                </div>
                <div className="stat">
                  <span className="stat-value">2</span>
                  <span className="stat-label">Blocked</span>
                </div>
                <div className="stat">
                  <span className="stat-value">9.8 KB</span>
                  <span className="stat-label">Total Data</span>
                </div>
              </div>
              
              <div className="traffic-filter">
                <input type="text" placeholder="Filter connections..." />
              </div>
            </div>
            
            <div className="traffic-table">
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Protocol</th>
                    <th>Status</th>
                    <th>Size</th>
                  </tr>
                </thead>
                <tbody>
                  {networkTraffic.map((traffic, index) => (
                    <tr key={index} className={traffic.status === 'Blocked' ? 'blocked' : ''}>
                      <td>{traffic.time}</td>
                      <td>{traffic.source}</td>
                      <td>{traffic.destination}</td>
                      <td>{traffic.protocol}</td>
                      <td>
                        <span className={`status-badge ${traffic.status.toLowerCase()}`}>
                          {traffic.status}
                        </span>
                      </td>
                      <td>{traffic.bytes} B</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="traffic-note">
              <p><strong>Note:</strong> This is a simulated demonstration. In a real application, this would connect to network monitoring tools.</p>
            </div>
          </div>
        )}
        
        {activeTab === 'tips' && (
          <div className="tips-tab">
            <h3>Cybersecurity Best Practices</h3>
            <p>Important security tips for protecting your digital assets</p>
            
            <div className="tips-grid">
              {securityTips.map((tip, index) => (
                <motion.div 
                  className="tip-card"
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <div className="tip-icon">{tip.icon}</div>
                  <h4>{tip.title}</h4>
                  <p>{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SecurityDemo;
