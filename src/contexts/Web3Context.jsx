import React, { createContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

export const Web3Context = createContext();

const providerOptions = {
  // You can add specific wallet providers here
};

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [connected, setConnected] = useState(false);
  const [web3Modal, setWeb3Modal] = useState(null);
  const [networkName, setNetworkName] = useState("");
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    const modal = new Web3Modal({
      cacheProvider: true,
      providerOptions,
      theme: {
        background: "#1e293b",
        main: "#ffffff",
        secondary: "#858c96",
        border: "#3f4659",
        hover: "#4f46e5"
      }
    });
    
    setWeb3Modal(modal);
    
    if (modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      const instance = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(instance);
      const network = await provider.getNetwork();
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);

      setProvider(provider);
      setSigner(signer);
      setAccount(address);
      setChainId(network.chainId);
      setConnected(true);
      setNetworkName(network.name);
      setBalance(ethers.formatEther(balance));

      // Subscribe to accounts change
      instance.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
          updateBalance(accounts[0], provider);
        }
      });

      // Subscribe to chainId change
      instance.on("chainChanged", async () => {
        window.location.reload();
      });

    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  }, [web3Modal]);

  const updateBalance = async (address, provider) => {
    try {
      const balance = await provider.getBalance(address);
      setBalance(ethers.formatEther(balance));
    } catch (error) {
      console.error("Error updating balance:", error);
    }
  };

  const disconnectWallet = async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
    }
    setProvider(null);
    setSigner(null);
    setAccount(null);
    setChainId(null);
    setConnected(false);
    setNetworkName("");
    setBalance("0");
  };

  const switchNetwork = async (networkId) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${networkId.toString(16)}` }]
      });
    } catch (err) {
      console.error(err);
    }
  };

  const sendTransaction = async (to, value) => {
    try {
      if (!signer) throw new Error("Wallet not connected");
      
      const tx = await signer.sendTransaction({
        to,
        value: ethers.parseEther(value)
      });
      
      return tx;
    } catch (error) {
      console.error("Transaction error:", error);
      throw error;
    }
  };

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        account,
        chainId,
        connected,
        networkName,
        balance,
        connectWallet,
        disconnectWallet,
        switchNetwork,
        sendTransaction
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Context;
