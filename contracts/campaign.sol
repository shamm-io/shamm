// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

contract Campaign is Ownable {
    // mapping(address => bool) public fundingApproval;
    // bytes32 private immutable CONTRIBUTOR_ROLE = keccak256("CONTRIBUTOR");
    // bytes32 private immutable STAKEHOLDER_ROLE = keccak256("STAKEHOLDER");
    // mapping(address => uint256) private contributors;
    // mapping(address => uint256) private stakeholders;
    using PriceConverter for uint256;
    uint256 public constant MINIMUM_USD = 50 * 10 ** 18;
    AggregatorV3Interface private s_priceFeed;
    address public immutable i_owner;
    // address[] stakeholderslist;
    address[] contributorslist;

    constructor(address priceFeed) {
        s_priceFeed = AggregatorV3Interface(priceFeed);
        i_owner = msg.sender;
    }

    // function isStakeholder(address addr) public view returns (bool) {
    //     for (uint i = 0; i < stakeholderslist.length; i++) {
    //         if (stakeholderslist[i] == addr) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    // function isContributor(address addr) public view returns (bool) {
    //     for (uint i = 0; i < contributorslist.length; i++) {
    //         if (contributorslist[i] == addr) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    // modifier stakeholderOnly(string memory message) {
    //     require(isStakeholder(msg.sender), message);
    //     _;
    // }

    // modifier contributorOnly(string memory message) {
    //     require(isContributor(msg.sender), message);
    //     _;
    // }

    function withdraw() public {
        // for (
        //     uint256 funderIndex = 0;
        //     funderIndex < funders.length;
        //     funderIndex++
        // ) {
        //     address funder = funders[funderIndex];
        //     addressToAmountFunded[funder] = 0;
        // }
        // funders = new address[](0);

        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance / 4
        }("");
        require(callSuccess, "Call failed");
    }

    // function requestFunding(
    //     address investor
    // ) public contributorOnly("allowed For contributor only") {
    //     fundingApproval[investor] = true;
    // }

    function acceptFunding() public payable {
        require(
            msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
            "You need to spend more ETH!"
        );

        contributorslist.push(msg.sender);
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
