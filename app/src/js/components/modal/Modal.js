/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';

// Utilities
import noop from '../../libs/noop';

// Components
import CancelOut from '../shared/CancelOut';
import Container from '../generic/Container';

// Component:Presentational
class Modal extends PureComponent {
  render() {
    const {
      children,
      handleCloseModal,
      headline,
    } = this.props;

    return (
      <div
        className="Modal"
      >
        <div className="Modal__header">
          <div className="Modal__content--sm-margin-bottom u-text-align-right">
            <CancelOut onClick={handleCloseModal} />
          </div>
          <div className="Modal__content--med-margin-bottom">
            <h3 className="h5">{headline}</h3>
          </div>
        </div>
        <Container className="Modal__content">
          {children}
        </Container>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.node]).isRequired,
  handleCloseModal: PropTypes.func,
  headline: PropTypes.string,
};

Modal.defaultProps = {
  headline: null,
  handleCloseModal: noop,
};

export default Modal;
