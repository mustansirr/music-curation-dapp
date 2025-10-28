# 🎵 Project Checklist: Democratic Playlist DAO

This checklist outlines every task required to build, deploy, and launch your "Transparent and Democratic Playlist Creation" dApp. The project is broken into six phases.

---

## Phase 1: Backend Environment Setup (Hardhat)

This phase sets up your "backend" folder, which will hold all your smart contract code.

- [x] 1. Create a root project folder (e.g., `music-dao-project`).
- [x] 2. Inside the root, create your `backend` directory: `mkdir backend`.
- [x] 3. Navigate into the new directory: `cd backend`.
- [x] 4. Initialize an `npm` project: `npm init -y`.
- [x] 5. Run the Hardhat installer: `npx hardhat`.
- [x] 6. Select `Create a JavaScript project` (the standard one, not ESM).
- [x] 7. Accept the defaults for project root and `.gitignore`.
- [x] 8. When prompted, select **`y`** to install the sample project's dependencies.
- [x] 9. Install the OpenZeppelin Contracts library: `npm install @openzeppelin/contracts`.

---

## Phase 2: Smart Contract Development

You will now write the two smart contracts that power the dApp. All work is in the `backend/contracts/` folder.

- [x] 1. **Clean up:** Delete the sample `Lock.sol` file from the `contracts/` folder.

- [x] 2. **Create `GrooveToken.sol`:**
    - [x] Create a new file: `backend/contracts/GrooveToken.sol`.
    - [x] Add the `SPDX-License-Identifier` and `pragma solidity` version.
    - [x] Import `ERC20.sol` and `Ownable.sol` from OpenZeppelin.
    - [x] Define the contract: `contract GrooveToken is ERC20, Ownable`.
    - [x] Write the `constructor`:
        - [x] Call the `ERC20` constructor: `ERC20("Groove Token", "GROOVE")`.
        - [x] Call the `Ownable` constructor: `Ownable(msg.sender)`.
        - [x] Mint an initial supply (e.g., 1 million) to your own wallet (the deployer): `_mint(msg.sender, 1000000 * 10**18);`.
    - [x] Write a public `mint` function (for testing):
        - [x] `function mint(address to, uint256 amount) public onlyOwner`.
        - [x] Inside, call `_mint(to, amount);`.

- [x] 3. **Create `PlaylistDAO.sol`:**
    - [x] Create a new file: `backend/contracts/PlaylistDAO.sol`.
    - [x] Add the `SPDX-License-Identifier` and `pragma solidity` version.
    - [x] Import the `IERC20.sol` interface.
    - [x] Define the `contract PlaylistDAO`.
    - [x] Define the `Proposal` struct: `id`, `proposer`, `title`, `artist`, `songLink`, `voteCount`.
    - [x] Define state variables:
        - [x] `IERC20 public grooveToken;`
        - [x] `uint256 public proposalCount;`
    - [x] Define mappings:
        - [x] `mapping(uint256 => Proposal) public proposals;`
        - [x] `mapping(uint256 => mapping(address => bool)) public hasVoted;`
    - [x] Define `ProposalCreated` and `Voted` events.
    - [x] Write the `constructor`:
        - [x] It must accept one argument: `constructor(address _tokenAddress)`.
        - [x] Set the token: `grooveToken = IERC20(_tokenAddress);`.
        - [x] Initialize the proposal counter: `proposalCount = 1;`.
    - [x] Write the `createProposal` function:
        - [x] It must accept `_title`, `_artist`, and `_songLink`.
        - [x] Add a `require` check: `grooveToken.balanceOf(msg.sender) > 0`.
        - [x] Create and save the new proposal struct in the `proposals` mapping.
        - [x] `emit` the `ProposalCreated` event.
        - [x] Increment `proposalCount`.
    - [x] Write the `vote` function:
        - [x] It must accept `_proposalId`.
        - [x] `require` check 1: Proposal must exist (`_proposalId < proposalCount`).
        - [x] `require` check 2: User must hold tokens.
        - [x] `require` check 3: User has not already voted (`!hasVoted[_proposalId][msg.sender]`).
        - [x] Update state: `proposals[_proposalId].voteCount++`.
        - [x] Update state: `hasVoted[_proposalId][msg.sender] = true;`.
        - [x] `emit` the `Voted` event.
    - [x] Write the `getAllProposals` view function:
        - [x] `function getAllProposals() external view returns (Proposal[] memory)`.
        - [x] Create a new `Proposal` array in memory.
        - [x] Loop from `i = 1` up to `proposalCount - 1`.
        - [x] Populate the array with all proposals from the `proposals` mapping.
        - [x] `return` the new array.

