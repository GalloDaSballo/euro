pragma solidity ^0.7.0;

interface IMockCToken {
  function mint(uint256 amount) external returns (uint256); //public === external ? But in interface  you put external
}