const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const daiABI = [{"inputs":[{"internalType":"uint256","name":"chainId_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"internalType":"bytes4","name":"sig","type":"bytes4"},{"indexed":true,"internalType":"address","name":"usr","type":"address"},{"indexed":true,"internalType":"bytes32","name":"arg1","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"arg2","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"deny","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"bool","name":"allowed","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"pull","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"push","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"rely","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"wards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];

const fs = require('fs')
const Flashloan = JSON.parse(fs.readFileSync("../client/src/contracts/Flashloan.json"))


module.exports = async function (callback) {

      //creating Flashloan contract instance
      console.log("Creating instance of Flashloan contract")
      const networkId = await web3.eth.net.getId()
      console.log('connected to: ' + networkId)
      const networkData = Flashloan.networks[networkId]
      //fetching the contract
      const flashloanABI = Flashloan.abi
      const flashloanAddress = networkData.address
      console.log('Flashloan contract address: ' + flashloanAddress)
      const flashloan = new web3.eth.Contract(flashloanABI, flashloanAddress)
      //console.log(flashloan)

      //creating DAI contract instance, we connect it to mainnet DAI address
      console.log("Creating instance of DAI contract")
      const dai = new web3.eth.Contract(daiABI, '0x6B175474E89094C44Da98b954EedeAC495271d0F')

      //transferring DAI from mainet Ethereum account to Flashloan contract
      console.log('Transfering DAI from Ethereum account to Flashloan contract')
      let transferResult = await dai.methods.transfer(flashloanAddress, web3.utils.toWei('100', 'Ether')).send({ from: '0x4E83362442B8d1beC281594cEa3050c8EB01311C' })
      //console.log(transferResult);

      //transfering ETH from mainet Ethereum account to Flashloan contract
      //console.log("Sending ETH from Ethereum account to Flashloan contract")
      //let transferEth = await web3.eth.sendTransaction({
      //    from: '0x4E83362442B8d1beC281594cEa3050c8EB01311C',
      //    to: '0xD7206a08e46a786c654F2c433C9E6411796B92e4',
      //    value: '10000000000000000000'
      //})
      //console.log(transferEth);

      //showing balance of ETH and DAI before calling flashLoan
      balanceDAI = await dai.methods.balanceOf(flashloanAddress).call()
      console.log('Flashloan contract DAI balance: ' + web3.utils.fromWei(balanceDAI, 'Ether'))
      balanceETH = await web3.eth.getBalance(flashloanAddress)
      console.log('Flashloan contract ETH balance: ' + web3.utils.fromWei(balanceETH, 'Ether'))

      // executing flashLoan
      console.log('Executing flashloan ...');
      let flashloanResult = await flashloan.methods.flashloan().send({ from: '0x4E83362442B8d1beC281594cEa3050c8EB01311C', gasLimit: 4000000 })
      console.log(flashloanResult);
      console.log(flashloanResult.events);
      console.log('finished execution of Flashloan');

      //showing balance of ETH and DAI after calling flashLoan
      balanceDAI = await dai.methods.balanceOf(flashloanAddress).call()
      console.log('Flashloan contract DAI balance: ' + web3.utils.fromWei(balanceDAI, 'Ether'))
      balanceETH = await web3.eth.getBalance(flashloanAddress);
      console.log('Flashloan contract ETH balance: ' + web3.utils.fromWei(balanceETH, 'Ether'))

}
