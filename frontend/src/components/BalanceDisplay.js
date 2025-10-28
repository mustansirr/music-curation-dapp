import React, { useState, useEffect } from 'react';
import useWeb3 from '../hooks/useWeb3';

const BalanceDisplay = () => {
  const { getGrooveBalance, account } = useWeb3();
  const [balance, setBalance] = useState('0');

  useEffect(() => {
    const fetchBalance = async () => {
      if (account) {
        const bal = await getGrooveBalance();
        setBalance(bal);
      }
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, [getGrooveBalance, account]);

  if (!account) return null;

  return (
    <div className="balance-display">
      <svg className="balance-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M15 8.5C14.315 7.81501 13.1087 7.33855 12 7.30872M9 8.5C9.685 7.81501 10.8913 7.33855 12 7.30872M12 7.30872V6M12 18V16.6913C13.1087 16.6615 14.315 16.185 15 15.5M9 15.5C9.685 16.185 10.8913 16.6615 12 16.6913" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <span className="balance-amount">{balance}</span>
      <span className="balance-currency">GROOVE</span>
    </div>
  );
};

export default BalanceDisplay;