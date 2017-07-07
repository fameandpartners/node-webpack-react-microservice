import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from '../../libs/noop';

/* eslint-disable react/prefer-stateless-function */
class ProductOptionsRow extends PureComponent {
  render() {
    const {
      leftNode,
      leftNodeClassName,
      rightNode,
      rightNodeClassName,
      handleClick,
    } = this.props;

    return (
      <div
        className="ProductOptionsRow ProductOptions__ProductOptionsRow grid-spaceBetween"
        onClick={handleClick}
      >
        <span
          className={classNames(
            'ProductOptionsRow--left textAlign--left',
            leftNodeClassName,
          )}
        >
          {leftNode}
        </span>

        <span
          className={classNames(
            'ProductOptionsRow--right textAlign--right',
            rightNodeClassName,
          )}
        >
          {rightNode}
        </span>
      </div>
    );
  }
}

ProductOptionsRow.propTypes = {
  leftNode: PropTypes.node,
  leftNodeClassName: PropTypes.string,
  rightNode: PropTypes.node,
  rightNodeClassName: PropTypes.string,
  handleClick: PropTypes.func,
};

ProductOptionsRow.defaultProps = {
  leftNode: null,
  leftNodeClassName: '',
  rightNode: null,
  rightNodeClassName: '',
  handleClick: noop,
};

export default ProductOptionsRow;
