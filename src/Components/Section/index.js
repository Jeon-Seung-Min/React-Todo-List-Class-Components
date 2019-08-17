import React from 'react';
import AddCtrl from './AddCtrl';
import TodoList from './TodoList';
import deepCopy from '../../deepCopy';
import indexedDB from '../../indexedDB';
import './index.css';

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      db: this.props.db
    };
    indexedDB.getTodos(this.state.db)
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

  addTask = (task) => {
    indexedDB.addTask(this.state.db, task)
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

  doneTask = (index) => {
    indexedDB.doneTask(this.state.db, index)
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

  deleteTask = (index) => {
    indexedDB.deleteTask(this.state.db, index)
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
