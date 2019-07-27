import React from 'react';
import AddCtrl from './AddCtrl';
import TodoList from './TodoList';
import {todos} from '../../todos.json';
import deepCopy from '../../deepCopy';
import './index.css';

class Section extends React.Component {
  constructor(props) {
    console.log('index constructor');
    super(props);
    this.state = {
      todos: todos,
      lastIndex: Number(todos.length)
    };
  }

  addTask = (task)=>{
    let newTodos = deepCopy(this.state.todos);
    let newTask = {
      index: Number(this.state.lastIndex)+1,
      task: task,
      done: false
    };

    newTodos.push(newTask);

    this.setState({
      lastIndex: Number(newTask.index),
      todos: newTodos
    });
  };

  doneTask = (index)=>{
    let newTodos = deepCopy(this.state.todos);

    newTodos.some((todo, i)=>{
      if(todo.index === Number(index)) {
        newTodos[i].done = true;
        return true;
      }
    });
    
    this.setState({
      todos: newTodos
    });
  };

  deleteTask = (index)=>{
    let newTodos = deepCopy(this.state.todos);

    newTodos.some((todo, i)=>{
      if(todo.index === Number(index)) {
        newTodos.splice(i,1);
        return true;
      }
    });

    this.setState({
      todos: newTodos
    });
  };

  render() {
    console.log('index render');
    return (
      <section>
        <AddCtrl
          addTask={this.addTask} />
        <TodoList
          todos={this.state.todos}
          doneTask={this.doneTask}
          deleteTask={this.deleteTask} />
      </section>
    );
  }
}

export default Section;
