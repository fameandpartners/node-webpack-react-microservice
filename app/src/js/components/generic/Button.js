import React, { Component } from 'react';
import { bool, string, func } from 'prop-types';
import classNames from 'classnames';

// CSS
import '../../../css/components/Button.scss';

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
    const {
      className,
      disabled,
      tall,
      text,
      handleClick,
    } = this.props;

    return (
      <button
        onClick={handleClick}
        className={
          classNames(
            'Button',
            className,
            {
              'Button--disabled': disabled,
              'Button--tall': tall,
            },
          )
        }
      >
        {text}
      </button>
    );
  }
}

Button.propTypes = {
  className: string,
  disabled: bool,
  tall: bool,
  text: string,
  handleClick: func.isRequired,
};

Button.defaultProps = {
  className: '',
  tall: false,
  disabled: false,
  text: 'Submit',
};

export default Button;
