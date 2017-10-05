import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import Cookies from 'universal-cookie';

// Components
import AddToCartModal from './AddToCartModal';
import Drawer from './Drawer';
import ShareModal from './ShareModal';
import Onboarding from './Onboarding';

// Polyfills
import win from '../../polyfills/windowPolyfill';

import '../../../css/components/shopping_spree.scss';

class ShoppingSpree extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.cookies = new Cookies();
    this.state = {
      showAddingToCartModal: false,
      // firebaseNodeId: this.cookies.get('shopping_spree_id'),
      firebaseNodeId: 'test',
      email: this.cookies.get('shopping_spree_email'),
      icon: parseInt(this.cookies.get('shopping_spree_icon'), 10),
      name: this.cookies.get('shopping_spree_name'),
      display: this.cookies.get('shopping_spree_id') !== null,
      minimize: this.cookies.get('shopping_spree_id') !== null,
      showAddToCartModal: false,
      dressAddingToCart: null,
    };
  }
  fetchAndClearStartingState() {
    const toReturn = this.cookies.get('shopping_spree_starting_state');
    this.cookies.remove('shopping_spree_starting_state');
    return toReturn;
  }

  // setInitialState() {
  //   const startingState = this.fetchAndClearStartingState();
  //   const email = this.cookies.get('shopping_spree_email');
  //
  //   let display = 'none';
  //   let minimize = false;
  //
  //   if (startingState) {
  //     display = startingState;
  //   } else if (firebaseId) {
  //     display = 'chat';
  //     minimize = true;
  //   }
  //
  //   this.state = {
  //     display,
  //     name,
  //     email,
  //     icon,
  //     firebaseNodeId: firebaseId,
  //     minimize,
  //   };
  // }

  startOnboarding() {
    console.log('start onboarding');
    this.setState({
      display: 'onboarding',
    });
  }
  showAddToCartModal(dress) {
    this.setState({
      showAddingToCartModal: true,
      dressAddingToCart: dress,
    });
  }

  closeAddToCartModal() {
    this.setState({
      showAddingToCartModal: false,
      dressAddingToCart: null,
    });
  }

  doneShoppingSpree() {
    this.cookies.remove('shopping_spree_name');
    this.cookies.remove('shopping_spree_email');
    this.cookies.remove('shopping_spree_id');
    this.setState({
      display: 'none',
    });
  }

  showShareModal() {
    this.setState({
      display: 'share',
    });
  }

  closeOnboarding() {
    this.setState({
      display: 'none',
    });
  }

  doneOnboarding(email, name, icon, shoppingSpreeId) {
    this.setState({
      display: 'share',
      name,
      email,
      icon,
      firebaseNodeId: shoppingSpreeId,
    });
  }

  doneSharing() {
    this.setState({
      display: 'chat',
    });
  }

  hideZopim() {
    if (win.$zopim && win.$zopim.livechat) {
      win.$zopim.livechat.hideAll();
    } else {
      win.requestAnimationFrame(this.hideZopim);
    }
  }

  componentDidMount() {
    this.hideZopim();
  }
  render() {
    return (
      <div>
        {
          this.state.showAddingToCartModal &&
            <AddToCartModal
              dress={this.state.dressAddingToCart}
              firebaseAPI={this.props.firebaseAPI}
              firebaseDatabase={this.props.firebaseDatabase}
              firebaseNodeId={this.state.firebaseNodeId}
              name={this.state.name}
              email={this.state.email}
              icon={this.state.icon}
              closeModal={this.closeAddToCartModal}
            />
        }
        {
          this.state.display === 'chat' &&
            <Drawer
              firebaseAPI={this.props.firebaseAPI}
              firebaseDatabase={this.props.firebaseDatabase}
              firebaseNodeId={this.state.firebaseNodeId}
              name={this.state.name}
              email={this.state.email}
              icon={this.state.icon}
              closed={this.state.minimize}
              showAddToCartModal={this.showAddToCartModal}
              doneShoppingSpree={this.doneShoppingSpree}
              showShareModal={this.showShareModal}
            />

        }
        {
            this.state.display === 'share' &&
              <ShareModal
                nextStep={this.doneSharing}
                firebaseNodeId={this.state.firebaseNodeId}
              />
        }
        {
            this.state.display === 'onboarding' &&
              <Onboarding
                doneOnboarding={this.doneOnboarding}
                close={this.closeOnboarding}
                shoppingSpreeId={this.state.firebaseNodeId}
              />
        }
      </div>
    );
  }
}

ShoppingSpree.propTypes = {
  firebaseAPI: PropTypes.string,
  firebaseDatabase: PropTypes.string.isRequired,
};

ShoppingSpree.defaultProps = {
  name: null,
  icon: 0,
  email: null,
  firebaseId: 'test',
  firebaseAPI: 'AIzaSyDhbuF98kzK0KouFeasDELcOKJ4q7DzhHY',
  firebaseDatabase: 'shopping-spree-85d74',
};


export default ShoppingSpree;
