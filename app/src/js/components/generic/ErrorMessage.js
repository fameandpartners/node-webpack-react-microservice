import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// CSS
import '../../../css/components/ErrorMessage.scss';


/* eslint-disable react/prefer-stateless-function */
class ErrorMessage extends PureComponent {
  render() {
    const {
      message,
      displayCondition,
    } = this.props;

    let utilSpace = null;

    if (displayCondition) {
      utilSpace = (
        <p className="ErrorMessage__wrapper">
          {message}
        </p>
      );
    }

    return utilSpace;
  }
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  displayCondition: PropTypes.bool.isRequired,
};

ErrorMessage.defaultProps = {
};

export default ErrorMessage;
