import React from 'react';
import './TodoList.css';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    return {
      todos: props.todos
    };
  }

  doneOnClick = (event) => {
    this.props.doneTask(event.currentTarget.parentNode.lastChild.value);
    event.preventDefault();
  }

  deleteOnClick = (event) => {
    this.props.deleteTask(event.currentTarget.parentNode.lastChild.value);
    event.preventDefault();
  }

  render() {
    let items = this.state.todos.map((todo) => {
      if(todo.done) {
        return (
          <li key={todo.index} className="item done">
            <span className="task">{todo.task}</span>
            <span className="btn delete" onClick={this.deleteOnClick}><i className="far fa-trash-alt" /></span>
            <input type="hidden" name="index" value={todo.index} />
          </li>
        );
      } else {
        return (
          <li key={todo.index} className="item">
            <span className="task">{todo.task}</span>
            <span className="btn done" onClick={this.doneOnClick}><i className="fas fa-check" /></span>
            <span className="btn delete" onClick={this.deleteOnClick}><i className="far fa-trash-alt" /></span>
            <input type="hidden" name="index" value={todo.index} />
          </li>
        );
      }
    });

    return (
      <div className="todoList">
        <ul className="todos">
          {items}
        </ul>
      </div>
    );
  }
}

export default TodoList;
