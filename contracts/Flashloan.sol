pragma solidity ^0.5.15;

import "./aave/FlashLoanReceiverBase.sol";
import "./aave/ILendingPoolAddressesProvider.sol";
import "./aave/ILendingPool.sol";

interface DaiToken{
  function approve(address usr, uint wad) external returns (bool);
}

interface KncToken{
  function approve(address usr, uint wad) external returns (bool);
}

interface KyberExchange {
  function swapEtherToToken(
    ERC20 token,
    uint minRate
  ) external payable returns (uint);

  function swapTokenToEther(
    ERC20 token,
    uint tokenQty,
    uint minRate
  ) external payable returns (uint);
}

interface UniswapExchange{
  // Trade ERC20 to ERC20
  function tokenToTokenSwapInput(
    uint256 tokens_sold,
    uint256 min_tokens_bought,
    uint256 min_eth_bought,
    uint256 deadline,
    address token_addr
  ) external returns (uint256 tokens_bought);

  // Trade ETH to ERC20
  function ethToTokenSwapInput(
    uint256 min_tokens,
    uint256 deadline
  ) external payable returns (uint256  tokens_bought);
}


contract Flashloan is FlashLoanReceiverBase {

    //Events
    event beforeBorrow(address _reserve, uint256 _amount, uint256 _eth, uint256 _dai);
    event borrowMade(address _reserve, uint256 _amount, uint256 _eth, uint256 _dai);
    event daiApproved(string _message);
    event uniswapDone(string _message);
    event borrowReturned(address _reserve, uint256 _amount, uint256 _eth, uint256 _dai);

    function executeOperation(
        address _reserve,
        uint256 _amount,
        uint256 _fee,
        bytes calldata _params
    )
        external
    {
        require(_amount <= getBalanceInternal(address(this), _reserve), "Invalid balance, was the flashLoan successful?");
        emit borrowMade(address(this), _amount, address(this).balance, getBalanceInternal(address(this), address(0x6B175474E89094C44Da98b954EedeAC495271d0F)));

        //
        // do your thing here
        //

        DaiToken daiToken = DaiToken(0x6B175474E89094C44Da98b954EedeAC495271d0F);
        daiToken.approve(address(this),_amount);
        emit daiApproved('DAI was approved');

        KyberExchange kyberExchange = KyberExchange(0x818E6FECD516Ecc3849DAf6845e3EC868087B755);
        ERC20 daiErc20 = ERC20(0x6B175474E89094C44Da98b954EedeAC495271d0F);
        //kyberExchange.swapEtherToToken.value(1000000000000000000)(daiErc20, 1);
        //kyberExchange.swapTokenToEther(daiErc20, 1000000000000000000, 1);


        //making DAI to KNC swap
        uint256 DEADLINE = block.timestamp + 300;
        UniswapExchange uniswapExchange = UniswapExchange(0x2a1530C4C41db0B0b2bB646CB5Eb1A67b7158667);

        //uniswapExchange.tokenToTokenSwapInput(_amount, 1, 1, DEADLINE, address(0xdd974D5C2e2928deA5F71b9825b8b646686BD200));
        //javascript code from swap-dai-for-knc.js:69
        //result = await exchangeContract.methods.tokenToTokenSwapInput(DAI_TO_SWAP, MIN_TOKENS, MIN_ETH, DEADLINE, KNC_ADDRESS).send({from : SETTINGS.from, gasLimit : 4000000})
        //exchangeContract.methods.ethToTokenSwapInput(1, DEADLINE).send(SETTINGS)

        uniswapExchange.ethToTokenSwapInput.value(1000000000000000000)(1, DEADLINE);
        emit uniswapDone('Uniswap is done');


        // Time to transfer the funds back
        uint totalDebt = _amount.add(_fee);
        transferFundsBackToPoolInternal(_reserve, totalDebt);
        emit borrowReturned(address(this), _amount, address(this).balance, getBalanceInternal(address(this), address(0x6B175474E89094C44Da98b954EedeAC495271d0F)));
    }

    function flashloan() public  {
        bytes memory data = "";
        uint amount = 100 ether;
        address asset = address(0x6B175474E89094C44Da98b954EedeAC495271d0F); // mainnet DAI

        ILendingPool lendingPool = ILendingPool(addressesProvider.getLendingPool());
        emit beforeBorrow(address(this), amount, address(this).balance, getBalanceInternal(address(this), asset));
        lendingPool.flashLoan(address(this), asset, amount, data);
    }
}
