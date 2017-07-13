import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import fabricImg from '../../../img/test/fabric.png';

/* eslint-disable react/prefer-stateless-function */
class ProductFabric extends PureComponent {

  render() {
    const { fabric, garmentCareInformation } = this.props;
    console.log('garmentCareInformation', garmentCareInformation);
    console.log('fabric', fabric);
    return (
      <div
        className="ProductFabric height--full"
        style={{ background: `url(${fabricImg})` }}
      />
    );
  }
}

ProductFabric.propTypes = {
  fabric: PropTypes.shape({
    id: PropTypes.string,
    smallImg: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  garmentCareInformation: PropTypes.string.isRequired,
};
ProductFabric.defaultProps = {};

export default ProductFabric;
