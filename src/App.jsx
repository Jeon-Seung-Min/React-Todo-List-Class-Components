import React, { Component } from 'react';
import Header from './Components/Header/index.jsx';
import Section from './Components/Section/index.jsx';
import Loader from './Components/Loader/index.jsx';
import IndexedDB from './IndexedDB.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {db: null};

    IndexedDB.connect()
      .then((db) => {
        this.setState({db});
      })
      .catch(console.error);
  }

  render() {
    if(this.state.db === null) {
      return (
        <div className="App">
          <Loader />
        </div>
      );
    }
    return (
      <div className="App">
        <Header />
        <Section db={this.state.db} />
      </div>
    );
  }
}

export default App;
