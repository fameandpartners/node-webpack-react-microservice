import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import noop from '../../libs/noop';

// Decorators
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

function stateToProps() {
  return {};
}

function dispatchToProps() {
  return {};
}

class FabricSwatchProduct extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleOnClick() {
    this.props.handleSwatchSelection(this.props.swatch);
  }

  productDisplayText() {
    const { swatch, breakpoint } = this.props;
    if (breakpoint === 'mobile' || breakpoint === 'tablet') {
      return swatch.color_name;
    }
    return `${swatch.color_name} $${Math.floor(swatch.price)}`;
  }

  render() {
    const { swatch, isOrdered } = this.props;

    return (
      <div className="FabricSwatchProductCell u-mb-normal">
        <div
          className={classnames('FabricSwatchProductWrapper',
            {
              selected: isOrdered,
            },
          )}
        >
          <div
            className="FabricSwatchProduct"
            style={{ backgroundColor: swatch.color_hex }}
            onClick={this.handleOnClick}
          >
            <img
              className="FabricSwatchProductImage"
              src={swatch.color_image_url}
              alt={`Swatch ${swatch.color_name}`}
            />
          </div>
        </div>
        <span className="FabricSwatchProductDetails">
          {this.productDisplayText()}
        </span>
      </div>
    );
  }
}

FabricSwatchProduct.propTypes = {
  swatch: PropTypes.shape({
    variant_id: PropTypes.number,
    product_id: PropTypes.number,
    sku: PropTypes.string,
    color_name: PropTypes.string,
    color_id: PropTypes.number,
    color_hex: PropTypes.string,
    color_image_url: PropTypes.string,
    price: PropTypes.float,
  }).isRequired,
  handleSwatchSelection: PropTypes.func.isRequired,
  isOrdered: PropTypes.bool,
  breakpoint: PropTypes.string.isRequired,
};

FabricSwatchProduct.defaultProps = {
  swatch: {},
  handleSwatchSelection: noop,
  isOrdered: false,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(FabricSwatchProduct));
