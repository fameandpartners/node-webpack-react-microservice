/* eslint-disable import/no-unresolved, react/prop-types */
/* eslint-disable import/extensions, import/no-extraneous-dependencies */

import React from 'react';
import Cart from '@components/layout/Cart/Cart';
import Curtain from '@components/base/Curtain';
import SlideInOutTransition from '@components/animation/SlideInOutTransition';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CartActions from '../../actions/CartActions';
import analytics from '../../utilities/analytics';
import { removeFromCart } from '../../utilities/cart-helper';

class CartContainer extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isRemoving: [],
      isRemovingError: [],
    };
  }

  handleRemoveFromCartClick(item) {
    this.setState({
      isRemoving: [item.cartLineId],
      isRemovingError: [],
    });

    this.handleRemoveFromCartCallback(item.cartLineId, removeFromCart(item.cartLineId));
    // Analytics Tracking
    if (item) {
      analytics.removeFromCart({
        id: item.product.id,
        productCentsBasePrice: item.price / 100.0,
        productTitle: item.product.title,
        productVariantId: '',
      });
    }
  }

  handleRemoveFromCartCallback(id, req) {
    const {
      setCartContents,
    } = this.props;

    req.end((err, res) => {
      this.setState({ isRemoving: [] });
      if (err) {
        // eslint-disable-next-line
        this.setState({isRemovingError: [id]});
        return console.log('Error removing dress from cart.');
      }

      setCartContents({ cart: res.body });
      return null;
    });
  }

  render() {
    const {
      siteVersion,
      cart,
      closeCart,
      isCartVisible,
    } = this.props;

    return (
      <React.Fragment>
        <style jsx>{`
          .cart-container {
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            max-width: 500px;
          }
        `}</style>
        <Curtain isVisible={isCartVisible} onClick={closeCart} />
        <SlideInOutTransition isVisible={isCartVisible} slideInFrom="right">
          {styles => (
            <div className="cart-container" style={styles}>
              <Cart
                siteVersion={siteVersion}
                cart={cart}
                removeFromCartAsync={this.handleRemoveFromCartClick}
                closeCart={closeCart}
                isErrorRemovingList={this.state.isRemovingError}
                isRemovingList={this.state.isRemoving}
              />
            </div>
          )}
        </SlideInOutTransition>
      </React.Fragment>
    );
  }
}

const ConnectedCart = connect(
  state => ({
    user: state.$$appState.get('user').toJS(),
    siteVersion: state.$$appState.get('siteVersion').toLowerCase() === 'australia' ? 'en-AU' : 'en-US',
    isCartVisible: state.$$cartState.get('cartDrawerOpen'),
    cart: state.$$cartState.toJS(),
  }),
  (dispatch) => {
    const { activateCartDrawer, setCartContents } = bindActionCreators(CartActions, dispatch);

    return {
      setCartContents,
      closeCart: () => activateCartDrawer({ cartDrawerOpen: false }),
    };
  },
)(CartContainer);

export default ConnectedCart;
