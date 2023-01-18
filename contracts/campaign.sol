// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Campaign is Ownable {
    mapping(address => bool) public fundingApproval;

    function requestFunding(address investor) public onlyOwner {
        fundingApproval[investor] = true;
    }

    function acceptFunding() public payable onlyOwner {
        require(fundingApproval[msg.sender]);
    }
}
