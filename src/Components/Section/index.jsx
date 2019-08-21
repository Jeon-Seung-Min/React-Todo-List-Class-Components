import React, { Component } from 'react';
import AddCtrl from './AddCtrl/index.jsx';
import TodoList from './TodoList/index.jsx';
import deepCopy from '../../deepCopy';
import IndexedDB from '../../IndexedDB.js';

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      db: this.props.db
    };
    IndexedDB.getTodos(this.state.db)
      .then((todos) => {
        this.setState({
          todos: todos
        });
      })
      .catch(console.error);
  }

  static getDerivedStateFromProps(props, state) {
    return {db: props.db}
  }

  addTodo = (task) => {
    IndexedDB.addTodo(this.state.db, task)
      .then((index) => {
        let newTodos = deepCopy(this.state.todos);
        let newTask = {
          index: Number(index),
          task: task,
          done: false
        };

        newTodos.push(newTask);

        this.setState({
          todos: newTodos
        });
      })
      .catch(console.error);
  };

  doneTodo = (index) => {
    IndexedDB.doneTodo(this.state.db, index)
      .then((index) => {
        let newTodos = deepCopy(this.state.todos);

        newTodos.some((todo, i) => {
          if(todo.index === Number(index)) {
            newTodos[i].done = true;
            return true;
          }
          return false;
        });

        this.setState({
          todos: newTodos
        });
      })
      .catch(console.error);
  };

  deleteTodo = (index) => {
    IndexedDB.deleteTodo(this.state.db, index)
      .then(() => {
        let newTodos = deepCopy(this.state.todos);

        newTodos.some((todo, i) => {
          if(todo.index === Number(index)) {
            newTodos.splice(i,1);
            return true;
          }
          return false
        });

        this.setState({
          todos: newTodos
        });
      })
      .catch(console.error);
  };

  render() {
    return (
      <section>
        <AddCtrl
          addTodo={this.addTodo} />
        <TodoList
          todos={this.state.todos}
          doneTodo={this.doneTodo}
          deleteTodo={this.deleteTodo} />
      </section>
    );
  }
}

export default Section;
