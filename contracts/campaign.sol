// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Governance_Standard/GovernorContract.sol";

contract Campaign is Ownable {
    mapping(address => bool) public fundingApproval;
    bytes32 private immutable CONTRIBUTOR_ROLE = keccak256("CONTRIBUTOR");
    bytes32 private immutable STAKEHOLDER_ROLE = keccak256("STAKEHOLDER");
    mapping(address => uint256) private contributors;
    mapping(address => uint256) private stakeholders;
    address[] stakeholderslist;
    address[] contributorslist;

    constructor() Ownable() {}

    function isStakeholder(address addr) public view returns (bool) {
        for (uint i = 0; i < stakeholderslist.length; i++) {
            if (stakeholderslist[i] == addr) {
                return true;
            }
        }
        return false;
    }

    function isContributor(address addr) public view returns (bool) {
        for (uint i = 0; i < contributorslist.length; i++) {
            if (contributorslist[i] == addr) {
                return true;
            }
        }
        return false;
    }

    modifier stakeholderOnly(string memory message) {
        require(isStakeholder(msg.sender), message);
        _;
    }

    modifier contributorOnly(string memory message) {
        require(isContributor(msg.sender), message);
        _;
    }

    function requestFunding(
        address investor
    ) public contributorOnly("allowed contributor") {
        fundingApproval[investor] = true;
    }

    function acceptFunding()
        public
        payable
        stakeholderOnly("allowed stakeholder")
    {
        require(fundingApproval[msg.sender]);
    }
}
