import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autoBind from 'react-autobind';

// Actions
import * as AppActions from './actions/AppActions';

// App Components
import Header from './components/shared/Header';
import Footer from './Footer';
import SideMenu from './components/shared/SideMenu';

// Global Styles
import '../css/global/variables.scss';
import '../css/reset.scss';
import '../css/helpers.scss';
import '../css/components/App.scss';

function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    sideMenuOpen: state.$$appState.get('sideMenuOpen'),
  };
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(AppActions, dispatch);
  return {
    activateSideMenu: actions.activateSideMenu,
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  handleClick() {
    console.warn('javascript working');
  }
  sampleTest() {
    return true;
  }
  componentDidMount() {
    console.warn('Mounting Node', this.props);
  }

  handleCloseMenu() {
    const { activateSideMenu } = this.props;
    activateSideMenu({ sideMenuOpen: false });
  }

  render() {
    const { sideMenuOpen } = this.props;
    return (
      <div className="App" cacheKey="App">
        <SideMenu sideMenuOpen={sideMenuOpen} handleCloseMenu={this.handleCloseMenu} />
        <div className={`App__main height--full ${sideMenuOpen ? 'App__main--open' : ''}`}>
          <div
            className="App__blanket height--full width--full"
            onClick={this.handleCloseMenu}
          />
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

App.propTypes = {
  sideMenuOpen: PropTypes.bool,
  activateSideMenu: PropTypes.func.isRequired,
  example: PropTypes.string,
};

App.defaultProps = {
  sideMenuOpen: false,
  example: 'Node Site',
};

export default connect(stateToProps, dispatchToProps)(App);
