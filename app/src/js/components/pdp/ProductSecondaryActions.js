import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import HeartIcon from '../../../svg/i-heart.svg';
import ShareIcon from '../../../svg/i-share.svg';

// Actions
// import * as AppActions from '../../actions/AppActions';

function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    productTitle: state.$$productState.get('productTitle'),
  };
}

function dispatchToProps() {
  return {};
  // const actions = bindActionCreators(AppActions, dispatch);
  // return {
  //   activateSideMenu: actions.activateSideMenu,
  // };
}

class ProductSecondaryActions extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <div className="ProductSecondaryActions">
        <ul>
          <li className="display--inline">
            <img src={HeartIcon.url} alt="Favorite this dress" width="40px" height="18px" />
          </li>
          <li className="display--inline">
            <img src={ShareIcon.url} alt="Share this dress" width="40px" height="18px" />
          </li>
        </ul>
      </div>
    );
  }
}

ProductSecondaryActions.propTypes = {
  // productTitle: PropTypes.string.isRequired,
};

ProductSecondaryActions.defaultProps = {
  // sideMenuOpen: false,
};

export default connect(stateToProps, dispatchToProps)(ProductSecondaryActions);
