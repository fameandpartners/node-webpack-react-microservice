import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import LoadingSpinner from './LoadingSpinner';
// CSS
import '../../../css/components/Button.scss';

class Button extends PureComponent {
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
      isLoading,
      metaIcon,
      secondary,
      selected,
      square,
      tall,
      tertiary,
      text,
      uppercase,
      handleClick,
      passedRef,
    } = this.props;

    return (
      <button
        ref={passedRef}
        onClick={handleClick}
        className={
          classnames(
            'Button',
            className,
            {
              'Button--secondary': secondary,
              'Button--selected': selected,
              'Button--disabled': disabled,
              'Button--square': square,
              'Button--tall': tall,
              'Button--tertiary': tertiary,
              'Button--uppercase': uppercase,
            },
          )
        }
      >
        { metaIcon
          ? <span className="Button__meta">{metaIcon}</span>
          : null
        }
        { isLoading
          ? <LoadingSpinner />
          : <span>{text}</span>
        }
      </button>
    );
  }
}

Button.propTypes = {
  passedRef: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  metaIcon: PropTypes.node,
  isLoading: PropTypes.bool,
  secondary: PropTypes.bool,
  selected: PropTypes.bool,
  square: PropTypes.bool,
  tall: PropTypes.bool,
  tertiary: PropTypes.bool,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  uppercase: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  passedRef: null,
  className: '',
  disabled: false,
  isLoading: false,
  metaIcon: null,
  secondary: false,
  selected: false,
  square: false,
  tall: false,
  text: 'Submit',
  tertiary: false,
  uppercase: false,
};

export default Button;
