import React, { Component, PropTypes } from 'react';

// App Components
import Header from './components/shared/Header';
import Footer from './Footer';

// Global Styles
import '../css/reset.scss';
import '../css/components/App.scss';

class App extends Component {
  handleClick() {
    console.warn('javascript working');
  }
  sampleTest() {
    return true;
  }
  componentDidMount() {
    console.warn('Mounting Node', this.props);
  }
  render() {
    return (
      <div className="App" cacheKey="App">
        <Header />
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
  example: 'Node Site',
};

App.propTypes = {
  example: PropTypes.string,
};

export default App;
