/* eslint-disable react/prefer-stateless-function */
// Component:Presentational
import React, { PureComponent } from 'react';
import { array, node, oneOfType } from 'prop-types';

class Container extends PureComponent {
  render() {
    return (
      <div
        className="Container"
      >
        {this.props.children}
      </div>
    );
  }
}

Container.propTypes = {
  children: oneOfType([array, node]).isRequired,
};

export default Container;
