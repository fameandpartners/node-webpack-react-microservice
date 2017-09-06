/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Slide extends PureComponent {
  render() {
    const { children, addPadding } = this.props;

    return (
      <div
        className={classnames(
        'Slide u-height--full',
        'Slide--full',
          {
            'Slide--largePadding': addPadding,
          },
      )}
      >
        { children }
      </div>
    );
  }
}

Slide.propTypes = {
  children: PropTypes.node.isRequired,
  addPadding: PropTypes.boolean,
};

Slide.defaultProps = {
  addPadding: false,
};

export default Slide;
