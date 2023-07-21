// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract RadesICO is Ownable {
    using SafeERC20 for IERC20;
    address payable public _wallet;
    uint256 public MATIC_rate;
    uint256 public USDT_rate;
    IERC20 public token;
    IERC20 public usdtToken;

    event BuyTokenByMATIC(address buyer, uint256 amount);
    event BuyTokenByUSDT(address buyer, uint256 amount);
    event SetUSDTToken(IERC20 tokenAddress);
    event SetMATICRate(uint256 newRate);
    event SetUSDTRate(uint256 newRate);

    constructor(
        uint256 matic_rate,
        uint256 usdt_rate,
        address payable wallet,
        IERC20 icotoken
    ) {
        MATIC_rate = matic_rate;
        USDT_rate = usdt_rate;
        _wallet = wallet;
        token = icotoken;
    }

    function setUSDTToken(IERC20 token_address) public onlyOwner {
        usdtToken = token_address;
        emit SetUSDTToken(token_address);
    }

    function setMATICRate(uint256 new_rate) public onlyOwner {
        MATIC_rate = new_rate;
        emit SetMATICRate(new_rate);
    }

    function setUSDTRate(uint256 new_rate) public onlyOwner {
        USDT_rate = new_rate;
        emit SetUSDTRate(new_rate);
    }

    function buyTokenByMATIC() external payable {
        uint256 maticAmount = msg.value;
        uint256 amount = getTokenAmountMATIC(maticAmount);
        require(amount > 0, "Amount is zero");
        require(
            token.balanceOf(address(this)) >= amount,
            "Insufficient account balance"
        );
        require(
            msg.sender.balance >= maticAmount,
            "Insufficient account balance"
        );
        payable(_wallet).transfer(maticAmount);
        SafeERC20.safeTransfer(token, msg.sender, amount);
        emit BuyTokenByMATIC(msg.sender, amount);
    }

    function buyTokenByUSDT(uint256 USDTAmount) external {
        uint256 amount = getTokenAmountUSDT(USDTAmount);
        require(amount > 0, "Amount is zero");
        require(
            token.balanceOf(address(this)) >= amount,
            "Insufficient account balance"
        );
        SafeERC20.safeTransferFrom(usdtToken, msg.sender, _wallet, USDTAmount);
        SafeERC20.safeTransfer(token, msg.sender, amount);
        emit BuyTokenByUSDT(msg.sender, amount);
    }

    function getTokenAmountMATIC(uint256 MATICAmount)
        public
        view
        returns (uint256)
    {
        return MATICAmount * MATIC_rate;
    }

    function getTokenAmountUSDT(uint256 USDTAmount)
        public
        view
        returns (uint256)
    {
        return USDTAmount * USDT_rate;
    }
    
    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function withdrawErc20() public onlyOwner {
        usdtToken.transfer(msg.sender, usdtToken.balanceOf(address(this)));
    }
}