- [x] 4. **Compile Contracts:**
    - [x] In your `backend` terminal, run: `npx hardhat compile`.
    - [x] Ensure there are no compilation errors.

---

## Phase 3: Contract Deployment (Sepolia Testnet)

This phase puts your compiled smart contracts onto a public test network.

- [ ] 1. **Get Alchemy API Key:**
    - [ ] Sign up for a free Alchemy account.
    - [ ] Create a new "App" for "Ethereum Sepolia".
    - [ ] Copy the **HTTPS API Key URL**.

- [ ] 2. **Get Test ETH:**
    - [ ] Open your MetaMask wallet and select the "Sepolia" network.
    - [ ] Go to a Sepolia Faucet (e.g., `sepoliafaucet.com`).
    - [ ] Paste your wallet address and get free test ETH.

- [ ] 3. **Configure Hardhat for Deployment:**
    - [ ] Install `dotenv`: `npm install dotenv`.
    - [ ] Create a `.env` file in the `backend` folder.
    - [ ] Add your Alchemy URL and Private Key to `.env`:
        ```
        SEPOLIA_RPC_URL="YOUR_ALCHEMY_HTTPS_URL"
        PRIVATE_KEY="YOUR_METAMASK_PRIVATE_KEY"
        ```
    - [ ] Update `hardhat.config.js`:
        - [ ] `require("dotenv").config();` at the top.
        - [ ] Add the `sepolia` network configuration block, reading from `process.env`.

- [ ] 4. **Write Deploy Script:**
    - [ ] Delete the sample `deploy.js` from the `scripts/` folder.
    - [ ] Create a new `scripts/deploy.js`.
    - [ ] Write the `main` async function.
    - [ ] Inside `main`:
        - [ ] Deploy `GrooveToken`: `const grooveToken = await hre.ethers.deployContract("GrooveToken");`.
        - [ ] Wait for deployment: `await grooveToken.waitForDeployment();`.
        - [ ] Log the address: `console.log("GrooveToken deployed to:", grooveToken.target);`.
        - [ ] Deploy `PlaylistDAO`, passing the token address: `const playlistDAO = await hre.ethers.deployContract("PlaylistDAO", [grooveToken.target]);`.
        - [ ] Wait for deployment: `await playlistDAO.waitForDeployment();`.
        - [ ] Log the address: `console.log("PlaylistDAO deployed to:", playlistDAO.target);`.
    - [ ] Call `main()` with the standard error-handling `.catch()` block.

- [ ] 5. **Deploy to Sepolia:**
    - [ ] Run the script: `npx hardhat run scripts/deploy.js --network sepolia`.
    - [ ] **Action:** Copy the two deployed contract addresses (for `GrooveToken` and `PlaylistDAO`) and save them in a text file.

---

## Phase 4: Frontend Setup (React)

This phase creates the user interface that will interact with your contracts.

- [ ] 1. Navigate to your **root** project directory: `cd ..`.
- [ ] 2. Create the React app: `npx create-react-app frontend`.
- [ ] 3. Navigate into the new folder: `cd frontend`.
- [ ] 4. Install the **Ethers.js** library: `npm install ethers`.
- [ ] 5. **Clean up:** Delete `logo.svg`, `App.test.js`, and `setupTests.js` from `frontend/src/`. Remove their imports from `App.js` and `index.js`.
- [ ] 6. **Clean up:** Delete all the default styling from `App.css` and `index.css`.
- [ ] 7. **Clean up:** Gut the `App.js` file, leaving just a simple functional component.
- [ ] 8. Start the app to make sure it's clean: `npm start`.

---

## Phase 5: Frontend-Backend Integration

This is the core phase where you make the React app talk to the blockchain.

- [ ] 1. **Import ABIs & Addresses:**
    - [ ] Create a new file: `frontend/src/config.js`.
    - [ ] Go to `backend/artifacts/contracts/GrooveToken.sol/GrooveToken.json` and copy the `"abi": [...]` array. Paste it into `config.js` as `export const GROOVE_TOKEN_ABI = [...]`.
    - [ ] Go to `backend/artifacts/contracts/PlaylistDAO.sol/PlaylistDAO.json` and copy the `"abi": [...]` array. Paste it into `config.js` as `export const PLAYLIST_DAO_ABI = [...]`.
    - [ ] In `config.js`, add and export your two deployed contract addresses from Phase 3.

