import React from 'react';
import logo from './logo.svg';
import './App.css';
import blockChainConnector from './BlockChainUtility/BlockChainConnector';

function App() {
 
  //NEC and DAI
  
  
  var blockNumber = 8637066;
  var count=1;
  var TokenNEC = [];
  for(count=1;count<=30;count++)  {
    blockNumber=(blockNumber-12343)
  blockChainConnector
            .getTokenBalance('0xADEEb9d09B8Bcee10943198FB6F6a4229bAB3675','NEC',blockNumber)
            .then(r => {
              console.log(r);
              TokenNEC.push(r);
            });

  }
  console.log('TokenNEC',TokenNEC)


  count=1;
  var TokenDAI = [];
  blockNumber = 8637066
  for(count=1;count<=30;count++)  {
    blockNumber=(blockNumber-12343)
  blockChainConnector
            .getTokenBalance('0xADEEb9d09B8Bcee10943198FB6F6a4229bAB3675','DAI',blockNumber)
            .then(r => {
              console.log(r);
              TokenDAI.push(r);
            });

  }
  console.log('TokenDAI',TokenDAI)



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
