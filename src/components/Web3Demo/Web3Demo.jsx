import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Web3Context } from '../../contexts/Web3Context';
import BlockchainConnector from './BlockchainConnector';
import './Web3Demo.css';

const Web3Demo = () => {
  const { connected, account, balance, networkName, connectWallet, sendTransaction } = useContext(Web3Context);
  
  const [activeTab, setActiveTab] = useState('wallet');
  const [transactionData, setTransactionData] = useState({
    to: '',
    amount: '',
  });
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [transactionHash, setTransactionHash] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Sample NFTs for display
  const sampleNFTs = [
    {
      id: 1,
      name: "Digital Artwork #1",
      image: "/assets/images/projects/nft1.jpg",
      description: "A unique digital artwork showcasing blockchain technology."
    },
    {
      id: 2,
      name: "Crypto Collectible",
      image: "/assets/images/projects/nft2.jpg",
      description: "Limited edition crypto collectible with special attributes."
    },
    {
      id: 3,
      name: "Metaverse Land",
      image: "/assets/images/projects/nft3.jpg",
      description: "Virtual real estate in the emerging metaverse."
    }
  ];
  
  // Sample transaction history
  const [transactions, setTransactions] = useState([
    {
      hash: "0x5a7d929fcc63854e9355c46c66552927a53376023ecfc4e69d943aaba9210c56",
      from: "0x1a2b3c...",
      to: "0x4d5e6f...",
      value: "0.05 ETH",
      timestamp: "2023-11-01T14:23:18Z",
      status: "confirmed"
    },
    {
      hash: "0x8b7c624f1e9842ad3f7de3db3b81f7b6d408a6af84b64b1842e0d2175feb157f",
      from: "0x4d5e6f...",
      to: "0x1a2b3c...",
      value: "0.2 ETH",
      timestamp: "2023-10-28T09:15:43Z",
      status: "confirmed"
    },
    {
      hash: "0x3e72f8b5c47b4f99a9f4e0c12df23a646b79fff6e3b2d1c2a7b23b7522b9be40",
      from: "0x1a2b3c...",
      to: "0x7g8h9i...",
      value: "0.01 ETH",
      timestamp: "2023-10-25T17:50:12Z",
      status: "confirmed"
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionData({
      ...transactionData,
      [name]: value
    });
  };

  const handleSendTransaction = async (e) => {
    e.preventDefault();
    if (!connected || !transactionData.to || !transactionData.amount) return;
    
    setIsSubmitting(true);
    setTransactionStatus('pending');
    
    try {
      const tx = await sendTransaction(transactionData.to, transactionData.amount);
      
      // Add new transaction to history
      const newTransaction = {
        hash: tx.hash,
        from: account,
        to: transactionData.to,
        value: `${transactionData.amount} ETH`,
        timestamp: new Date().toISOString(),
        status: "pending"
      };
      
      setTransactions([newTransaction, ...transactions]);
      setTransactionHash(tx.hash);
      setTransactionStatus('success');
      
      // Reset form
      setTransactionData({
        to: '',
        amount: ''
      });
    } catch (error) {
      console.error('Transaction error:', error);
      setTransactionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to shorten address for display
  const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="web3-demo">
      <div className="web3-tabs">
        <button 
          className={`tab-btn ${activeTab === 'wallet' ? 'active' : ''}`}
          onClick={() => setActiveTab('wallet')}
        >
          Wallet
        </button>
        <button 
          className={`tab-btn ${activeTab === 'nfts' ? 'active' : ''}`}
          onClick={() => setActiveTab('nfts')}
        >
          NFTs
        </button>
        <button 
          className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
      </div>
      
      <div className="web3-content">
        {activeTab === 'wallet' && (
          <div className="wallet-tab">
            <h3>Blockchain Wallet</h3>
            <p>Connect your Web3 wallet to interact with the Ethereum blockchain</p>
            
            <BlockchainConnector />
            
            {connected && (
              <motion.div 
                className="wallet-details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="wallet-info">
                  <div className="info-item">
                    <span className="info-label">Account</span>
                    <span className="info-value">{shortenAddress(account)}</span>
                  </div>
                  
                  <div className="info-item">
                    <span className="info-label">Balance</span>
                    <span className="info-value">{parseFloat(balance).toFixed(4)} ETH</span>
                  </div>
                  
                  <div className="info-item">
                    <span className="info-label">Network</span>
                    <span className="info-value">{networkName || 'Unknown'}</span>
                  </div>
                </div>
                
                <div className="transaction-form">
                  <h4>Send ETH</h4>
                  <form onSubmit={handleSendTransaction}>
                    <div className="form-group">
                      <label htmlFor="to">Recipient Address</label>
                      <input
                        type="text"
                        id="to"
                        name="to"
                        placeholder="0x..."
                        value={transactionData.to}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="amount">Amount (ETH)</label>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        step="0.001"
                        min="0"
                        placeholder="0.01"
                        value={transactionData.amount}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className="submit-btn"
                      disabled={isSubmitting || !transactionData.to || !transactionData.amount}
                    >
                      {isSubmitting ? 'Sending...' : 'Send ETH'}
                    </button>
                  </form>
                  
                  {transactionStatus === 'success' && (
                    <div className="transaction-success">
                      <p>Transaction sent successfully!</p>
                      <p className="transaction-hash">
                        Hash: {shortenAddress(transactionHash)}
                      </p>
                    </div>
                  )}
                  
                  {transactionStatus === 'error' && (
                    <div className="transaction-error">
                      <p>Transaction failed. Please try again.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            
            <div className="demo-note">
              <p><strong>Note:</strong> This demo connects to actual blockchain networks. If you don't have a Web3 wallet like MetaMask installed, you'll need to install one to use this feature.</p>
            </div>
          </div>
        )}
        
        {activeTab === 'nfts' && (
          <div className="nfts-tab">
            <h3>NFT Gallery</h3>
            <p>View and explore NFT collections</p>
            
            {!connected ? (
              <div className="connect-prompt">
                <p>Connect your wallet to view your NFTs</p>
                <button 
                  className="connect-btn"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
              </div>
            ) : (
              <div className="nft-gallery">
                {sampleNFTs.map((nft) => (
                  <motion.div 
                    key={nft.id}
                    className="nft-card"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="nft-image">
                      <div className="nft-placeholder"></div>
                    </div>
                    <div className="nft-info">
                      <h4>{nft.name}</h4>
                      <p>{nft.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            <div className="demo-note">
              <p><strong>Note:</strong> In a real implementation, this would fetch and display actual NFTs from your connected wallet. For demo purposes, sample NFTs are shown.</p>
            </div>
          </div>
        )}
        
        {activeTab === 'transactions' && (
          <div className="transactions-tab">
            <h3>Transaction History</h3>
            <p>View your Ethereum transaction history</p>
            
            {!connected ? (
              <div className="connect-prompt">
                <p>Connect your wallet to view your transaction history</p>
                <button 
                  className="connect-btn"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
              </div>
            ) : (
              <div className="transactions-list">
                <table>
                  <thead>
                    <tr>
                      <th>Transaction Hash</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Value</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx, index) => (
                      <tr key={index}>
                        <td className="hash-cell">{shortenAddress(tx.hash)}</td>
                        <td>{tx.from}</td>
                        <td>{tx.to}</td>
                        <td>{tx.value}</td>
                        <td>
                          <span className={`status-badge ${tx.status}`}>
                            {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            <div className="demo-note">
              <p><strong>Note:</strong> This is a simulated transaction history. In a production application, this would fetch actual transaction history from the blockchain.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Web3Demo;
