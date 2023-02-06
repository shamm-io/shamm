// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract GovernanceToken is ERC20Votes {
    uint256 public s_maxSupply = 1000000000000000000000000;
    address public owner;

    constructor()
        ERC20("GovernanceToken", "GT")
        ERC20Permit("GovernanceToken")
    {
        _mint(msg.sender, s_maxSupply);
        owner = msg.sender;
    }

    // The functions below are overrides required by Solidity.

    function _transfer(uint256 amount) public {
        require(msg.sender == owner, "Only owner can transfer");
        super._transfer(owner, msg.sender, amount);
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override(ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(
        address account,
        uint256 amount
    ) internal override(ERC20Votes) {
        super._burn(account, amount);
    }

    // work to be done: transfer tokens to the funder upon funding
    // function inscreaseMaxSupply(uint256 amount) public {
    //     require(msg.sender == owner, "Only Owner can increase max supply");
    //     s_maxSupply += amount;
    // }

    function getOwner() public view returns (address) {
        return owner;
    }
}
