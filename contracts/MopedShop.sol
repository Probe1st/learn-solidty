// SPDX-License-Identifier: UNLICENSE
pragma solidity 0.8.28;

import "hardhat/console.sol";

contract MopedShop {
    mapping(address => bool) buyers;
    uint256 public price = 2 ether;
    address public owner;
    address public shopAddress;
    bool fullyPaid; // false

    constructor() {
        owner = msg.sender;
        shopAddress = address(this);
    }

    function getBuyer(address _addr) public view returns (bool) {
        require(owner == msg.sender, "You are not an owner!");

        return buyers[_addr];
    }

    function addBuyer(address _addr) public {
        require(owner == msg.sender, "You are not an owner");

        buyers[_addr] = true;
    }

    function getBalance() public view returns (uint) {
        return shopAddress.balance;
    }

    function withDrawAll() public {
        require(owner == msg.sender, "You must be the owner");
        require(getBalance() > 0, "The contract's balance is 0");
        require(fullyPaid, "The contract is not fully paid");

        address payable receiver = payable(msg.sender);

        receiver.transfer(shopAddress.balance);
    }

    receive() external payable {
        require(
            buyers[msg.sender] && msg.value <= price && !fullyPaid,
            "Rejected"
        );

        if (shopAddress.balance == price) {
            fullyPaid = true;
        }
    }
}
