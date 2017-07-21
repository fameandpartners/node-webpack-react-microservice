import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

// UI Components
import Button from '../generic/Button';

class ButtonLedge extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { handleLeftButtonClick, handleRightButtonClick } = this.props;
    return (
      <div className="ButtonLedge">
        <div
          className={classnames(
            'ButtonLedge__button-wrapper grid-middle-noGutter height--full',
          )}
        >
          <div className="col-6">
            <Button
              secondary
              text="Cancel"
              handleClick={handleLeftButtonClick}
            />
          </div>
          <div className="col-6">
            <Button
              text="Save"
              handleClick={handleRightButtonClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

ButtonLedge.propTypes = {
  handleLeftButtonClick: PropTypes.func.isRequired,
  handleRightButtonClick: PropTypes.func.isRequired,
};

ButtonLedge.defaultProps = {};

export default ButtonLedge;
