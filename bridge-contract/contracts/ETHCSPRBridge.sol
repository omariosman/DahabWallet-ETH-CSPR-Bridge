pragma solidity ^0.5.16;

contract HelloWorld {
    mapping(address => uint256) public balances;

    event AmountMapped(address indexed account, uint256 amount);

    function hi() public pure returns (string memory) {
        return "Hello World";
    }

    function mapAddressToAmount(uint256 amount) public {
        balances[msg.sender] = amount;
        emit AmountMapped(msg.sender, amount);
    }

    function getAmountByAddress(address account) public view returns (uint256) {
        return balances[account];
    }
}
