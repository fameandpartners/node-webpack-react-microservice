import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Motion, spring } from 'react-motion';
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// Actions
import * as AppActions from '../../actions/AppActions';

// App Components
import HeaderHider from '../shared/HeaderHider';
import MobileHeader from '../shared/MobileHeader';
import Header from '../shared/Header';
import Footer from '../shared/Footer';

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

class AppMain extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  get appBlanketClass() {
    const { sideMenuOpen } = this.props;
    return `App__blanket height--full width--full ${sideMenuOpen ? 'App__blanket--open' : ''}`;
  }

  handleClick() {
    console.warn('javascript working');
  }

  handleCloseMenu() {
    const { activateSideMenu } = this.props;
    activateSideMenu({ sideMenuOpen: false });
  }

  componentDidMount() {
    console.warn('Mounting Node', this.props);
  }

  render() {
    const { breakpoint, sideMenuOpen, example } = this.props;
    return (
      <Motion
        style={{
          x: spring(sideMenuOpen ? 15 : 0, {
            stiffness: 170,
            damping: 18,
            precision: 12,
          }),
        }}
      >
        {({ x }) =>
          <div
            className="App__main height--full"
          >
            <div
              className={this.appBlanketClass}
              onClick={this.handleCloseMenu}
              style={{
                opacity: x / 100,
                visibility: x !== 0 ? 'visible' : 'hidden',
              }}
            />
            { breakpoint === 'mobile' || breakpoint === 'tablet' ?
              <HeaderHider>
                <MobileHeader />
              </HeaderHider>
              :
              <Header />
            }
            <div className="grid-3_xs-1">
              <div className="col">...</div>
              <div className="col">...</div>
              <div className="col">...</div>
              <div className="col">...</div>
              <div className="col">...</div>
              <div className="col">...</div>
              <div className="col">...</div>
              <div className="col">...</div>
              <div className="col">...</div>
            </div>
            <div className="grid-12_md-4_xs-2">
              <div className="col">...</div>
              <div className="col">...</div>
              <div className="col">...</div>
              <div className="col">...</div>
              <div className="col">...</div>
              <div className="col">...</div>
              <div className="col">...</div>
              <div className="col">...</div>
              <div className="col">...</div>
            </div>
            <div className="App__content">
              <h2>Welcome to {example}</h2>
              <button onClick={this.handleClick}>
              More updates! Click here to see if JS working
            </button>
            </div>
            <div className="App__content">
              <h2>Welcome to {example}</h2>
              <button onClick={this.handleClick}>
              More updates! Click here to see if JS working
            </button>
            </div>
            <div className="App__content">
              <h2>Welcome to {example}</h2>
              <button onClick={this.handleClick}>
              More updates! Click here to see if JS working
            </button>
            </div>
            <div className="App__content">
              <h2>Welcome to {example}</h2>
              <button onClick={this.handleClick}>
              More updates! Click here to see if JS working
            </button>
            </div>
            <div className="App__content">
              <h2>Welcome to {example}</h2>
              <button onClick={this.handleClick}>
              More updates! Click here to see if JS working
            </button>
            </div>
            <div className="App__content">
              <h2>Welcome to {example}</h2>
              <button onClick={this.handleClick}>
              More updates! Click here to see if JS working
            </button>
            </div>
            <div className="App__content">
              <h2>Welcome to {example}</h2>
              <button onClick={this.handleClick}>
              More updates! Click here to see if JS working
            </button>
            </div>
            <div className="App__content">
              <h2>Welcome to {example}</h2>
              <button onClick={this.handleClick}>
              More updates! Click here to see if JS working
            </button>
            </div>
            <div className="App__content">
              <h2>Welcome to {example}</h2>
              <button onClick={this.handleClick}>
              More updates! Click here to see if JS working
            </button>
            </div>
            <div className="App__content">
              <h2>Welcome to {example}</h2>
              <button onClick={this.handleClick}>
              More updates! Click here to see if JS working
            </button>
            </div>
            <div className="App__content">
              <h2>Welcome to {example}</h2>
              <button onClick={this.handleClick}>
              More updates! Click here to see if JS working
            </button>
            </div>
            <div className="App__content">
              <h2>Welcome to {example}</h2>
              <button onClick={this.handleClick}>
              More updates! Click here to see if JS working
            </button>
            </div>
            <Footer />
          </div>
      }
      </Motion>
    );
  }
}

AppMain.propTypes = {
  sideMenuOpen: PropTypes.bool,
  example: PropTypes.string,
  activateSideMenu: PropTypes.func.isRequired,
  // Decorator Props
  breakpoint: PropTypes.string.isRequired,
  // winWidth: PropTypes.number.isRequired,
};

AppMain.defaultProps = {
  example: 'THIS APP',
  sideMenuOpen: false,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(AppMain));
