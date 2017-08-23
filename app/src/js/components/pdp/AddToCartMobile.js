import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

// UI
import ButtonLedge from '../generic/ButtonLedge';

// CSS
import '../../../css/components/AddToCartMobile.scss';


function stateToProps() {
  return {

  };
}

function dispatchToProps() {
  return {

  };
}


class AddToCartMobile extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  render() {
    return (
      <div className="AddToCartMobile u-position--fixed u-width--full">
        <ButtonLedge
          leftText="Your Size"
          rightText="[PRICE] - Add to Bag"
          handleLeftButtonClick={() => {}}
          handleRightButtonClick={() => {}}
        />
      </div>
    );
  }
}

AddToCartMobile.propTypes = {
  // modelDescription: PropTypes.string.isRequired,
};

export default connect(stateToProps, dispatchToProps)(AddToCartMobile);
