import React, { Component, createRef } from 'react';

class Item extends Component {
  constructor(props) {
    super(props);
    this.indexInput = createRef(null);
  }

  doneOnClickHandler = () => {
    this.props.doneTodo(this.indexInput.current.value);
  }

  deleteOnClickHandler = () => {
    this.props.deleteTodo(this.indexInput.current.value);
  }

  render() {
    if(this.props.todo.done) {
      return (
        <li className="item done">
          <span className="task">{this.props.todo.task}</span>
          <span className="btn delete" onClick={this.deleteOnClickHandler}><i className="far fa-trash-alt" /></span>
          <input ref={this.indexInput} type="hidden" name="index" value={this.props.todo.index} />
        </li>
      );
    } else {
      return (
        <li className="item">
          <span className="task">{this.props.todo.task}</span>
          <span className="btn done" onClick={this.doneOnClickHandler}><i className="fas fa-check" /></span>
          <span className="btn delete" onClick={this.deleteOnClickHandler}><i className="far fa-trash-alt" /></span>
          <input ref={this.indexInput} type="hidden" name="index" value={this.props.todo.index} />
        </li>
      );
    }
  }
}

export default Item;
