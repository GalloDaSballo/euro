// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { Contract, ContractFactory, Signer } from "ethers";

async function main(): Promise<void> {

  const [deployer]: Signer[] = await ethers.getSigners();
  const address = await deployer.getAddress()

  //Deploy mockToken
  const mockTokenFactory: ContractFactory = await ethers.getContractFactory("MockToken")
  const deployedMockToken: Contract = await mockTokenFactory.deploy(1000) //Deploy with 1000 initial supply
  await deployedMockToken.deployed()

  console.log("Account balance:", (await deployedMockToken.balanceOf(address)).toString());

  //Deploy mockCToken
  const mockCTokenFactory: ContractFactory = await ethers.getContractFactory("MockCToken")
  const deployedMockCToken: Contract = await mockCTokenFactory.deploy(deployedMockToken.address)
  await deployedMockCToken.deployed()

  //Deploy Euro
  const euroFactory: ContractFactory = await ethers.getContractFactory("Euro")
  const deployedEuro: Contract = await euroFactory.deploy(deployedMockCToken.address, deployedMockToken.address)
  await deployedEuro.deployed()

  //Allow euro to spend deployer MockToken 
  await deployedMockToken.approve(deployedEuro.address, 100)
  console.log("Approved Allowance")

  //Deployer can call Mint
  await deployedEuro.mint(100)
  console.log("Minting 100 tokens")

  //Deployer BalanceOf MockToken vs MockCToken vs Euro
  console.log("Balance of Deployer, for Euro", await deployedEuro.balanceOf(address))
  console.log("Balance of Deployer, for MOCK", await deployedMockToken.balanceOf(address))

  //BalanceOf MockCToken for the Euro Contract
  console.log("Balance of Euro, for MockCToken", await deployedMockCToken.balanceOf(deployedEuro.address))

  
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
