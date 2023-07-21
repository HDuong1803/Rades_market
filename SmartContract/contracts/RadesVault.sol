// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract RadesVault is Ownable,AccessControlEnumerable {
    IERC20 private token;
    uint256 public maxWithdrawAmount=1000;
    bool public withdrawEnable=true;
    bytes32 public constant WITHDRAWER_ROLE = keccak256("WITHDRAWER_ROLE");
    constructor(IERC20 _token) {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        token=_token;
    }

    function setToken(IERC20 _token) public onlyOwner {
        token = _token;
    }
    function setWithdrawEnable(bool _isEnable) public onlyOwner {
        withdrawEnable = _isEnable;
    }
    function setMaxWithdrawAmount(uint256 _maxAmount) public onlyOwner {
        maxWithdrawAmount = _maxAmount;
    }

    function deposit(uint256 _amount) external {
        require(!Address.isContract(msg.sender));
        require(
            token.balanceOf(msg.sender) >= _amount,
            "Insufficient account balance"
        );
        SafeERC20.safeTransferFrom(token, msg.sender, address(this), _amount);
    }

    function withdraw(
        uint256 _amount,
        address _to
    ) external onlyWithdrawer {
        require(!Address.isContract(msg.sender));
        require(withdrawEnable,"Withdraw is not available");
        require(_amount<=maxWithdrawAmount,"Exceed maximum amount");
        token.transfer(_to, _amount);
    }

    function emergencyWithdraw() public onlyOwner {
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    modifier onlyWithdrawer() {
        require(owner() == _msgSender()||hasRole(WITHDRAWER_ROLE,_msgSender()), "Caller is not a withdrawer");
        _;
    }
}
