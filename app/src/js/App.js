import React, { Component, PropTypes } from 'react';

// App Components
import Header from './components/shared/Header';
import Footer from './Footer';

// Global Styles
import '../css/global/variables.scss';
import '../css/reset.scss';
import '../css/helpers.scss';
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
        <div className="App__main">
          <Header />
          <div className="App__content">
            <h2>Welcome to {this.props.example}</h2>
            <button onClick={this.handleClick}>
              More updates! Click here to see if JS working
            </button>
          </div>
          <Footer />
        </div>
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
