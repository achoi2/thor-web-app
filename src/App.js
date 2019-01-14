import React, { Component } from 'react';
import { thorify } from 'thorify';
import TaskList from './build/contracts/TaskList.json';
import './App.css';

const Web3 = require('web3');
const web3 = thorify(new Web3(), 'http://localhost:8669');
const account = web3.eth.accounts.create();
const TaskListContract = new web3.eth.Contract(TaskList.abi, account.address)
web3.eth.accounts.wallet.add(
    account.privateKey
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: ''
    };
  }

  async componentDidMount() {
    const task = await TaskListContract.methods.getTask().call();

    this.setState({ task })
  };

  render() {
    const submitSignedTransaction = async (transaction) => {
      await web3.eth.sendSignedTransaction(transaction)
    };

    const getSignedTransaction = async (transaction) => {
      let signedTransaction = await account
        .signTransaction(
          { data: transaction },
          account.privateKey
        )
        .then(result => result.rawTransaction);
      submitSignedTransaction(signedTransaction)
    };
    
    const onFormSubmit = (e) => {
      e.preventDefault();
      const task = e.target.elements.task.value;
      try {
        const transaction = TaskListContract.methods.setTask(task).encodeABI()
        getSignedTransaction(transaction)
        e.target.elements.task.value = '';
      } catch (err) {
        console.log(err)
      }
    };
    
    return (
      <div className="App">
        <div className="Form-Container">
          <h2>Add a task</h2>
          <form onSubmit={onFormSubmit}>
            <input type="text" name="task"/>
            <button className="button">Add</button> 
          </form>
          <h3>Your task is {this.state.task}</h3>
        </div>
      </div>
      
      
    );
    
  }
}

export default App;
