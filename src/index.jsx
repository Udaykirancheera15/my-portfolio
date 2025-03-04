import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Web3Provider } from './contexts/Web3Context';
import { AIProvider } from './contexts/AIContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Web3Provider>
        <AIProvider>
          <App />
        </AIProvider>
      </Web3Provider>
    </BrowserRouter>
  </React.StrictMode>
);
