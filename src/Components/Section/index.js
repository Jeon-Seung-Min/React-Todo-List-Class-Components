import React from 'react';
import AddCtrl from './AddCtrl';
import TodoList from './TodoList';
// import {todos} from '../../todos.json';
import deepCopy from '../../deepCopy';
import indexedDB from '../../indexedDB';
import './index.css';

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      lastIndex: 0,
      db: this.props.db
    };
    indexedDB.getTodos.call(this, this.state.db);
  }

  static getDerivedStateFromProps(props, state) {
    return {db: props.db}
  }

  addTask = (task)=>{
    indexedDB.addTask(this.state.db, task)
      .then((index)=>{
        let newTodos = deepCopy(this.state.todos);
        let newTask = {
          index: index,
          task: task,
          done: false
        };

        newTodos.push(newTask);

        this.setState({
          lastIndex: Number(newTask.index),
          todos: newTodos
        });
      })
      .catch(console.error);
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
