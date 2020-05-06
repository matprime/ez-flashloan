pragma solidity ^0.5.15;

import "./aave/FlashLoanReceiverBase.sol";
import "./aave/ILendingPoolAddressesProvider.sol";
import "./aave/ILendingPool.sol";

interface KncToken{
  function approve(address usr, uint wad) external returns (bool);
}

interface KyberExchange {
  function swapEtherToToken(
    ERC20 token,
    uint minRate
  ) external payable returns (uint);

  function swapTokenToEther(ERC20 token, uint srcAmount, uint minConversionRate) external returns(uint);

  function tradeWithHint(
    ERC20 src,
    uint srcAmount,
    ERC20 dest,
    address destAddress,
    uint maxDestAmount,
    uint minConversionRate,
    address walletId,
    bytes calldata hint
    ) external payable returns(uint);

    function getExpectedRate(ERC20 src, ERC20 dest, uint srcQty) external view
    returns (uint expectedRate, uint slippageRate);
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

  // Trade DAI to ETH
  function tokenToEthSwapInput(uint256 tokens_sold, uint256 min_eth, uint256 deadline) external returns (uint256  eth_bought);

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
    event uniswapDone(address _reserve, uint256 _amount, uint256 _eth, uint256 _dai);
    event kyberDone(string _message);
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

        ERC20 daiErc20 = ERC20(0x6B175474E89094C44Da98b954EedeAC495271d0F);
        ERC20 ETH_TOKEN_ADDRESS = ERC20(0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee);
        uint256 DEADLINE = block.timestamp + 300;
        UniswapExchange uniswapExchange = UniswapExchange(0x2a1530C4C41db0B0b2bB646CB5Eb1A67b7158667);
        KyberExchange kyberExchange = KyberExchange(0x818E6FECD516Ecc3849DAf6845e3EC868087B755);

        daiErc20.approve(address(uniswapExchange),0x56BC75E2D63100000);
        emit daiApproved('100 DAI for Uniswap was approved');

        daiErc20.approve(address(kyberExchange), 0x56BC75E2D63100000);
        emit daiApproved('100 DAI for Kyber was approved');


        //KYBER transactions

        //making DAI to ETH swap
        kyberExchange.swapTokenToEther(daiErc20, 0x56BC75E2D63100000, 1);  // 100 DAI
        //emit kyberDone('Kyberswap DAI to ETH done');

        // making ETH to DAI swap
        //kyberExchange.swapEtherToToken.value(1000000000000000000)(daiErc20, 1); // 1 ETH
        //kyberExchange.swapEtherToToken.value(482000000000000000)(daiErc20, 1);  // 0.428 ETH
        //emit kyberDone('Kyberswap ETH to DAI done');


        //UNISWAP TRANSACTIONS

        //making DAI to KNC swap
        //uniswapExchange.tokenToTokenSwapInput(_amount, 1, 1, DEADLINE, address(0xdd974D5C2e2928deA5F71b9825b8b646686BD200));
        //emit uniswapDone('UNISWAP DAI to KNC');

        //making 100 DAI to ETH swap
        uint256 MIN_TOKENS = 1;
        //uniswapExchange.tokenToEthSwapInput(0x56BC75E2D63100000, MIN_TOKENS, DEADLINE);
        //emit uniswapDone(address(this), _amount, address(this).balance, getBalanceInternal(address(this), address(0x6B175474E89094C44Da98b954EedeAC495271d0F)));

        //making ETH to DAI swap
        //uniswapExchange.ethToTokenSwapInput.value(1000000000000000000)(MIN_TOKENS, DEADLINE);  // 1 ETH
        uniswapExchange.ethToTokenSwapInput.value(482280000000000000)(MIN_TOKENS, DEADLINE);  // 0.48228 ETH
        //emit uniswapDone('Uniswap ETH to DAI done');


        // Time to transfer the funds back
        uint totalDebt = _amount.add(_fee);
        transferFundsBackToPoolInternal(_reserve, totalDebt);
        emit borrowReturned(address(this), _amount, address(this).balance, getBalanceInternal(address(this), address(0x6B175474E89094C44Da98b954EedeAC495271d0F)));
    }

    function flashloan() public  {
        bytes memory data = "";
        uint amount = 100 ether; //we gonna borrow 100 DAI
        address asset = address(0x6B175474E89094C44Da98b954EedeAC495271d0F); // mainnet DAI

        ILendingPool lendingPool = ILendingPool(addressesProvider.getLendingPool());
        emit beforeBorrow(address(this), amount, address(this).balance, getBalanceInternal(address(this), asset));
        lendingPool.flashLoan(address(this), asset, amount, data);
    }
}
