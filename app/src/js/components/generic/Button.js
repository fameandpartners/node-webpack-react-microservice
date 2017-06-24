// *****
// ** Button is a purely functional dumb/stateless component
// *****
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// CSS
import '../../../css/components/Button.scss';

const propTypes = {
  disabled: PropTypes.bool,
  text: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

const defaultProps = {
  disabled: false,
  text: 'Submit',
};

class Button extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (!this.props.disabled) {
      this.props.handleClick();
    }
  }

  render() {
    const { disabled, text, handleClick } = this.props;

    return (
      <button onClick={handleClick} className={`Button ${disabled ? 'Button--disabled' : ''}`}>
        {text}
      </button>
    );
  }
}


Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
