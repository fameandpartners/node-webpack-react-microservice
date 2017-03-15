import React, { Component } from 'react';
import '../css/App.css';

class App extends Component {
  componentDidMount(){
    console.warn('Called on client not server', window);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Fame and Partners</h2>
        </div>
      </div>
    );
  }
}

export default App;
