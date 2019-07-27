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

  render() {
    console.log('index render');
    return (
      <section>
        <AddCtrl
          addTask={(task)=>{
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
          }} />
        <TodoList
          todos={this.state.todos}
          doneTask={(index)=>{
            let newTodos = deepCopy(this.state.todos);
            newTodos[index-1].done = true;
            this.setState({
              todos: newTodos
            });
          }} />
      </section>
    );
  }
}

export default Section;
