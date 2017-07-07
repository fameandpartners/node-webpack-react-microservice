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
import * as ModalActions from '../../actions/ModalActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';


// PDP specific UI Components
import ProductPrecustomizations from './ProductPrecustomizations';
import ProductDescription from './ProductDescription';
import ProductDisplayOptionsTouch from './ProductDisplayOptionsTouch';
import ProductOptions from './ProductOptions';
import ProductGrid from './ProductGrid';

// Generic UI Components
// import ComponentTestPleaseRemove from '../shared/ComponentTestPleaseRemove';
import HeaderHider from '../shared/HeaderHider';
import HeaderMobile from '../shared/HeaderMobile';
import Header from '../shared/Header';
import Footer from '../shared/Footer';

function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    productTitle: state.$$productState.get('productTitle'),
    sideMenuOpen: state.$$appState.get('sideMenuOpen'),
  };
}

function dispatchToProps(dispatch) {
  const actions = bindActionCreators(AppActions, dispatch);
  const modalActions = bindActionCreators(ModalActions, dispatch);
  return {
    activateSideMenu: actions.activateSideMenu,
    activateModal: modalActions.activateModal,
  };
}

class AppMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
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

  handleActivateModal() {
    this.props.activateModal({ modalId: ModalConstants.SIGN_UP_MODAL });
  }

  render() {
    const {
      breakpoint,
      productTitle,
      sideMenuOpen,
    } = this.props;
    console.log('breakpoint', breakpoint);

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
                <HeaderMobile headerTitle={productTitle} />
              </HeaderHider>
              :
              <Header />
            }

            { /* <ComponentTestPleaseRemove /> */ }

            <div className="layout-container App--mb-normal">
              { breakpoint === 'mobile' || breakpoint === 'tablet'
                ? <ProductDisplayOptionsTouch />
                : <ProductOptions />
              }
            </div>

            <div className="layout-container grid-2_sm-1">
              <div className="col">
                <ProductDescription />
              </div>
              <div className="col">
                <ProductPrecustomizations />
              </div>
            </div>

            <div className="layout-container App--mb-normal">
              { breakpoint === 'mobile' || breakpoint === 'tablet'
                ? null
                : <ProductGrid />
              }
            </div>

            <Footer />
          </div>
      }
      </Motion>
    );
  }
}

AppMain.propTypes = {
  // Redux Props
  activateSideMenu: PropTypes.func.isRequired,
  activateModal: PropTypes.func.isRequired,
  productTitle: PropTypes.string,
  sideMenuOpen: PropTypes.bool,
  // Decorator Props
  breakpoint: PropTypes.string.isRequired,
  // winWidth: PropTypes.number.isRequired,
};

AppMain.defaultProps = {
  productTitle: '',
  sideMenuOpen: false,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(AppMain));
