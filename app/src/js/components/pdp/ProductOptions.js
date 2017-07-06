import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// TEST IMAGES
import image1 from '../../../img/test/image_1.png';

// Actions
// import * as AppActions from '../../actions/AppActions';

// CSS
// import '../../../css/components/ProductDisplayOptionsTouch.scss';

// Assets


// function stateToProps(state) {
//   // Which part of the Redux global state does our component want to receive as props?
//   return {
//     sideMenuOpen: state.$$appState.get('sideMenuOpen'),
//   };
// }
//
// function dispatchToProps(dispatch) {
//   const actions = bindActionCreators(AppActions, dispatch);
//   return {
//     activateSideMenu: actions.activateSideMenu,
//   };
// }

class ProductOptions extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <div className="ProductOptions grid-12">
        <div className="App__primary-image-container brick col-6">
          <img className="width--full" alt="dress1" src={image1} />
        </div>
        <div className="App__dress-options col-6">
          <div>Color</div>
          <div>Addons</div>
          <div>Sizing</div>
        </div>
      </div>
    );
  }
}

ProductOptions.propTypes = {
  // sideMenuOpen: PropTypes.bool,
};

ProductOptions.defaultProps = {
  // sideMenuOpen: false,
};

export default ProductOptions;
