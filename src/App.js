import React, { Component } from 'react';
import { thorify } from 'thorify';
import TaskList from './build/contracts/TaskList.json';

const Web3 = require('web3');
const web3 = thorify(new Web3(), 'http://localhost:8669');
const TaskListContract = new web3.eth.Contract(TaskList.abi)

console.log(TaskListContract);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: ''
    };
  }

  // async componentDidMount() {
  //   await TaskListContract.methods.getTask().call;
  // };

  onFormSubmit = (e) => {
    e.preventDefault();
    
    const task = e.target.elements.task.value;

    if (task) {
      this.setState({ task });
      e.target.elements.task.value = '';
    }
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input type="text" name="task"/>
        <button>Add Task</button> 
      </form>
    );
  }
}

export default App;
