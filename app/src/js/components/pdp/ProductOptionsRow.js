import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/* eslint-disable react/prefer-stateless-function */
class ProductOptionsRow extends PureComponent {
  rightNodeElem() {
    const { rightNode, handleClick } = this.props;
    if (rightNode) return rightNode;
    if (typeof handleClick === 'function') {
      return (
        <span onClick={handleClick} className="link">Add</span>
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
      heading,
      rightNode,
      handleClick,
    } = this.props;

    return (
      <div
        className={classNames(
          'ProductOptionsRow',
          'ProductOptions__ProductOptionsRow',
          'grid-spaceBetween',
          {
            'ProductOptionsRow--heading': heading,
          },
        )}
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
              'ProductOptionsRow__right--fade-in': optionIsSelected || heading || rightNode,
              'ProductOptionsRow__right--dark': optionIsSelected,
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
  heading: PropTypes.bool,
  optionIsSelected: PropTypes.bool,
  handleClick: PropTypes.func,
};

ProductOptionsRow.defaultProps = {
  leftNode: null,
  leftNodeClassName: '',
  rightNode: null,
  rightNodeClassName: '',
  optionIsSelected: false,
  heading: false,
  handleClick: null,
};

export default ProductOptionsRow;
