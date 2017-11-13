import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Motion, spring } from 'react-motion';

// Constants
import AppConstants from '../../../constants/AppConstants';

// UI Components
import CartEmpty from './CartEmpty';
import Cart from './Cart';
import CancelOut from '../CancelOut';

// Actions
import * as CartActions from '../../../actions/CartActions';

// Polyfills
import win from '../../../polyfills/windowPolyfill';

// CSS
import '../../../../css/components/Cart.scss';


function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    lineItems: state.$$cartState.get('lineItems').toJS(),
    cartDrawerOpen: state.$$cartState.get('cartDrawerOpen'),
    // complementaryProducts: state.$$productState.get('complementaryProducts').toJS(),
  };
}

function dispatchToProps(dispatch) {
  const {
    activateCartDrawer,
    setCartContents,
  } = bindActionCreators(CartActions, dispatch);

  return {
    activateCartDrawer,
    setCartContents,
  };
}


class CartDrawer extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleShoppingBagClose() {
    this.props.activateCartDrawer({ cartDrawerOpen: false });
  }

  componentDidMount() {
    const {
      setCartContents,
    } = this.props;
    if (win.CartData) {
      setCartContents({ cart: win.CartData });
    } else {
      // eslint-disable-next-line
      console.warn('NO CART DATA!');
    }
  }

  render() {
    const {
      cartDrawerOpen,
      // complementaryProducts,
      lineItems,
    } = this.props;

    return (
      <Motion
        style={{
          x: spring(cartDrawerOpen ? -500 : 0, AppConstants.ANIMATION_CONFIGURATION),
        }}
      >
        {({ x }) =>
          <div
            className="CartDrawer__wrapper"
            style={{ transform: `translateX(${500 - (x * -1)}px)` }}
          >
            <div className="CartDrawer u-flex--col u-height--full">
              <div className="CartDrawer__header Cart__layout-container header-wrapper">
                <div className="u-position--relative">
                  <span
                    onClick={this.handleShoppingBagClose}
                    className="CartDrawer__hidden-close u-cursor--pointer"
                  >
                    <CancelOut />
                  </span>
                  <h4>Shopping Bag</h4>
                </div>
                { lineItems.length > 0
                ? <Cart lineItems={lineItems} />
                : <CartEmpty />
              }
              </div>
            </div>
          </div>
      }
      </Motion>
    );
  }
}

CartDrawer.propTypes = {
  // Redux Props
  cartDrawerOpen: PropTypes.bool,
  // complementaryProducts: PropTypes.arrayOf(PropTypes.shape({
  //   centsPrice: PropTypes.number,
  //   smallImg: PropTypes.string,
  //   productId: PropTypes.number,
  //   productTitle: PropTypes.string,
  //   url: PropTypes.string,
  // })).isRequired,
  lineItems: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      centsTotal: PropTypes.number,
      hexValue: PropTypes.string,
    }),
    addons: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      centsTotal: PropTypes.number,
    })),
  })).isRequired,
  // Redux Actions
  activateCartDrawer: PropTypes.func.isRequired,
  // modelDescription: PropTypes.string.isRequired,
  setCartContents: PropTypes.func.isRequired,
};

CartDrawer.defaultProps = {
  cartDrawerOpen: false,
};

export default connect(stateToProps, dispatchToProps)(CartDrawer);
