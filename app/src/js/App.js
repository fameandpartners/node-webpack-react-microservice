import React, { Component } from 'react';
import Footer from './Footer';
import '../css/App.css';

class App extends Component {
  handleClick(){
    alert('javascript working');
  }
  componentDidMount(){
    console.log('Mounting Node', this.props);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to {this.props.example}</h2>
          <button onClick={this.handleClick}>Click here to see if JS working</button>
        </div>
        <Footer />
      </div>
    );
  }
}

App.defaultProps = {
  example: 'Fame and Partners'
}

export default App;
