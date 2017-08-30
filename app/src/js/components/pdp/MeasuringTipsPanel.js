import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
class MeasuringTipsPanel extends PureComponent {
  render() {
    return (
      <div>
        <h2>I'm from the MeasuringTipsPanel component.</h2>
        <p>Line Two</p>
        <p>Third Child</p>
      </div>
    );
  }

}
MeasuringTipsPanel.propTypes = {
  // className: PropTypes.string,
};

export default MeasuringTipsPanel;
