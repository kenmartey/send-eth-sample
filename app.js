import { ethers } from 'ethers';
import readline from 'readline';
console.log("Welcome to my world, where you send free Ether to your friend! Install and Spin up your Ganache cli!");
console.log("=========================================================================================================");

// Prepare to accept input from user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// Prompt user to enter input values
rl.question('What\'s your private key?: ', function (privateKey) {
  rl.question('What\'s your Address? (Address should correspond to your private key): ', function (yourAddress) {
    rl.question('What\'s your friends Address?: ', function (yourFriendsAddress) {
      rl.question('Amount of Ether, should be less than 100: ', function (amount) {

    createTransactionEthersJs(privateKey, yourAddress, yourFriendsAddress, amount)
    rl.close();
    });
  });
  });
});

const createTransactionEthersJs= (privateKey, yourAddress, yourFriendsAddress, amount) =>  {
    // Get provider url from ganache after spinning up the ganache cli 
    const url = "http://localhost:8545";
    const provider = new ethers.providers.JsonRpcProvider(url);
    // Connect to waller private key obtained from running ganache
    let wallet = new ethers.Wallet(`${privateKey}`)
    let walletSigner = wallet.connect(provider)
    // Transaction body with parameters
    const tx = {
        from: `${yourAddress}`,
        to: `${yourFriendsAddress}`,
        value: ethers.utils.parseEther(`${amount}`)
      }
    // Call the sendTransaction function with the transaction body object and return the response
    walletSigner.sendTransaction(tx).then((transactionReceipt) => {
    console.dir(transactionReceipt)
    console.log(`Success! Sent ${amount} Eth to ${yourFriendsAddress} from ${yourAddress}`);
    })
}
