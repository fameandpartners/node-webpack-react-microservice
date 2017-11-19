/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';

// CSS
import '../../../css/components/BackArrow.scss';

export default class BackArrow extends PureComponent {
  render() {
    return (
      <div
        className="BackArrow"
        role="button"
        {...this.props}
      />
    );
  }
}
