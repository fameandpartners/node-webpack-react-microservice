import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Motion, spring } from 'react-motion';
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// TEST IMAGES
import image1 from '../../../img/test/image_1.png';
import image2 from '../../../img/test/image_2.png';
import image3 from '../../../img/test/image_3.png';
import image4 from '../../../img/test/image_4.png';
import image5 from '../../../img/test/image_5.png';
import image6 from '../../../img/test/image_6.png';
import image7 from '../../../img/test/image_7.png';

// Actions
import * as AppActions from '../../actions/AppActions';

// App Components
import HeaderHider from '../shared/HeaderHider';
import HeaderMobile from '../shared/HeaderMobile';
import Header from '../shared/Header';
import Footer from '../shared/Footer';

// UI Global Components
import Input from '../form/Input';
import Select from '../form/Select';

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

  handleCloseMenu() {
    const { activateSideMenu } = this.props;
    activateSideMenu({ sideMenuOpen: false });
  }

  render() {
    const { breakpoint, sideMenuOpen } = this.props;
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
                <HeaderMobile />
              </HeaderHider>
              :
              <Header />
            }
            <div className="layout-container typography ui-component-section grid-12">
              <div className="col-12">
                <h2>UI Global Components</h2>
              </div>
              <div className="col-4">
                <pre>Input.js</pre>
                <Input
                  id="test-input"
                />
              </div>
              <div className="col-4">
                <pre>Select.js</pre>
                <Select
                  id="test-select"
                  label="Choose Something"
                  options={[
                    { id: 0, name: 'Option One', active: false },
                    { id: 1, name: 'Option Two', active: false },
                  ]}
                />
              </div>
            </div>
            <div className="App__content layout-container">
              <div className="grid-12">
                <div className="App__primarappy-image-container brick col-6">
                  <img className="width--full" alt="dress1" src={image1} />
                </div>
                <div className="App__dress-options col-6">
                  <div>Color</div>
                  <div>Addons</div>
                  <div>Sizing</div>
                </div>
              </div>
              <div className="App__photo-montage masonry grid-12">
                <div className="col-6">
                  <div className="brick">
                    <img className="width--full" alt="dress2" src={image2} />
                  </div>
                  <div className="brick">
                    <img className="width--full" alt="dress3" src={image3} />
                  </div>
                  <div className="brick">
                    <img className="width--full" alt="dress4" src={image4} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="brick">
                    <img className="width--full" alt="dress5" src={image5} />
                  </div>
                  <div className="brick typography">
                    <h2>Product Details</h2>
                    <p>
                      Low effort, high contrast. The Jo is a heavy georgette gown featuring
                      a contrasting pink bow at the front, criss-cross back strips,
                      and a side split. It has an invisible zipper.
                    </p>
                    <p>-</p>
                    <p>Our model wears a US 0 and is 5&apos;9"</p>
                  </div>
                  <div className="brick">
                    <img className="width--full" alt="dress6" src={image6} />
                  </div>
                  <div className="brick">
                    <img className="width--full" alt="dress7" src={image7} />
                  </div>
                </div>
              </div>
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
  activateSideMenu: PropTypes.func.isRequired,
  // Decorator Props
  breakpoint: PropTypes.string.isRequired,
  // winWidth: PropTypes.number.isRequired,
};

AppMain.defaultProps = {
  sideMenuOpen: false,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(AppMain));
