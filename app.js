import { ethers } from 'ethers';
import readline from 'readline';
console.log("Welcome to my world, where you send free Ether to your friend! Install and Spin up your Ganache cli!");
console.log("=========================================================================================================");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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
    const url = "http://localhost:8545";
    const provider = new ethers.providers.JsonRpcProvider(url);
    
    let wallet = new ethers.Wallet(`${privateKey}`)
    let walletSigner = wallet.connect(provider)

    const tx = {
        from: `${yourAddress}`,
        to: `${yourFriendsAddress}`,
        value: ethers.utils.parseEther(`${amount}`)
      }
    
    walletSigner.sendTransaction(tx).then((transactionReceipt) => {
    console.dir(transactionReceipt)
    console.log(`Success! Sent ${amount} Eth to ${yourFriendsAddress} from ${yourAddress}`);
    })
}
