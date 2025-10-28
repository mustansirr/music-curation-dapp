// Contract addresses
export const GROOVE_TOKEN_ADDRESS = "0x2c1D0ae11C69Bfe1689266A31fF05F835B9D0250";
export const PLAYLIST_DAO_ADDRESS = "0x1781ccEdD68b3E72990b81668975f66C69cAC31A";

// Contract ABIs
export const PLAYLIST_DAO_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "proposer",
        type: "address"
      },
      {
        indexed: false,
        internalType: "string",
        name: "title",
        type: "string"
      },
      {
        indexed: false,
        internalType: "string",
        name: "artist",
        type: "string"
      },
      {
        indexed: false,
        internalType: "string",
        name: "songLink",
        type: "string"
      }
    ],
    name: "ProposalCreated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "voter",
        type: "address"
      }
    ],
    name: "Voted",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_title",
        type: "string"
      },
      {
        internalType: "string",
        name: "_artist", 
        type: "string"
      },
      {
        internalType: "string",
        name: "_songLink",
        type: "string"
      }
    ],
    name: "createProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "getAllProposals",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "proposer",
            type: "address"
          },
          {
            internalType: "string",
            name: "title",
            type: "string"
          },
          {
            internalType: "string",
            name: "artist",
            type: "string"
          },
          {
            internalType: "string",
            name: "songLink",
            type: "string"
          },
          {
            internalType: "uint256",
            name: "voteCount",
            type: "uint256"
          }
        ],
        internalType: "struct PlaylistDAO.Proposal[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_proposalId",
        type: "uint256"
      }
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "proposalCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

// ERC20 Standard ABI for GrooveToken
export const GROOVE_TOKEN_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

// Network configuration
export const NETWORK_CONFIG = {
  chainId: "0xaa36a7", // Sepolia testnet chain ID in hex
  chainName: "Sepolia",
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: ["https://sepolia.infura.io/v3/"],
  blockExplorerUrls: ["https://sepolia.etherscan.io/"]
};