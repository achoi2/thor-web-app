import React, { Component } from 'react';
import { thorify } from 'thorify';
import TaskList from './build/contracts/TaskList.json';

const Web3 = require('web3');
const web3 = thorify(new Web3(), 'http://localhost:8669');
const TaskListContract = new web3.eth.Contract(TaskList.abi)

console.log(TaskListContract);

class App extends Component {
  
  render() {
    return (
      <div></div>
    );
  }
}

export default App;
