const { legos } = require("@studydefi/money-legos");

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/846b88c1f84b487698da49846a3b3a77"));


module.exports = async function (callback) {
try {

const UNISWAP_FACTORY_ABI = legos.uniswap.factory.abi;
const uniswapFactory = new web3.eth.Contract(UNISWAP_FACTORY_ABI, legos.uniswap.factory.address);

const UNISWAP_EXCHANGE_ABI = legos.uniswap.exchange.abi;
var UNISWAP_EXCHANGE_ADDRESS = await uniswapFactory.methods.getExchange(legos.erc20.dai.address).call();
var uniswapExchange = new web3.eth.Contract(UNISWAP_EXCHANGE_ABI, UNISWAP_EXCHANGE_ADDRESS);

const KyberExchangeABI = [{"constant":false,"inputs":[{"name":"alerter","type":"address"}],"name":"removeAlerter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"enabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pendingAdmin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getOperators","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"destAddress","type":"address"},{"name":"maxDestAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"},{"name":"walletId","type":"address"},{"name":"hint","type":"bytes"}],"name":"tradeWithHint","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"}],"name":"swapTokenToEther","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"},{"name":"sendTo","type":"address"}],"name":"withdrawToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"maxGasPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newAlerter","type":"address"}],"name":"addAlerter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kyberNetworkContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"getUserCapInWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"minConversionRate","type":"uint256"}],"name":"swapTokenToToken","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"transferAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"minConversionRate","type":"uint256"}],"name":"swapEtherToToken","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"transferAdminQuickly","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAlerters","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"},{"name":"dest","type":"address"},{"name":"srcQty","type":"uint256"}],"name":"getExpectedRate","outputs":[{"name":"expectedRate","type":"uint256"},{"name":"slippageRate","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"},{"name":"token","type":"address"}],"name":"getUserCapInTokenWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOperator","type":"address"}],"name":"addOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_kyberNetworkContract","type":"address"}],"name":"setKyberNetworkContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"operator","type":"address"}],"name":"removeOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"field","type":"bytes32"}],"name":"info","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"destAddress","type":"address"},{"name":"maxDestAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"},{"name":"walletId","type":"address"}],"name":"trade","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"},{"name":"sendTo","type":"address"}],"name":"withdrawEther","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"token","type":"address"},{"name":"user","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_admin","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"trader","type":"address"},{"indexed":false,"name":"src","type":"address"},{"indexed":false,"name":"dest","type":"address"},{"indexed":false,"name":"actualSrcAmount","type":"uint256"},{"indexed":false,"name":"actualDestAmount","type":"uint256"}],"name":"ExecuteTrade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newNetworkContract","type":"address"},{"indexed":false,"name":"oldNetworkContract","type":"address"}],"name":"KyberNetworkSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"sendTo","type":"address"}],"name":"TokenWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"sendTo","type":"address"}],"name":"EtherWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"pendingAdmin","type":"address"}],"name":"TransferAdminPending","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAdmin","type":"address"},{"indexed":false,"name":"previousAdmin","type":"address"}],"name":"AdminClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAlerter","type":"address"},{"indexed":false,"name":"isAdd","type":"bool"}],"name":"AlerterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newOperator","type":"address"},{"indexed":false,"name":"isAdd","type":"bool"}],"name":"OperatorAdded","type":"event"}]
const KYBER_EXCHANGE_ADDRESS = '0x818E6FECD516Ecc3849DAf6845e3EC868087B755';
const kyberExchange = new web3.eth.Contract(KyberExchangeABI, KYBER_EXCHANGE_ADDRESS);



// Transaction Settings
const SETTINGS = {
    gasLimit: 6000000, // Override gas settings: https://github.com/ethers-io/ethers.js/issues/469
    gasPrice: web3.utils.toWei('50', 'Gwei'),
    from: '0x4E83362442B8d1beC281594cEa3050c8EB01311C', // Use your account here
    value: web3.utils.toWei('1', 'Ether')
}

const ETH = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

