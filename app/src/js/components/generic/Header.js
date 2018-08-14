/* eslint-disable import/no-unresolved, react/prop-types, react/prefer-stateless-function */
/* eslint-disable import/extensions, import/no-extraneous-dependencies */


import React from 'react';
import Header from '@components/layout/Header/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CartActions from '../../actions/CartActions';


class HeaderContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <style jsx>{`
          .Header {
            z-index: 1;
          }

          #react-header .curtain  {
            z-index: 1;
          }
        `}</style>

        <Header {...this.props} />
      </React.Fragment>
    );
  }
}

const ConnectedHeader = connect(
    state => ({
      user: state.$$appState.get('user').toJS(),
      siteVersion: state.$$appState.get('siteVersion').toLowerCase() === 'australia' ? 'en-AU' : 'en-US',
      cartItemCount: state.$$cartState.get('items').size,
    }),
    (dispatch) => {
      const {
        activateCartDrawer,
      } = bindActionCreators(CartActions, dispatch);

      return {
        openShoppingCart: () => activateCartDrawer({ cartDrawerOpen: true }),
      };
    },
  )(HeaderContainer);

export default ConnectedHeader;
