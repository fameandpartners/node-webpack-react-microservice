import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      metaIcon,
      secondary,
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
              'Button--secondary': secondary,
              'Button--disabled': disabled,
              'Button--tall': tall,
            },
          )
        }
      >
        { metaIcon
          ? <span className="Button__meta">{metaIcon}</span>
          : null
        }
        <span>{text}</span>
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  metaIcon: PropTypes.node,
  secondary: PropTypes.bool,
  tall: PropTypes.bool,
  text: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  className: '',
  disabled: false,
  metaIcon: null,
  secondary: false,
  tall: false,
  text: 'Submit',
};

export default Button;
