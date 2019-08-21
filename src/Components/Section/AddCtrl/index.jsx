import React, { PureComponent, createRef } from 'react';
import './index.css';

class AddCtrl extends PureComponent {
  constructor(props) {
    super(props);
    this.taskInput = createRef(null);
  }

  addOnSubmitHandler = (e) => {
    e.preventDefault();
    this.props.addTodo(this.taskInput.current.value);
    this.taskInput.current.value = '';
  }

  render() {
    return (
      <form
        onSubmit={this.addOnSubmitHandler}>
        <div className="addCtrl">
          <input
            ref={this.taskInput}
            className="addInp"
            type="text"
            placeholder="New Task"
            required />
          <button
            type="submit"
            className="addBtn">Add</button>
        </div>
      </form>
    );
  }
}

export default AddCtrl;
