import React, { useState } from 'react';
import useWeb3 from '../hooks/useWeb3';

const ProposalForm = ({ onProposalCreated }) => {
  const { createProposal, error } = useWeb3();
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    songLink: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const { title, artist, songLink } = formData;
      const result = await createProposal(title, artist, songLink);
      
      if (result) {
        // Reset form
        setFormData({
          title: '',
          artist: '',
          songLink: ''
        });
        // Notify parent component
        if (onProposalCreated) {
          onProposalCreated();
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="proposal-form">
      <h2>Submit New Song Proposal</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Song Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="artist">Artist:</label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="songLink">Song Link:</label>
          <input
            type="url"
            id="songLink"
            name="songLink"
            value={formData.songLink}
            onChange={handleChange}
            placeholder="Spotify or YouTube link"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={submitting}
          className="submit-button"
        >
          {submitting ? 'Submitting...' : 'Submit Proposal'}
        </button>
      </form>
    </div>
  );
};

export default ProposalForm;