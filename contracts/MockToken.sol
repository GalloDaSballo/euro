pragma solidity ^0.7.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {

  constructor(uint256 initialSupply) public ERC20("MockToken", "MOCK") {
    _mint(msg.sender, initialSupply);
  }

  function mint(address account, uint256 amount) public {
     _mint(account, amount);
  }
}