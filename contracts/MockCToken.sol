pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockCToken is ERC20 {

  ERC20 public _underlyingToken; //Stored as an address, converted to ERC20 at run time

  // Can pass a address and it will be casted to contract + you get intellisense
  constructor(ERC20 underlyingToken) ERC20("MockCToken", "cMOCK") {
    _underlyingToken = underlyingToken;
  }

  function mint(uint256 amount) public returns (uint256){
      _underlyingToken.transferFrom(msg.sender, address(this), amount); //Now this contract owns amount tokens
     _mint(msg.sender, amount);
     return amount;
  }
}