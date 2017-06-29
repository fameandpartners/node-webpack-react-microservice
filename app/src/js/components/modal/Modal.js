/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import { node, object, oneOfType } from 'prop-types';

import Container from '../generic/Container';


// Component:Presentational
class Modal extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div
        className="Modal"
      >
        <Container>
          {children}
        </Container>
      </div>
    );
  }
}

Modal.propTypes = {
  children: oneOfType([object, node]).isRequired,
};

export default Modal;
