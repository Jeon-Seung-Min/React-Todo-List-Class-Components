import React, { PureComponent } from 'react';
import './index.css';

class Header extends PureComponent {
  render() {
    return (
      <header>
        <span  className="headline">ToDo List</span>
      </header>
    );
  }
}

export default Header;
