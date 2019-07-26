import React from 'react';

import './TodoList.css';

class TodoList extends React.Component {
  constructor(props) {
    console.log('TodoList constructor');
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    console.log('TodoList getDerivedStateFromProps');
    return {
      todos: props.todos
    };
  }

  render() {
    console.log('TodoList render');
    let items = this.state.todos.map((todo) => {
      if(todo.done) {
        return (
          <li key={todo.index} className="item done">
            <span className="task">{todo.task+todo.index}</span>
            <span className="btn delete"><i className="far fa-trash-alt" /></span>
          </li>
        );
      } else {
        return (
          <li key={todo.index} className="item">
            <span className="task">{todo.task+todo.index}</span>
            <span
              className="btn done"
              onClick={
                (event)=>{
                  this.props.doneTask(event.currentTarget.parentNode.lastChild.value);
                  event.preventDefault();
                }}><i className="fas fa-check" /></span>
            <span className="btn delete"><i className="far fa-trash-alt" /></span>
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
