// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// import { ethers } from "hardhat";
// import { Contract, ContractFactory } from "ethers";

async function main(): Promise<void> {
  //Deploy mockToken

  //Deploy mockCToken
  //Deploy Euro

  //Allow euro to spend deployer MockToken 
  //Deployer can call Mint

  //Deployer BalanceOf MockToken vs MockCToken vs Euro
  //BalanceOf MockCToken for the Euro Contract
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
