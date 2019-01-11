pragma solidity ^0.4.17;

contract TaskList {
    string public task;
    
    function TaskList(string firstTask) public {
        task = firstTask;
    }
    
    function setTask(string newTask) public {
        task = newTask;
    }
    
    function getTask() public view returns (string) {
        return task;
    }
}