var FIRST_SWAP_VALUE = 500;


        function logOpportunity(token, expectedIndex, slippageIndex ) {
          if (expectedIndex > 1 ) {
            console.log(new Date().toISOString() + ' OPPORTUNITY Kyber ETH - ' + token + ' - ETH Uniswap ' + expectedIndex  + ' ' + slippageIndex);
          }
        }

        console.log(new Date().toISOString());

        //Uniswap exchange should have minimal slippage for swaps under 100.000 USD -> cca 500 ETH
        //because of that we make first trade on Kyber also with this value
        kyberResult = await kyberExchange.methods.getExpectedRate(ETH, legos.erc20.dai.address, FIRST_SWAP_VALUE).call();
        console.log('Kyber swap for ' + FIRST_SWAP_VALUE + ' ETH');
        expectedRate = web3.utils.fromWei(kyberResult.expectedRate);
        slippageRate = web3.utils.fromWei(kyberResult.slippageRate);
        console.log('Expected 1 ETH to DAI = ' + expectedRate);
        console.log('DAI Expected = ' + (FIRST_SWAP_VALUE*expectedRate));
        console.log('Slippage 1 ETH to DAI = ' + slippageRate);
        console.log('DAI Slippage = ' + (FIRST_SWAP_VALUE*slippageRate));

        EXPECTED_SWAP_VALUE = web3.utils.toHex(expectedRate*10**18);
        uniswapResult = await uniswapExchange.methods.getTokenToEthInputPrice(EXPECTED_SWAP_VALUE).call();
        expectedIndex = web3.utils.fromWei(uniswapResult);
        console.log('Uniwaps DAI -> ETH expected = ' + expectedIndex);

        SLIPPAGE_SWAP_VALUE = web3.utils.toHex(slippageRate*10**18);
        uniswapResult = await uniswapExchange.methods.getTokenToEthInputPrice(SLIPPAGE_SWAP_VALUE).call();
        slippageIndex = web3.utils.fromWei(uniswapResult);
        console.log('                   slippage = ' + slippageIndex);

        logOpportunity('DAI',expectedIndex,slippageIndex);


        console.log('--------------------------------------');
        console.log(new Date().toISOString());
        FIRST_SWAP_VALUE = 500;

        console.log('Kyber swap for ' + FIRST_SWAP_VALUE + ' ETH');
        kyberResult = await kyberExchange.methods.getExpectedRate(ETH, legos.erc20.sai.address, FIRST_SWAP_VALUE).call()
        expectedRate = web3.utils.fromWei(kyberResult.expectedRate)
        slippageRate = web3.utils.fromWei(kyberResult.slippageRate)
        console.log('Expected 1 ETH to SAI = ' + expectedRate)
        console.log('SAI Expected = ' + (FIRST_SWAP_VALUE*expectedRate))
        console.log('Slippage 1 ETH to SAI = ' + slippageRate)
        console.log('SAI Slippage = ' + (FIRST_SWAP_VALUE*slippageRate))

        UNISWAP_EXCHANGE_ADDRESS = await uniswapFactory.methods.getExchange(legos.erc20.sai.address).call();
        var uniswapExchange = new web3.eth.Contract(UNISWAP_EXCHANGE_ABI, UNISWAP_EXCHANGE_ADDRESS);

        EXPECTED_SWAP_VALUE = web3.utils.toHex(Math.trunc(expectedRate*10**18));
        uniswapResult = await uniswapExchange.methods.getTokenToEthInputPrice(EXPECTED_SWAP_VALUE).call();
        expectedIndex = web3.utils.fromWei(uniswapResult);
        console.log('Uniwaps SAI -> ETH expected = ' + expectedIndex);

        SLIPPAGE_SWAP_VALUE = web3.utils.toHex(Math.trunc(slippageRate*10**18));
        uniswapResult = await uniswapExchange.methods.getTokenToEthInputPrice(SLIPPAGE_SWAP_VALUE).call();
        slippageIndex = web3.utils.fromWei(uniswapResult);
        console.log('                   slippage = ' + slippageIndex);

        logOpportunity('SAI',expectedIndex,slippageIndex);


        console.log('--------------------------------------');
        console.log(new Date().toISOString());
        FIRST_SWAP_VALUE = 500;

        console.log('Kyber swap for ' + FIRST_SWAP_VALUE + ' ETH');
        kyberResult = await kyberExchange.methods.getExpectedRate(ETH, legos.erc20.weth.address, FIRST_SWAP_VALUE).call()
        expectedRate = web3.utils.fromWei(kyberResult.expectedRate)
        slippageRate = web3.utils.fromWei(kyberResult.slippageRate)
        console.log('Expected 1 ETH to WETH = ' + expectedRate)
        console.log('WETH Expected = ' + (FIRST_SWAP_VALUE*expectedRate))
        console.log('Slippage 1 ETH to WETH = ' + slippageRate)
        console.log('WETH Slippage = ' + (FIRST_SWAP_VALUE*slippageRate))

        UNISWAP_EXCHANGE_ADDRESS = await uniswapFactory.methods.getExchange(legos.erc20.weth.address).call();
        var uniswapExchange = new web3.eth.Contract(UNISWAP_EXCHANGE_ABI, UNISWAP_EXCHANGE_ADDRESS);

        EXPECTED_SWAP_VALUE = web3.utils.toHex(Math.trunc(expectedRate*10**18));
        uniswapResult = await uniswapExchange.methods.getTokenToEthInputPrice(EXPECTED_SWAP_VALUE).call();
        expectedIndex = web3.utils.fromWei(uniswapResult);
        console.log('Uniwaps WETH -> ETH expected = ' + expectedIndex);

        SLIPPAGE_SWAP_VALUE = web3.utils.toHex(Math.trunc(slippageRate*10**18));
        uniswapResult = await uniswapExchange.methods.getTokenToEthInputPrice(SLIPPAGE_SWAP_VALUE).call();
        slippageIndex = web3.utils.fromWei(uniswapResult);
        console.log('                    slippage = ' + slippageIndex);

        logOpportunity('WETH',expectedIndex,slippageIndex);


        console.log('--------------------------------------');
        console.log(new Date().toISOString());
        FIRST_SWAP_VALUE = 10;    //using kyber interface it was showing they can't do 100 ETH in moment

        console.log('Kyber swap for ' + FIRST_SWAP_VALUE + ' ETH');
        kyberResult = await kyberExchange.methods.getExpectedRate(ETH, legos.erc20.zrx.address, FIRST_SWAP_VALUE).call()
        expectedRate = web3.utils.fromWei(kyberResult.expectedRate)
        slippageRate = web3.utils.fromWei(kyberResult.slippageRate)
        console.log('Expected 1 ETH to ZRK = ' + expectedRate)
        console.log('ZRK Expected = ' + (FIRST_SWAP_VALUE*expectedRate))
        console.log('Slippage 1 ETH to ZRK = ' + slippageRate)
        console.log('ZRK Slippage = ' + (FIRST_SWAP_VALUE*slippageRate))

        UNISWAP_EXCHANGE_ADDRESS = await uniswapFactory.methods.getExchange(legos.erc20.zrx.address).call();
        var uniswapExchange = new web3.eth.Contract(UNISWAP_EXCHANGE_ABI, UNISWAP_EXCHANGE_ADDRESS);

        EXPECTED_SWAP_VALUE = web3.utils.toHex(expectedRate*10**18);
        uniswapResult = await uniswapExchange.methods.getTokenToEthInputPrice(EXPECTED_SWAP_VALUE).call();
        expectedIndex = web3.utils.fromWei(uniswapResult);
        console.log('Uniwaps ZRK -> ETH expected = ' + expectedIndex);

        SLIPPAGE_SWAP_VALUE = web3.utils.toHex(slippageRate*10**18);
        uniswapResult = await uniswapExchange.methods.getTokenToEthInputPrice(SLIPPAGE_SWAP_VALUE).call();
        slippageIndex = web3.utils.fromWei(uniswapResult);
        console.log('                   slippage = ' + slippageIndex);

        logOpportunity('ZRX',expectedIndex,slippageIndex);


        console.log('--------------------------------------');
        console.log(new Date().toISOString());
        FIRST_SWAP_VALUE = 500;

        console.log('Kyber swap for ' + FIRST_SWAP_VALUE + ' ETH');
        kyberResult = await kyberExchange.methods.getExpectedRate(ETH, legos.erc20.bat.address, FIRST_SWAP_VALUE).call()
        expectedRate = web3.utils.fromWei(kyberResult.expectedRate)
        slippageRate = web3.utils.fromWei(kyberResult.slippageRate)
        console.log('Expected 1 ETH to BAT = ' + expectedRate)
        console.log('BAT Expected = ' + (FIRST_SWAP_VALUE*expectedRate))
        console.log('Slippage 1 ETH to BAT = ' + slippageRate)
        console.log('BAT Slippage = ' + (FIRST_SWAP_VALUE*slippageRate))

        UNISWAP_EXCHANGE_ADDRESS = await uniswapFactory.methods.getExchange(legos.erc20.bat.address).call();
        var uniswapExchange = new web3.eth.Contract(UNISWAP_EXCHANGE_ABI, UNISWAP_EXCHANGE_ADDRESS);

        EXPECTED_SWAP_VALUE = web3.utils.toHex(expectedRate*10**17);
        uniswapResult = await uniswapExchange.methods.getTokenToEthInputPrice(EXPECTED_SWAP_VALUE).call();
        expectedIndex = web3.utils.fromWei(uniswapResult);
        console.log('Uniwaps BAT -> ETH expected = ' + expectedIndex);

        SLIPPAGE_SWAP_VALUE = web3.utils.toHex(slippageRate*10**17);
        uniswapResult = await uniswapExchange.methods.getTokenToEthInputPrice(SLIPPAGE_SWAP_VALUE).call();
        slippageIndex = web3.utils.fromWei(uniswapResult);
        console.log('                   slippage = ' + slippageIndex);

        logOpportunity('BAT',expectedIndex*10,slippageIndex*10);


        console.log('--------------------------------------');
        console.log(new Date().toISOString());
        FIRST_SWAP_VALUE = 500;

        console.log('Kyber swap for ' + FIRST_SWAP_VALUE + ' ETH');
        kyberResult = await kyberExchange.methods.getExpectedRate(ETH, legos.erc20.usdc.address, FIRST_SWAP_VALUE).call();
        expectedRate = web3.utils.fromWei(kyberResult.expectedRate);
        slippageRate = web3.utils.fromWei(kyberResult.slippageRate);
        console.log('Expected 1 ETH to USDC = ' + expectedRate);
        console.log('USDC Expected = ' + (FIRST_SWAP_VALUE*expectedRate));
        console.log('Slippage 1 ETH to USDC = ' + slippageRate);
        console.log('USDC Slippage = ' + (FIRST_SWAP_VALUE*slippageRate));

        UNISWAP_EXCHANGE_ADDRESS = await uniswapFactory.methods.getExchange(legos.erc20.usdc.address).call();
        var uniswapExchange = new web3.eth.Contract(UNISWAP_EXCHANGE_ABI, UNISWAP_EXCHANGE_ADDRESS);

        EXPECTED_SWAP_VALUE = web3.utils.toHex(Math.trunc(expectedRate*10**6));
        uniswapResult = await uniswapExchange.methods.getTokenToEthInputPrice(EXPECTED_SWAP_VALUE).call();
        expectedIndex = web3.utils.fromWei(uniswapResult);
        console.log('Uniwaps USDC -> ETH expected = ' + expectedIndex);

        if (slippageRate > 0) {
          SLIPPAGE_SWAP_VALUE = web3.utils.toHex(Math.trunc(slippageRate*10**6));
          uniswapResult = await uniswapExchange.methods.getTokenToEthInputPrice(SLIPPAGE_SWAP_VALUE).call();
          slippageIndex = web3.utils.fromWei(uniswapResult);
        } else {
          slippageIndex = 0;
        }
        console.log('                    slippage = ' + slippageIndex);

        logOpportunity('USDC',expectedIndex,slippageIndex);


        console.log('--------------------------------------');
        console.log(new Date().toISOString());
        FIRST_SWAP_VALUE = 500;

        console.log('Kyber swap for ' + FIRST_SWAP_VALUE + ' ETH');
        kyberResult = await kyberExchange.methods.getExpectedRate(ETH, legos.erc20.rep.address, FIRST_SWAP_VALUE).call();
        expectedRate = web3.utils.fromWei(kyberResult.expectedRate);
        slippageRate = web3.utils.fromWei(kyberResult.slippageRate);
        console.log('Expected 1 ETH to REP = ' + expectedRate);
        console.log('REP Expected = ' + (FIRST_SWAP_VALUE*expectedRate));
        console.log('Slippage 1 ETH to REP = ' + slippageRate);
        console.log('REP Slippage = ' + (FIRST_SWAP_VALUE*slippageRate));

        UNISWAP_EXCHANGE_ADDRESS = await uniswapFactory.methods.getExchange(legos.erc20.rep.address).call();
        var uniswapExchange = new web3.eth.Contract(UNISWAP_EXCHANGE_ABI, UNISWAP_EXCHANGE_ADDRESS);

        EXPECTED_SWAP_VALUE = web3.utils.toHex(expectedRate*10**18);
        uniswapResult = await uniswapExchange.methods.getTokenToEthInputPrice(EXPECTED_SWAP_VALUE).call();
        expectedIndex = web3.utils.fromWei(uniswapResult);
        console.log('Uniwaps REP -> ETH expected = ' + expectedIndex);

        SLIPPAGE_SWAP_VALUE = web3.utils.toHex(Math.trunc(slippageRate*10**18));
        uniswapResult = await uniswapExchange.methods.getTokenToEthInputPrice(SLIPPAGE_SWAP_VALUE).call();
        slippageIndex = web3.utils.fromWei(uniswapResult);
        console.log('                   slippage = ' + slippageIndex);

        logOpportunity('REP',expectedIndex,slippageIndex);


        console.log('--------------------------------------');
        console.log(new Date().toISOString());
        FIRST_SWAP_VALUE = 500;

        console.log('Kyber swap for ' + FIRST_SWAP_VALUE + ' ETH');
        kyberResult = await kyberExchange.methods.getExpectedRate(ETH, legos.erc20.wbtc.address, FIRST_SWAP_VALUE).call();
        expectedRate = web3.utils.fromWei(kyberResult.expectedRate);
        slippageRate = web3.utils.fromWei(kyberResult.slippageRate);
        console.log('Expected 1 ETH to WBTC = ' + expectedRate);
        console.log('WBTC Expected = ' + (FIRST_SWAP_VALUE*expectedRate));
        console.log('Slippage 1 ETH to WBTC = ' + slippageRate);
        console.log('WBTC Slippage = ' + (FIRST_SWAP_VALUE*slippageRate));

        UNISWAP_EXCHANGE_ADDRESS = await uniswapFactory.methods.getExchange(legos.erc20.wbtc.address).call();
        var uniswapExchange = new web3.eth.Contract(UNISWAP_EXCHANGE_ABI, UNISWAP_EXCHANGE_ADDRESS);

        EXPECTED_SWAP_VALUE = web3.utils.toHex(Math.trunc(expectedRate*10**8));
        uniswapResult = await uniswapExchange.methods.getTokenToEthInputPrice(EXPECTED_SWAP_VALUE).call();
        expectedIndex = web3.utils.fromWei(uniswapResult);
        console.log('Uniwaps WBTC -> ETH expected = ' + expectedIndex);

        if (slippageRate > 0) {
          SLIPPAGE_SWAP_VALUE = web3.utils.toHex(Math.trunc(slippageRate*10**8));
          uniswapResult = await uniswapExchange.methods.getTokenToEthInputPrice(SLIPPAGE_SWAP_VALUE).call();
          slippageIndex = web3.utils.fromWei(uniswapResult);
        } else {
          slippageIndex = 0;
        }
        console.log('                    slippage = ' + slippageIndex);


        logOpportunity('WBTC',expectedIndex,slippageIndex);


    }
    catch(error) {
      console.log(error)
    }

    callback()

}
