// *****
// ** Button is a purely functional dumb/stateless component
// *****
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from '../../libs/noop';

// CSS
import '../../../css/components/Button.scss';

const propTypes = {
  disabled: PropTypes.bool,
  text: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {
  disabled: false,
  text: 'Submit',
  onClick: noop,
};

class Button extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (!this.props.disabled) {
      this.props.onClick();
    }
  }

  render() {
    const { disabled, text, onClick } = this.props;

    return (
      <button onClick={onClick} className={`Button ${disabled ? 'Button--disabled' : ''}`}>
        {text}
      </button>
    );
  }
}


Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
