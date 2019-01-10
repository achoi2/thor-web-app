import React, { Component } from 'react';
import { thorify } from 'thorify';
import MetaCoin from './build/contracts/MetaCoin.json';

const Web3 = require('web3');
const web3 = thorify(new Web3(), 'http://localhost:8669');
const MetaCoinContract = new web3.eth.Contract(MetaCoin.abi)

console.log(MetaCoinContract);


class App extends Component {
  render() {
    return (
      <div>
      Hello World!
      </div>
    );
  }
}

export default App;
