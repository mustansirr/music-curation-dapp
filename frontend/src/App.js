import React, { useState } from 'react';
import WalletButton from './components/WalletButton';
import ProposalForm from './components/ProposalForm';
import ProposalList from './components/ProposalList';
import BalanceDisplay from './components/BalanceDisplay';
import useWeb3 from './hooks/useWeb3';
import './App.css';

function App() {
  const { account, loading } = useWeb3();
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>SoundSage</h1>
        <div className="header-right">
          <BalanceDisplay />
          <WalletButton />
        </div>
      </header>

      <main>
        {loading ? (
          <p>Loading...</p>
        ) : !account ? (
          <p>Please connect your wallet to continue</p>
        ) : (
          <>
            <ProposalList key={refreshKey} />
            <ProposalForm onProposalCreated={() => setRefreshKey(prev => prev + 1)} />
          </>
        )}
      </main>

      <footer>
        <p>Built on Sepolia testnet</p>
      </footer>
    </div>
  );
}

export default App;
