import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

// Breakpoint Decoration
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// UI
import ButtonLedge from '../generic/ButtonLedge';
import AddToCartButton from './AddToCartButton';

class AddToCartButtonLedgeMobile extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { breakpoint } = this.props;
    return (breakpoint === 'tablet' || breakpoint === 'mobile')
    ? (
      <div className="AddToCartButtonLedgeMobile">
        <ButtonLedge
          leftText="Your Size"
          rightNode={(<AddToCartButton />)}
          handleLeftButtonClick={() => {}}
          handleRightButtonClick={this.handleAddToBag}
        />
      </div>
    ) : null;
  }
}

/*  eslint-disable react/forbid-prop-types */
AddToCartButtonLedgeMobile.propTypes = {
  // Decorator Props
  breakpoint: PropTypes.string.isRequired,
};

AddToCartButtonLedgeMobile.defaultProps = {
  selectedAddonOptions: [],
};

export default Resize(PDPBreakpoints)(AddToCartButtonLedgeMobile);
