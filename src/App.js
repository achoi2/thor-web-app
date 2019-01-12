import React, { Component } from 'react';
import { thorify } from 'thorify';
import TaskList from './build/contracts/TaskList.json';

const Web3 = require('web3');
const web3 = thorify(new Web3(), 'http://localhost:8669');
const account = web3.eth.accounts.create();
const TaskListContract = new web3.eth.Contract(TaskList.abi, account.address)

account.signTransaction({
  gas: 50
}, account.privateKey).then(result => console.log(result))


// account.sendSignedTransaction()

web3.eth.accounts.wallet.add(account.privateKey)


// web3.eth.sendTransaction({
//   from: account.address
// }).then(ret => console.log(ret))

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

  onFormSubmit = async (e) => {
    e.preventDefault();
    const task = e.target.elements.task.value;

    await TaskListContract.methods.setTask(task).send({
      from: account.address
    })
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input type="text" name="task"/>
          <button>Add Task</button> 
        </form>
      </div>
      
    );
  }
}

export default App;
