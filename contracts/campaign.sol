// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AutomationCompatibleInterface.sol";

error Campaign__UpkeepNotNeeded(
    uint256 currentBalance,
    uint256 numEntrants,
    uint256 lotteryState
);
error Campaign__TransferFailed();

contract Campaign is Ownable, AutomationCompatibleInterface {
    enum updateState {
        OPEN,
        CLOSE
    }

    // bytes32 private immutable CONTRIBUTOR_ROLE = keccak256("CONTRIBUTOR");
    // bytes32 private immutable STAKEHOLDER_ROLE = keccak256("STAKEHOLDER");
    using PriceConverter for uint256;
    uint256 public constant MINIMUM_USD = 50 * 10 ** 18;
    AggregatorV3Interface private s_priceFeed;
    address public immutable i_owner;
    // address[] stakeholderslist;
    address payable[] private contributorslist;
    uint256 private updateInterval;
    updateState private s_updateState;
    uint256 private s_lastTimeStamp;
    mapping(address => uint256) public addressToAmountFunded;
    mapping(address => uint256) public addressToAmountRemaining;

    constructor(address priceFeed, uint256 interval) {
        s_priceFeed = AggregatorV3Interface(priceFeed);
        i_owner = msg.sender;
        interval = updateInterval;
        s_updateState = updateState.OPEN;
        s_lastTimeStamp = block.timestamp;
    }

    function checkUpkeep(
        bytes memory /* checkData */
    )
        public
        view
        override
        returns (bool upkeepNeeded, bytes memory /* performData */)
    {
        bool isOpen = (s_updateState == updateState.OPEN);
        bool timePassed = ((block.timestamp - s_lastTimeStamp) >
            updateInterval);
        bool hasEntrants = (contributorslist.length > 0);
        bool hasBalance = address(this).balance > 0;
        upkeepNeeded = (isOpen && timePassed && hasEntrants && hasBalance);
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        (bool upkeepNeeded, ) = checkUpkeep("");
        if (!upkeepNeeded) {
            revert Campaign__UpkeepNotNeeded(
                address(this).balance,
                contributorslist.length,
                uint256(s_updateState)
            );
        }

        for (
            uint256 indexOfContributor = 0;
            indexOfContributor < contributorslist.length;
            indexOfContributor++
        ) {
            address payable contributorAddr = contributorslist[
                indexOfContributor
            ];
            (bool success, ) = contributorAddr.call{
                value: addressToAmountRemaining[contributorAddr]
            }("");

            addressToAmountFunded[contributorAddr] = 0;
            addressToAmountRemaining[contributorAddr] = 0;
            contributorslist = new address payable[](0);

            if (!success) {
                revert Campaign__TransferFailed();
            }
        }
    }

    function withdraw() public onlyOwner {
        (bool callSuccess, ) = payable(i_owner).call{
            value: address(this).balance / 4
        }("");
        if (callSuccess) {
            for (
                uint256 indexOfContributor = 0;
                indexOfContributor < contributorslist.length;
                indexOfContributor++
            ) {
                address payable contributorAddr = contributorslist[
                    indexOfContributor
                ];
                addressToAmountRemaining[contributorAddr] -=
                    addressToAmountRemaining[contributorAddr] /
                    4;
            }
        }
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

        addressToAmountFunded[msg.sender] += msg.value;
        addressToAmountRemaining[msg.sender] += msg.value;
        contributorslist.push(payable(msg.sender));
    }

    function getOwner() public view returns (address) {
        return super.owner();
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function setUpdateInterval(uint256 addedInterval) public {
        updateInterval = updateInterval + addedInterval;
    }

    function getContributors() public view returns (address payable[] memory) {
        // for (uint256 indexOfContributor; indexOfContributor<contributorslist.length; indexOfContributor++){
        //     if(contributorslist[indexOfContributor] == contributor){
        //         return
        //     }

        return contributorslist;
    }
}
