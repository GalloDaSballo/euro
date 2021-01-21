pragma solidity ^0.7.0;

import "hardhat/console.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { IMockCToken } from "./IMockCToken.sol";

contract Euro is ERC20 {
  IMockCToken public cToken;
  ERC20 public token;

  constructor(IMockCToken _cTokenAddress, ERC20 _tokenAddress) ERC20("Euro", "EURO") {
    cToken = _cTokenAddress;
    token = _tokenAddress;
  }

  function mint(address account, uint256 amount) public {
    console.log("Minted ", amount);
    console.log("To ", account);
    
    token.transferFrom(msg.sender, address(this), amount); //Now they send USDC to this contract    
		// USDC is held by Euro contract
    
    // Approve transfer on the ERC20 contract
    token.approve(address(cToken), amount);
    
    // Mint cTokens
    uint mintResult = cToken.mint(amount);
    console.log("Minted", mintResult);

    // USDC is held by compound, Euro contract holds cUSDC
  
    _mint(account, amount); //
  }
}