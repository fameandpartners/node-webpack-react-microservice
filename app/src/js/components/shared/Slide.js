/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Slide extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <div
        className={classnames(
        'Slide u-height--full',
        'Slide--full',
      )}
      >
        { children }
      </div>
    );
  }
}

Slide.propTypes = {
  children: PropTypes.node.isRequired,
};

Slide.defaultProps = {
};

export default Slide;
