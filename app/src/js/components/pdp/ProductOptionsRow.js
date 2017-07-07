import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from '../../libs/noop';

/* eslint-disable react/prefer-stateless-function */
class ProductOptionsRow extends PureComponent {
  rightNodeElem() {
    const { rightNode, handleClick } = this.props;
    if (rightNode) return rightNode;
    if (handleClick) {
      return (
        <span handleClick={handleClick} className="link">Add</span>
      );
    }
    return null;
  }

  render() {
    const {
      leftNode,
      leftNodeClassName,
      rightNodeClassName,
      optionIsSelected,
      header,
      handleClick,
    } = this.props;

    return (
      <div
        className="ProductOptionsRow ProductOptions__ProductOptionsRow grid-spaceBetween"
        onClick={handleClick}
      >
        <span
          className={classNames(
            'ProductOptionsRow__left textAlign--left',
            leftNodeClassName,
          )}
        >
          {leftNode}
        </span>

        <span
          className={classNames(
            'ProductOptionsRow__right textAlign--right',
            rightNodeClassName,
            {
              'ProductOptionsRow__right--fade-in': optionIsSelected || header,
            },
          )}
        >
          {this.rightNodeElem()}
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
  header: PropTypes.bool,
  optionIsSelected: PropTypes.bool,
  handleClick: PropTypes.func,
};

ProductOptionsRow.defaultProps = {
  leftNode: null,
  leftNodeClassName: '',
  rightNode: null,
  rightNodeClassName: '',
  optionIsSelected: false,
  header: false,
  handleClick: noop,
};

export default ProductOptionsRow;
