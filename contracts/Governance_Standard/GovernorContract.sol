// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

error Fundme__NotCampaignOwner();

contract GovernorContract is
    Governor,
    GovernorSettings,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    GovernorTimelockControl
{
    // address[] stakeholderslist;
    // address[] contributorslist;
    address public immutable campaignOwner;

    constructor(
        IVotes _token,
        TimelockController _timelock,
        uint256 _quorumPercentage,
        uint256 _votingPeriod,
        uint256 _votingDelay
    )
        Governor("GovernorContract")
        GovernorSettings(
            _votingDelay /* 1 block */,
            _votingPeriod /*50400 = ~1 week */,
            0
        )
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(_quorumPercentage)
        GovernorTimelockControl(_timelock)
    {
        campaignOwner = msg.sender;
        // stakeholderslist.push(owner);
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

    modifier campaignOwnerOnly() {
        if (msg.sender != campaignOwner) revert Fundme__NotCampaignOwner();
        _;
    }

    // function addStakeholder(address newStakeholder) public ownerOnly {
    //     stakeholderslist.push(newStakeholder);
    // }

    // function addContributor(
    //     address newContributor
    // ) public stakeholderOnly("allowed For stakeholder only") {
    //     contributorslist.push(newContributor);
    // }

    // The following functions are overrides required by Solidity.

    function votingDelay()
        public
        view
        override(IGovernor, GovernorSettings)
        returns (uint256)
    {
        return super.votingDelay();
    }

    function votingPeriod()
        public
        view
        override(IGovernor, GovernorSettings)
        returns (uint256)
    {
        return super.votingPeriod();
    }

    function quorum(
        uint256 blockNumber
    )
        public
        view
        override(IGovernor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    function state(
        uint256 proposalId
    )
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (ProposalState)
    {
        return super.state(proposalId);
    }

    function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description
    ) public override(Governor, IGovernor) campaignOwnerOnly returns (uint256) {
        return super.propose(targets, values, calldatas, description);
    }

    function proposalThreshold()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }

    function _execute(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    )
        internal
        override(Governor, GovernorTimelockControl)
    // stakeholderOnly("allowed For stakeholder only")
    {
        super._execute(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _cancel(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint256) {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function _executor()
        internal
        view
        override(Governor, GovernorTimelockControl)
        returns (address)
    {
        return super._executor();
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(Governor, GovernorTimelockControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}