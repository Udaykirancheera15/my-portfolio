import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Web3Context } from '../../contexts/Web3Context';

const BlockchainConnector = () => {
  const { connected, account, connectWallet, disconnectWallet } = useContext(Web3Context);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connectWallet();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  // Function to shorten address for display
  const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="blockchain-connector">
      {!connected ? (
        <div className="connect-container">
          <p className="connect-message">Connect your wallet to access blockchain features</p>
          <motion.button 
            className="connect-wallet-btn"
            onClick={handleConnect}
            disabled={isConnecting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isConnecting ? (
              <span className="connecting">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </span>
            ) : (
              "Connect Wallet"
            )}
          </motion.button>
          
          <div className="wallet-types">
            <div className="wallet-option">
              <div className="wallet-icon metamask"></div>
              <span>MetaMask</span>
            </div>
            <div className="wallet-option">
              <div className="wallet-icon walletconnect"></div>
              <span>WalletConnect</span>
            </div>
            <div className="wallet-option">
              <div className="wallet-icon coinbase"></div>
              <span>Coinbase</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="connected-container">
          <div className="connected-status">
            <div className="status-indicator"></div>
            <p className="status-text">Connected to Ethereum</p>
          </div>
          
          <div className="connected-address">
            <p>{shortenAddress(account)}</p>
          </div>
          
          <button 
            className="disconnect-btn"
            onClick={handleDisconnect}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default BlockchainConnector;
