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

  /** 
   * Given an amount, 
   * takes amount tokens, (from msg.sender)
   * mints amount cTokens (for contract)
   * mints (and returns) amount euro (to msg.sender)
   */
  function mint(uint256 amount) public {    
    console.log("In Token Mint");
    console.log("amount");
    console.log(amount);

    token.transferFrom(msg.sender, address(this), amount); //Now they send USDC to this contract    
    console.log("Transfered to Euro");

		// USDC is held by Euro contract
    
    // Approve transfer on the ERC20 contract
    token.approve(address(cToken), amount);
    
    // Mint cTokens
    uint mintResult = cToken.mint(amount);
    console.log("Minted", mintResult);

    // USDC is held by compound, Euro contract holds cUSDC
  
    _mint(msg.sender, amount); //
  }

  /**
   * TODO
   */
  function burn(uint amount) public {
    console.log("In Token burn");
    console.log("amount");
    console.log(amount);

    console.log("TODO");
    //Burn cToken, keep interest here

    //Send back amount token

  }
}