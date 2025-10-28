import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { 
  GROOVE_TOKEN_ADDRESS,
  PLAYLIST_DAO_ADDRESS,
  GROOVE_TOKEN_ABI,
  PLAYLIST_DAO_ABI,
  NETWORK_CONFIG
} from '../config';

const useWeb3 = () => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [grooveToken, setGrooveToken] = useState(null);
  const [playlistDAO, setPlaylistDAO] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize providers and contracts
  const initializeEthers = useCallback(async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        
        // Check if we have an account
        const accounts = await provider.listAccounts();
        const signer = accounts.length > 0 ? await provider.getSigner() : null;
        
        if (signer) {
          const grooveToken = new ethers.Contract(
            GROOVE_TOKEN_ADDRESS,
            GROOVE_TOKEN_ABI,
            signer
          );
          
          const playlistDAO = new ethers.Contract(
            PLAYLIST_DAO_ADDRESS,
            PLAYLIST_DAO_ABI,
            signer
          );

          setProvider(provider);
          setGrooveToken(grooveToken);
          setPlaylistDAO(playlistDAO);
          setAccount(await signer.getAddress());
        } else {
          setProvider(provider);
          setAccount(null);
        }
      }
    } catch (err) {
      setError("Failed to initialize providers and contracts");
      console.error(err);
    }
    setLoading(false);
  }, []);

  // Connect wallet
  const connectWallet = useCallback(async () => {
    try {
      if (!window.ethereum) {
        throw new Error("Please install MetaMask to use this dApp");
      }

      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      setAccount(accounts[0]);

      // Switch to Sepolia network
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: NETWORK_CONFIG.chainId }],
        });
      } catch (switchError) {
        // If Sepolia is not added to MetaMask, add it
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [NETWORK_CONFIG],
            });
          } catch (addError) {
            throw new Error("Failed to add Sepolia network to MetaMask");
          }
        } else {
          throw switchError;
        }
      }

      await initializeEthers();
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  }, [initializeEthers]);

  // Initial setup and event handlers
  useEffect(() => {
    // Initial setup
    initializeEthers();

    // Setup event handlers
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          // User disconnected wallet
          setAccount(null);
          setGrooveToken(null);
          setPlaylistDAO(null);
        } else {
          // Account changed, reinitialize
          initializeEthers();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, [initializeEthers]);

  // Contract interaction methods
  const getGrooveBalance = useCallback(async () => {
    if (!grooveToken || !account) return '0';
    try {
      const balance = await grooveToken.balanceOf(account);
      return ethers.formatUnits(balance, 18);
    } catch (err) {
      setError("Failed to fetch GROOVE balance");
      console.error(err);
      return '0';
    }
  }, [grooveToken, account]);

  const createProposal = useCallback(async (title, artist, songLink) => {
    if (!playlistDAO) return;
    try {
      const tx = await playlistDAO.createProposal(title, artist, songLink);
      await tx.wait();
      return tx.hash;
    } catch (err) {
      setError("Failed to create proposal");
      console.error(err);
    }
  }, [playlistDAO]);

  const getAllProposals = useCallback(async () => {
    if (!playlistDAO) return [];
    try {
      return await playlistDAO.getAllProposals();
    } catch (err) {
      setError("Failed to fetch proposals");
      console.error(err);
      return [];
    }
  }, [playlistDAO]);

  const voteOnProposal = useCallback(async (proposalId) => {
    if (!playlistDAO) return;
    try {
      const tx = await playlistDAO.vote(proposalId);
      await tx.wait();
      return tx.hash;
    } catch (err) {
      setError("Failed to vote on proposal");
      console.error(err);
    }
  }, [playlistDAO]);

  const getProposalCount = useCallback(async () => {
    if (!playlistDAO) return 0;
    try {
      const count = await playlistDAO.proposalCount();
      return count.toString();
    } catch (err) {
      setError("Failed to fetch proposal count");
      console.error(err);
      return 0;
    }
  }, [playlistDAO]);

  return {
    account,
    provider,
    grooveToken,
    playlistDAO,
    error,
    loading,
    connectWallet,
    getGrooveBalance,
    createProposal,
    getAllProposals,
    voteOnProposal,
    getProposalCount,
  };
};

export default useWeb3;