- [ ] 2. **Build `App.js` - Connect Wallet:**
    - [ ] `import { useState, useEffect } from "react";` and `import { ethers } from "ethers";`.
    - [ ] Import your ABIs and addresses from `config.js`.
    - [ ] Create state for the user's account: `const [account, setAccount] = useState(null);`.
    - [ ] Create a `connectWallet` async function.
    - [ ] Inside `connectWallet`, check for `window.ethereum` and call `eth_requestAccounts`.
    - [ ] Set `account` state with the first account from the returned array.
    - [ ] Add a "Connect Wallet" button that is hidden if `account` is not null.

- [ ] 3. **Build `App.js` - Fetch & Display Proposals:**
    - [ ] Create state for the list: `const [proposals, setProposals] = useState([]);`.
    - [ ] Create a `fetchProposals` async function.
    - [ ] Inside `fetchProposals`:
        - [ ] Create an `ethers.BrowserProvider`.
        - [ ] Create a read-only `daoContract` using the provider, DAO ABI, and DAO address.
        - [ ] Call `const data = await daoContract.getAllProposals();`.
        - [ ] Map over the `data` to format it into a clean array of JS objects (structs are returned as arrays).
        - [ ] `setProposals` with the formatted data.
    - [ ] Use `useEffect` to call `fetchProposals()` once when the component mounts.
    - [ ] In your JSX, map over the `proposals` array and render a `<div>` for each, showing the `title`, `artist`, `songLink`, and `voteCount`.

- [ ] 4. **Build `App.js` - Proposal Form:**
    - [ ] Create state for the form inputs: `formTitle`, `formArtist`, `formLink`.
    - [ ] Create an HTML `<form>` with inputs for each.
    - [ ] Create an `handleProposalSubmit` async function.
    - [ ] Inside the submit handler:
        - [ ] Create a `provider` and get a `signer`: `await provider.getSigner()`.
        - [ ] Create a *writable* `daoContract` using the `signer`, DAO ABI, and DAO address.
        - [ ] Call `const tx = await daoContract.createProposal(...)` with the form state.
        - [ ] Wait for the transaction: `await tx.wait();`.
        - [ ] Call `fetchProposals()` to refresh the list.
    - [ ] Hook this function up to the form's `onSubmit` event.

- [ ] 5. **Build `App.js` - Voting:**
    - [ ] Inside the `proposals.map()` from step 3, add a "Vote" button to each proposal.
    - [ ] Create an `handleVote` async function that accepts the `proposalId`.
    - [ ] Inside the `handleVote` function:
        - [ ] Create a `provider`, `signer`, and writable `daoContract`.
        - [ ] Call `const tx = await daoContract.vote(proposalId);`.
        - [ ] Wait for the transaction: `await tx.wait();`.
        - [ ] Call `fetchProposals()` to refresh the list.
    - [ ] Add an `onClick` to the "Vote" button, calling `handleVote(proposal.id)`.

---

## Phase 6: Final Testing & Deployment

- [ ] 1. **Test Token Distribution (Manual):**
    - [ ] Go to Sepolia Etherscan and find your `GrooveToken` contract address.
    - [ ] Go to the "Contract" -> "Write Contract" tab.
    - [ ] Connect your wallet (the one that deployed the contract).
    - [ ] Use the `mint` function to send `$GROOVE` tokens to another test wallet.
- [ ] 2. **Full End-to-End Test:**
    - [ ] Open the app in two browsers (one as the admin, one as the test user).
    - [ ] **Browser 2 (Test User):**
        - [ ] Connect wallet.
        - [ ] Verify you have `$GROOVE` tokens.
        - [ ] Create a new song proposal.
    - [ ] **Browser 1 (Admin):**
        - [ ] See the new proposal appear.
        - [ ] Vote on the proposal.
        - [ ] Verify the vote count increases.
- [ ] 3. **Deploy Frontend:**
    - [ ] Push your entire project (root folder with `backend` and `frontend` inside) to a new GitHub repository.
    - [ ] Sign up for a free Vercel account.
    - [ ] Create a "New Project" and import your GitHub repository.
    - [ ] In "Project Settings," set the **Root Directory** to `frontend`.
    - [ ] Click **Deploy** and share your live dApp URL!