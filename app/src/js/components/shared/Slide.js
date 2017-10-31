/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Slide extends PureComponent {
  render() {
    const { children, fullSlide } = this.props;

    return (
      <li
        className={classnames(
          'Slide u-height--full',
          {
            'Slide--full': fullSlide,
          },
        )}
      >
        { children }
      </li>
    );
  }
}

Slide.propTypes = {
  fullSlide: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Slide.defaultProps = {
  fullSlide: false,
};

export default Slide;
