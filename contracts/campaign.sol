// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AutomationCompatibleInterface.sol";

error Campaign__UpkeepNotNeeded(
    uint256 currentBalance,
    uint256 numEntrants
    // uint256 lotteryState
);
error Campaign__TransferFailed();

contract Campaign is Ownable, AutomationCompatibleInterface {
    // enum updateState {
    //     OPEN,
    //     CLOSE
    // }

    enum upKeep {
        isTransferTimePassed,
        isUpdateTimePassed
    }

    // bytes32 private immutable CONTRIBUTOR_ROLE = keccak256("CONTRIBUTOR");
    // bytes32 private immutable STAKEHOLDER_ROLE = keccak256("STAKEHOLDER");
    using PriceConverter for uint256;
    uint256 public constant MINIMUM_USD = 50 * 10 ** 18;
    AggregatorV3Interface private s_priceFeed;
    address public immutable i_owner;
    // address[] stakeholderslist;
    address payable[] private contributorslist;
    address payable[] private waitinglist;
    uint256 private updateInterval;
    uint256 private transferInterval;
    // updateState private s_updateState;
    upKeep private s_upKeepState;
    uint256 private s_updateLastTimeStamp;
    uint256 private s_transferLastTimeStamp;
    mapping(address => uint256) public contAddressToAmountFunded;
    mapping(address => uint256) public contAddressToAmountRemaining;
    mapping(address => uint256) public waiterAddressToAmountFunded;
    mapping(address => uint256) public waiterAddressToLastTimeStamp;

    // mapping(address => uint256) public waiterAddressToTransferInterval;

    constructor(address priceFeed, uint256 u_Interval, uint256 t_Interval) {
        s_priceFeed = AggregatorV3Interface(priceFeed);
        i_owner = msg.sender;
        updateInterval = u_Interval;
        transferInterval = t_Interval;
        // s_updateState = updateState.OPEN;
        s_updateLastTimeStamp = block.timestamp;
        // s_transferLastTimeStamp = block.timestamp;
    }

    function checkUpkeep(
        bytes memory /* checkData */
    )
        public
        override
        returns (bool upkeepNeeded, bytes memory /* performData */)
    {
        // bool isOpen = (s_updateState == updateState.OPEN);
        /* This time {timePassed} is for the refund of contributor's funds when campaign owner fails
        to update contributors
        */
        bool timePassed = ((block.timestamp - s_updateLastTimeStamp) >
            updateInterval);

        /* This time {transferTimePassed} is for the refund of contributor's funds when campaign owner fails
        to update contributors
        */
        bool transferTimePassed;
        for (
            uint256 indexOfWaiter = 0;
            indexOfWaiter < waitinglist.length;
            indexOfWaiter++
        ) {
            address waiterAddress = waitinglist[indexOfWaiter];
            if (
                (block.timestamp -
                    waiterAddressToLastTimeStamp[waiterAddress]) >
                transferInterval
            ) {
                transferTimePassed = true;
                break;
            } else {
                transferTimePassed = false;
            }
        }
        // bool transferTimePassed = ((block.timestamp - s_transferLastTimeStamp) >
        //     transferInterval);
        bool hasWaiters = waitinglist.length > 0;

        bool hasEntrants = (contributorslist.length > 0);
        bool hasBalance = address(this).balance > 0;

        if ((timePassed && hasEntrants && hasBalance)) {
            upkeepNeeded = true;
            s_upKeepState = upKeep.isUpdateTimePassed;
        }

        if ((transferTimePassed && hasWaiters && hasBalance)) {
            upkeepNeeded = true;
            s_upKeepState = upKeep.isTransferTimePassed;
        }
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        (bool upkeepNeeded, ) = checkUpkeep("");
        if (!upkeepNeeded) {
            revert Campaign__UpkeepNotNeeded(
                address(this).balance,
                contributorslist.length
                // uint256(s_updateState)
            );
        }

        if (s_upKeepState == upKeep.isUpdateTimePassed) {
            for (
                uint256 indexOfContributor = 0;
                indexOfContributor < contributorslist.length;
                indexOfContributor++
            ) {
                address payable contributorAddr = contributorslist[
                    indexOfContributor
                ];
                (bool success, ) = contributorAddr.call{
                    value: contAddressToAmountRemaining[contributorAddr]
                }("");

                if (!success) {
                    revert Campaign__TransferFailed();
                }

                contAddressToAmountFunded[contributorAddr] = 0;
                contAddressToAmountRemaining[contributorAddr] = 0;
                contributorslist = new address payable[](0);

                s_updateLastTimeStamp = block.timestamp;
            }
        }

        if (s_upKeepState == upKeep.isTransferTimePassed) {
            for (
                uint256 indexOfWaiter = 0;
                indexOfWaiter < waitinglist.length;
                indexOfWaiter++
            ) {
                address payable waiterAddr = waitinglist[indexOfWaiter];
                if (
                    block.timestamp - waiterAddressToLastTimeStamp[waiterAddr] >
                    transferInterval
                ) {
                    (bool success, ) = waiterAddr.call{
                        value: waiterAddressToAmountFunded[waiterAddr]
                    }("");
                    if (!success) {
                        revert Campaign__TransferFailed();
                    }
                    waiterAddressToAmountFunded[waiterAddr] = 0;
                    delete waitinglist[indexOfWaiter];
                }

                // waitinglist = new address payable[](0);

                // s_transferLastTimeStamp = block.timestamp;
            }
        }
    }

    function withdraw() public onlyOwner {
        // update this withdraw amount {value}
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
                contAddressToAmountRemaining[contributorAddr] -=
                    contAddressToAmountRemaining[contributorAddr] /
                    4;
            }
        }
    }

    // function requestFunding(
    //     address investor
    // ) public contributorOnly("allowed For contributor only") {
    //     fundingApproval[investor] = true;
    // }

    // work to be done: Owner should not be able to fund, but why not?
    function requestFunding() public payable returns (bool) {
        require(
            msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
            "You need to spend more ETH!"
        );

        waiterAddressToAmountFunded[msg.sender] += msg.value;
        waiterAddressToLastTimeStamp[msg.sender] += block.timestamp;
        // waiterAddressToAmountRemaining[msg.sender] += msg.value;
        waitinglist.push(payable(msg.sender));

        return true;
    }

    function acceptFunding(address contributor) public returns (bool) {
        require(msg.sender == i_owner, "Only owner can accept.");

        contAddressToAmountFunded[contributor] += waiterAddressToAmountFunded[
            contributor
        ];
        // waiterAddressToAmountRemaining[msg.sender] += msg.value;
        contributorslist.push(payable(contributor));
        waiterAddressToAmountFunded[contributor] = 0;

        for (
            uint256 indexOfWaiter = 0;
            indexOfWaiter < waitinglist.length;
            indexOfWaiter++
        ) {
            address payable waiterAddr = waitinglist[indexOfWaiter];
            if (waiterAddr == contributor) {
                delete waitinglist[indexOfWaiter];
                break;
            }
        }

        return true;
    }

    // function getOwner() public view returns (address) {
    //     return super.owner();
    // }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function setUpdateInterval(uint256 addedInterval) public onlyOwner {
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
