import React, { Component } from 'react';
import { thorify } from 'thorify';
import TaskList from './build/contracts/TaskList.json';

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
          { ...transaction, gas: '50' },
          account.privateKey
        )
        .then(result => result.rawTransaction);
      submitSignedTransaction(signedTransaction)
      console.log(signedTransaction)
    };
    
    const onFormSubmit = async (e) => {
      e.preventDefault();
      const task = e.target.elements.task.value;
      try {
        const transaction = await TaskListContract.methods.setTask(task).send({
          from: account.address
        })
        getSignedTransaction(transaction)
      } catch (err) {
        console.log(err)
      }
    };
    
    return (
      <div>
        <form onSubmit={onFormSubmit}>
          <input type="text" name="task"/>
          <button>Add Task</button> 
        </form>
      </div>
      
    );
    
  }
}

export default App;
