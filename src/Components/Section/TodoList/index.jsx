import React, { Component } from 'react';
import Item from './Item.jsx';
import './index.css';

class TodoList extends Component {
  render() {
    return (
      <div className="todoList">
        <ul className="todos">
        {
          this.props.todos.map((todo) => (
            <Item
              key={todo.index}
              todo={todo}
              doneTodo={this.props.doneTodo}
              deleteTodo={this.props.deleteTodo} />
          ))
        }
        </ul>
      </div>
    );
  }
}

export default TodoList;
