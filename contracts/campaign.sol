// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

contract Campaign is Ownable {
    // bytes32 private immutable CONTRIBUTOR_ROLE = keccak256("CONTRIBUTOR");
    // bytes32 private immutable STAKEHOLDER_ROLE = keccak256("STAKEHOLDER");
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

    function withdraw() public {
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
