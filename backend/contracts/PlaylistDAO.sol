// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PlaylistDAO {
    // State variables
    IERC20 public grooveToken;
    uint256 public proposalCount;

    // Struct for song proposals
    struct Proposal {
        uint256 id;
        address proposer;
        string title;
        string artist;
        string songLink;
        uint256 voteCount;
    }

    // Mappings
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    // Events
    event ProposalCreated(uint256 indexed id, address indexed proposer, string title, string artist, string songLink);
    event Voted(uint256 indexed proposalId, address indexed voter);

    // Constructor
    constructor(address _tokenAddress) {
        grooveToken = IERC20(_tokenAddress);
        proposalCount = 1;
    }

    // Create a new song proposal
    function createProposal(string memory _title, string memory _artist, string memory _songLink) external {
        require(grooveToken.balanceOf(msg.sender) > 0, "Must hold GROOVE tokens to propose");

        proposals[proposalCount] = Proposal({
            id: proposalCount,
            proposer: msg.sender,
            title: _title,
            artist: _artist,
            songLink: _songLink,
            voteCount: 0
        });

        emit ProposalCreated(proposalCount, msg.sender, _title, _artist, _songLink);
        proposalCount++;
    }

    // Vote on a proposal
    function vote(uint256 _proposalId) external {
        require(_proposalId < proposalCount, "Proposal does not exist");
        require(grooveToken.balanceOf(msg.sender) > 0, "Must hold GROOVE tokens to vote");
        require(!hasVoted[_proposalId][msg.sender], "Already voted on this proposal");

        proposals[_proposalId].voteCount++;
        hasVoted[_proposalId][msg.sender] = true;

        emit Voted(_proposalId, msg.sender);
    }

    // Get all proposals
    function getAllProposals() external view returns (Proposal[] memory) {
        Proposal[] memory allProposals = new Proposal[](proposalCount - 1);
        for (uint256 i = 1; i < proposalCount; i++) {
            allProposals[i - 1] = proposals[i];
        }
        return allProposals;
    }
}