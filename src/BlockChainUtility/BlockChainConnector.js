import Web3 from 'web3';

var web3;

class BlockChainConnector {
  constructor() {
    web3 = window.web3;
  }

  //Return the current web3 object from the browser
  provider() {
    return web3;
  }

  //Get the number of ether in the user's wallet
  getBalance(acc) {
    return new Promise((resolve, reject) => {
      web3.eth.getBalance(acc, (err, balance) => {
        if (err !== null) {
          reject(err);
        } else {
          //const _balance = web3.utils.fromWei(balance, 'ether');
          resolve(balance);
        }
      });
    });
  }

  getTokenBalance(walletAddress,Token,blockNumber) {
    let contractAddress = '0xCc80C051057B774cD75067Dc48f8987C4Eb97A5e';
    if(Token==='DAI')   {
        contractAddress = '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359';
    }
    let TokenBalanceHistory={};

    const INFURA_URL ="https://mainnet.infura.io/v3/d8c4c4f651ed4d3d9b3dcde50a37f2e8";
    const web3 = new Web3(
      new Web3.providers.HttpProvider(INFURA_URL)
    );
  console.log('walletAddress,Token',walletAddress,Token)
    //create contract interface;
    let minABI = [
      // balanceOf
      {
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        type: 'function'
      },
      // decimals
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        type: 'function'
      }
    ];
    return new Promise((resolve, reject) => {
      //  Token contract
      let contract = new web3.eth.Contract(minABI, contractAddress);
      let count=1;
      
 
        
          //increment blocknumber 
          contract.methods.balanceOf(walletAddress,).call(blockNumber,(error, balance) => {
            if (error !== null) {
              //console.log('Inside getOMXBalance Error');
              reject(error);
            } else {
              //const _balance = web3.utils.fromWei(balance, 'ether');
              //console.log('Inside Resolve ' + balance);
              resolve(balance/(1000000000000000000));
            }
          });
        
    });
  }
 
}

const blockChainConnector = new BlockChainConnector();
export default blockChainConnector;
