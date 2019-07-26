import React from 'react';
import Header from './Components/Header';
import Section from './Components/Section';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Section />
      </div>
    );
  }
}


export default App;
