const Web3 = require('web3');
const url = 'http://localhost:8545'; 
const web3 = new Web3(url);

const contractABI = require('../build/contracts/HelloWorld.json').abi;
const contractAddress = '0x6a1c59e152f4efcc91c77bf33536782a9435104b'; 

const contract = new web3.eth.Contract(contractABI, contractAddress);

const amount = web3.utils.toWei('1', 'ether'); 

web3.eth.getAccounts().then(function(accounts) {
  contract.methods.mapAddressToAmount(amount).send({ from: accounts[0] })
    .on('receipt', function(receipt) {
      console.log(receipt); // Should output the transaction receipt
    })
    .on('error', function(error) {
      console.error(error); // Should output the error message
    })
    .on('AmountMapped', function(event) {
      console.log("Amount mapped: " + event.returnValues.amount + " for address: " + event.returnValues.account);
    });
});

web3.eth.getAccounts().then(function(accounts) {
    contract.methods.getAmountByAddress(accounts[0]).call()
      .then(function(result) {
        console.log("amount: ", result / 10 ** 18, " ETH"); // Should output the amount mapped to accounts[0]
      })
      .catch(function(error) {
        console.error(error); // Should output the error message
      });
  });