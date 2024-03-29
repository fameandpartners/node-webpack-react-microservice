import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/* eslint-disable react/prefer-stateless-function */
class ProductFabricInfo extends PureComponent {
  render() {
    const {
      className,
      fabric,
      garmentCareInformation,
    } = this.props;
    return (

      <div
        className={classnames([
          'ProductFabricInfo',
          className,
        ])}
      >
        <div className="u-mb--normal">
          <h4 className="u-mb-xs">Fabric</h4>
          {fabric.description.split('\n').map(
            (item, key) =>
              <span key={`fd-${key}`}>{item}<br /></span>,
            )
          }
          <span>
            Due to dyeing process, product hue may<br />
            look slightly different from image.
          </span>
        </div>
        <h4 className="u-mb-xs">Garment Care</h4>
        {garmentCareInformation.split('\n').map(
          (item, key) =>
            <span key={`fd-${key}`}>{item}<br /></span>,
          )
        }
      </div>
    );
  }
}

ProductFabricInfo.propTypes = {
  className: PropTypes.string,
  fabric: PropTypes.shape({
    id: PropTypes.string,
    smallImg: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  garmentCareInformation: PropTypes.string.isRequired,
};

ProductFabricInfo.defaultProps = {
  className: '',
};

export default ProductFabricInfo;
