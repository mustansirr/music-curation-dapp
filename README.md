# Project: A Blockchain Application for Transparent and Democratic Playlist Creation
*(Project Title: TuneDAO / GrooveChain)*

This is a miniproject that builds a simple Decentralized Autonomous Organization (DAO) for a music club. Members of the DAO use a custom governance token (`$GROOVE`) to democratically propose and vote on songs. The result is a community-curated, on-chain playlist where all decisions are transparent and no single person has control.

---

## 🛠️ Tech Stack

**Blockchain (Backend):**
* **Solidity:** Smart contract language
* **Hardhat:** Development, testing, and deployment environment
* **OpenZeppelin Contracts:** For secure, standard ERC20 and Ownable contracts
* **Sepolia Testnet:** The public test network for deployment
* **Alchemy (or Infura):** RPC node provider to connect to the network

**Frontend (Client):**
* **React.js:** Frontend library for the user interface
* **Ethers.js:** For all wallet and smart contract interactions
* **MetaMask:** Browser wallet
* **Vercel / Netlify:** (Optional) Free frontend hosting

---

## 🚀 Getting Started

This guide will walk you through setting up both the smart contracts and the frontend client.

### Prerequisites

Before you begin, make sure you have the following installed:
1.  **Node.js & npm:** [Download and install here](https://nodejs.org/)
2.  **MetaMask:** [Install the browser extension](https://metamask.io/)
3.  **A Text Editor:** [VS Code](https://code.visualstudio.com/) is recommended

You will also need a free account from a node provider:
4.  **Alchemy Account:** [Sign up for free](https://www.alchemy.com/)
5.  **Test ETH:** Get some from a [Sepolia Faucet](https://sepoliafaucet.com/) and send it to your MetaMask wallet.

---

## 🏁 Step-by-Step Installation

This project is divided into two main parts:
* `/backend`: The Hardhat project containing our Solidity smart contracts.
* `/frontend`: The React.js dApp that users interact with.

### Part 1: Backend (Smart Contract) Setup

This section covers deploying your contracts to the Sepolia testnet.

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    This will install Hardhat and all required libraries.
    ```bash
    npm install
    ```

3.  **Create your environment file:**
    Create a new file named `.env` in the `/backend` folder. This file is ignored by Git and holds your secret keys.
    
    Copy the contents of `.env.example` into it, or create it from scratch:
    ```env
    # Your Sepolia RPC URL from Alchemy
    SEPOLIA_RPC_URL="[https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY](https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY)"
    
    # Your MetaMask wallet's Private Key (NEVER share this)
    # How to get it: MetaMask -> Account Details -> Export Private Key
    PRIVATE_KEY="YOUR_WALLET_PRIVATE_KEY"
    ```

4.  **Compile the contracts:**
    This checks for any errors in your Solidity code and builds the necessary files for deployment.
    ```bash
    npx hardhat compile
    ```

5.  **Deploy the contracts:**
    This script (from `scripts/deploy.js`) will deploy `GrooveToken.sol` and then `PlaylistDAO.sol` to the Sepolia network using your wallet and test ETH.
    ```bash
    npx hardhat run scripts/deploy.js --network sepolia
    ```

6.  **COPY THE DEPLOYED ADDRESSES!**
    After running the deploy script, your terminal will output the new contract addresses. **You will need these for the frontend.**
    
    It will look something like this:
    ```
    GrooveToken deployed to: 0x123456789...
    PlaylistDAO deployed to: 0xABCDEFGH...
    ```

### Part 2: Frontend (React Client) Setup

This section covers connecting your React app to your newly deployed contracts.

1.  **Navigate to the frontend directory:**
    (From the root folder)
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Connect the contract addresses:**
    Inside the `/frontend/src/` folder, find the configuration file (e.g., `constants.js`, `config.js`, or directly in `App.js`). Update it with the addresses you just copied from **Part 1, Step 6**.

    *Example (if in `App.js`):*
    ```javascript
    const playlistDAOAddress = "0x...YOUR_DAO_ADDRESS_FROM_TERMINAL...";
    const grooveTokenAddress = "0x...YOUR_TOKEN_ADDRESS_FROM_TERMINAL...";
    ```

4.  **Run the app locally:**
    ```bash
    npm start
    ```
    This will open the dApp in your browser, usually at `http://localhost:3000`.

5.  **You're all set!**
    Connect your MetaMask wallet (make sure it's on the Sepolia network) and you can start using the application.

---

## 🎶 How to Use the dApp

1.  **Get Tokens:** As the admin (the wallet that deployed the `GrooveToken` contract), you must first mint `$GROOVE` tokens to other users. You can do this by calling the `mint()` function on the token contract. (You may need to build a simple admin-only page for this or use the write-contract features on Etherscan).

2.  **Connect Wallet:** Open the app and click the "Connect Wallet" button to connect your MetaMask.

3.  **Propose a Song:** If you hold `$GROOVE` tokens, you can fill out the "Propose a Song" form (Title, Artist, Link) and submit it. This will create a new proposal and require a small gas fee.

4.  **Vote on Songs:** View the list of active proposals. Click the "Vote" button on any song you like. This will cast your vote and also require a gas fee. (Note: You can only vote once per proposal).

5.  **View the Playlist:** The "Official Playlist" section will automatically show the songs that have been approved or are sorted by the highest number of votes.