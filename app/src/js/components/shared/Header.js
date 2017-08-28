import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as CartActions from '../../actions/CartActions';

// CSS
import '../../../css/components/Header.scss';

// Assets
import FameLogo from '../../../svg/i-fame-logo.svg';
import ShoppingBagIcon from '../../../svg/i-shopping-bag.svg';
import AccountIcon from '../../../svg/i-account.svg';
import SearchIcon from '../../../svg/i-search.svg';


function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    cartItems: state.$$cartState.get('lineItems'),
    cartItemCount: state.$$cartState.get('lineItems').size,
    cartDrawerOpen: state.$$cartState.get('cartDrawerOpen'),
  };
}

function dispatchToProps(dispatch) {
  const { activateCartDrawer } = bindActionCreators(CartActions, dispatch);
  return { activateCartDrawer };
}

class Header extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleShoppingBagClick() {
    const { activateCartDrawer, cartDrawerOpen } = this.props;
    activateCartDrawer({ cartDrawerOpen: !cartDrawerOpen });
  }

  render() {
    const { cartItemCount } = this.props;
    return (
      <header className="Header u-width--full">
        <div className="layout-container">
          <nav className="grid-12">
            <ul className="col-4 textAlign--left">
              <li><a className="Header__link" href="#shop">Shop all</a></li>
              <li><a className="Header__link" href="#featured">Featured</a></li>
              <li><a className="Header__link" href="#about">Who we are</a></li>
            </ul>
            <div className="col-4 u-textAlign--center">
              <img src={FameLogo.url} alt="Fame Logo" width="200px" height="26px" />
            </div>
            <ul className="col-4 textAlign--right">
              <li className="Header__action">
                <img src={SearchIcon.url} alt="Search for dresses" width="18px" height="26px" />
              </li>
              <li className="Header__action">
                <img src={AccountIcon.url} alt="My Account Icon" width="18px" height="26px" />
              </li>
              <li onClick={this.handleShoppingBagClick} className="Header__action">
                { cartItemCount > 0
                  ? <span className="Header__cart-count">{cartItemCount}</span>
                  : null
                }
                <img src={ShoppingBagIcon.url} alt="My bag" width="18px" height="26px" />
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  activateCartDrawer: PropTypes.func.isRequired,
  cartItemCount: PropTypes.number,
  cartDrawerOpen: PropTypes.bool,
};

Header.defaultProps = {
  cartItemCount: 0,
  cartDrawerOpen: false,
};

export default connect(stateToProps, dispatchToProps)(Header);
