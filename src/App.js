import React, { Component } from 'react';
import { thorify } from 'thorify';
import TaskList from './build/contracts/TaskList.json';
import './App.css';

const Web3 = require('web3');
const web3 = thorify(new Web3(), 'http://localhost:8669');
// const account = web3.eth.accounts.create();
const privateKey = process.env.REACT_APP_PRIVATE_KEY;
const address = process.env.REACT_APP_ADDRESS;
const TaskListContract = new web3.eth.Contract(TaskList.abi, address);
web3.eth.accounts.wallet.add(
    privateKey
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: ''
    };
  };

  async componentDidMount() {
    let task = await TaskListContract.methods.getTask().call().then(result=> console.log(result));
     this.setState({ task });
  };

  render() {
    const onFormSubmit = async (e) => {
      e.preventDefault();
      const task = e.target.elements.task.value;

      let transaction = await TaskListContract.methods.setTask(task).send({
        from: address
      });

      let tx = {
        to: address,
        transaction
      };

      web3.eth.accounts.signTransaction(tx,
          privateKey)
        .then(signed => web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log))
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
