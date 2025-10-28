 import React, { useState, useEffect, useCallback } from 'react';
import useWeb3 from '../hooks/useWeb3';

const ProposalList = () => {
  const { getAllProposals, voteOnProposal, getGrooveBalance, error } = useWeb3();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [grooveBalance, setGrooveBalance] = useState('0');
  const [voting, setVoting] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [fetchedProposals, balance] = await Promise.all([
        getAllProposals(),
        getGrooveBalance()
      ]);
      console.log('Fetched Proposals:', fetchedProposals); // Debug log
      console.log('Fetched Balance:', balance); // Debug log
      if (fetchedProposals) {
        setProposals(Array.isArray(fetchedProposals) ? fetchedProposals : []);
      }
      setGrooveBalance(balance);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  }, [getAllProposals, getGrooveBalance]);

  // Initial fetch and polling
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleVote = async (proposalId) => {
    setVoting(proposalId);
    try {
      await voteOnProposal(proposalId);
      // Refresh data after voting
      await fetchData();
    } catch (err) {
      console.error("Failed to vote:", err);
    } finally {
      setVoting(null);
    }
  };

  if (loading) {
    return <div>Loading proposals...</div>;
  }

  return (
    <div className="proposal-list">
      <h2>Song Proposals</h2>
      <p>Your GROOVE Balance: {grooveBalance} GROOVE</p>
      {error && <p className="error">{error}</p>}
      
      {proposals.length === 0 ? (
        <p>No proposals yet. Be the first to propose a song!</p>
      ) : (
        <div className="proposals">
          {proposals.map((proposal) => (
            <div key={proposal.id.toString()} className="proposal-card">
              <h3>{proposal.title}</h3>
              <p>Artist: {proposal.artist}</p>
              <p>Proposed by: {proposal.proposer.slice(0, 6)}...{proposal.proposer.slice(-4)}</p>
              <p>Votes: {proposal.voteCount.toString()}</p>
              <a 
                href={proposal.songLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="song-link"
              >
                Listen to Song
              </a>
              <button
                onClick={() => handleVote(proposal.id)}
                disabled={voting === proposal.id}
                className="vote-button"
              >
                {voting === proposal.id ? 'Voting...' : 'Vote'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProposalList;