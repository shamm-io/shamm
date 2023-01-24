// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

error GovernorContract__NotCampaignOwner();
error GovernorContract__NotCampaignContributor();

contract GovernorContract is
    Governor,
    GovernorSettings,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    GovernorTimelockControl
{
    address public campaignOwner;
    address payable[] contributorList;

    constructor(
        IVotes _token,
        TimelockController _timelock,
        uint256 _quorumPercentage,
        uint256 _votingPeriod,
        uint256 _votingDelay,
        address payable[] memory contributorsList
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
        contributorList = contributorsList;
    }

    function isContributor(address contributor) public view returns (bool) {
        for (
            uint256 indexOfContributor = 0;
            indexOfContributor < contributorList.length;
            indexOfContributor++
        ) {
            if (contributorList[indexOfContributor] == contributor) {
                return true;
            }
            // else {
            //     revert GovernorContract__NotCampaignContributor();
            // }
        }
        return false;
    }

    modifier contributorOnly() {
        if (!isContributor(msg.sender)) {
            revert GovernorContract__NotCampaignContributor();
        }
        _;
    }

    modifier campaignOwnerOnly() {
        if (msg.sender != campaignOwner)
            revert GovernorContract__NotCampaignOwner();
        _;
    }

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

    function castVoteWithReason(
        uint256 proposalId,
        uint8 support,
        string calldata reason
    )
        public
        virtual
        override(Governor, IGovernor)
        contributorOnly
        returns (uint256)
    {
        address voter = _msgSender();
        return _castVote(proposalId, voter, support, reason);
    }

    function _execute(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) {
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

    function getCampOwner() public view returns (address) {
        return campaignOwner;
    }

    function addCont() public {
        contributorList.push(payable(msg.sender));
    }
}
