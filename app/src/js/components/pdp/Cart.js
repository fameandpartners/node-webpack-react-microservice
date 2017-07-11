import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import objnoop from '../../libs/objnoop';
// import { bindActionCreators } from 'redux';

// TEST IMAGES
import image1 from '../../../img/test/image_1.png';

// Actions
// import * as AppActions from '../../actions/AppActions';

// CSS
import '../../../css/components/Cart.scss';


function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    productDescription: state.$$productState.get('productDescription'),
    modelDescription: state.$$productState.get('modelDescription'),
  };
}


class Cart extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <div className="Cart">
        <div className="Cart__header">
          <h4>Shopping Bag</h4>
        </div>
        <div className="layout-container">
          <div className="Cart__single_product_description App--mt-normal grid-12">
            <div className="col-5">
              <img className="width--full" alt="dress1" src={image1} />
            </div>
            <div className="col-7 textAlign--left">
              Description
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  // productDescription: PropTypes.string.isRequired,
  // modelDescription: PropTypes.string.isRequired,
};

export default connect(stateToProps, objnoop)(Cart);
