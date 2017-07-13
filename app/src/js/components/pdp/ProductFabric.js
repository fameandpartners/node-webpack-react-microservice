import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import fabricImg from '../../../img/test/fabric.png';

// CSS
import '../../../css/components/ProductFabric.scss';

/* eslint-disable react/prefer-stateless-function */
class ProductFabric extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleFabricInfoClick() {
    const {
      breakpoint,
      handleFabricInfoModalClick,
    } = this.props;

    console.log('this is the current breakpoint in fabric', breakpoint);
    if (breakpoint === 'mobile') { handleFabricInfoModalClick(); }
  }

  render() {
    const {
      fabric,
      // garmentCareInformation,
    } = this.props;
    console.log('fabric', fabric);
    return (
      <div
        className="ProductFabric position--relative height--full"
        style={{ background: `url(${fabricImg})` }}
      >
        <div className="ProductFabric__contents width--full position--absolute">
          <span
            className="u-underline"
            onClick={this.handleFabricInfoClick}
          >
              View Fabric Info
          </span>
        </div>

      </div>
    );
  }
}

ProductFabric.propTypes = {
  breakpoint: PropTypes.string.isRequired,
  fabric: PropTypes.shape({
    id: PropTypes.string,
    smallImg: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  // garmentCareInformation: PropTypes.string.isRequired,
  handleFabricInfoModalClick: PropTypes.func.isRequired,
};
ProductFabric.defaultProps = {};

export default ProductFabric;
// <div>
//   <h4>Garment Care</h4>
//   <span>{garmentCareInformation}</span>
// </div>
// <span>{fabric.description}</span>
