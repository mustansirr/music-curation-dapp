import React from 'react';
import useWeb3 from '../hooks/useWeb3';

const WalletButton = () => {
  const { account, connectWallet, error } = useWeb3();

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <button 
        onClick={connectWallet}
        className="wallet-button"
      >
        {account ? 
          `${account.slice(0, 6)}...${account.slice(-4)}` : 
          'Connect Wallet'}
      </button>
    </div>
  );
};

export default WalletButton;