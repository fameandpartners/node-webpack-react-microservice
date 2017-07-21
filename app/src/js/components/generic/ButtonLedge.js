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
            'ButtonLedge__button-wrapper grid-center-middle-noGutter height--full',
          )}
        >
          {handleLeftButtonClick
            ? (
              <div className="col-6">
                <Button
                  secondary
                  text="Cancel"
                  handleClick={handleLeftButtonClick}
                />
              </div>
            )
            : null
          }

          {handleRightButtonClick
            ? (
              <div className="col-6">
                <Button
                  text="Save"
                  handleClick={handleRightButtonClick}
                />
              </div>
            )
            : null
          }
        </div>
      </div>
    );
  }
}

ButtonLedge.propTypes = {
  handleLeftButtonClick: PropTypes.func.isRequired,
  handleRightButtonClick: PropTypes.func.isRequired,
};

ButtonLedge.defaultProps = {
  handleLeftButtonClick: null,
  handleRightButtonClick: null,
};

export default ButtonLedge;
