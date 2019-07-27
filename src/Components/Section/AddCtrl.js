import React from 'react';
import './AddCtrl.css';

class AddCtrl extends React.Component {
  constructor(props) {
    console.log('AddCtrl constructor');
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(props, state) {
    console.log('AddCtrl shouldComponentUpdate');
    if(this.state === state){
      return false;
    }
    return true;
  }

  render() {
    console.log('AddCtrl render');
    return (
      <form
        onSubmit={
          (event)=>{
            this.props.addTask(event.target.task.value);
            event.target.task.value = '';
            event.preventDefault();
          }}>
        <div className="addCtrl">
          <input
            name="task"
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
