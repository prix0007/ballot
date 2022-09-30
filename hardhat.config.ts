import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
// Replace this private key with your Goerli account private key.
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key.
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;

const config: HardhatUserConfig = {
  paths: { tests: "tests" },
  solidity: "0.8.17",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
};

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


export default config;
