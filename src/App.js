import React from 'react';
import Header from './Components/Header';
import Section from './Components/Section';
import Loader from './Components/Loader';
import indexedDB from './indexedDB';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      db: null
    };
    indexedDB.connect.call(this);
  }


  render() {
    if(this.state.db === null) {
      return (
        <Loader />
      );
    } else {
      return (
        <div className="App">
        <Header />
        <Section db={this.state.db} />
        </div>
      );
    }
  }
}

export default App;
