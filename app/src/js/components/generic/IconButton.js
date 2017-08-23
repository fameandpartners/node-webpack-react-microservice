import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import classNames from 'classnames';

// Components
import RenderSVG from '../utility/RenderSVG';

// CSS
import '../../../css/components/IconButton.scss';

class IconButton extends Component {
  constructor(props) {
    super(props);

    autobind(this);
  }

  handleClick() {
    if (!this.props.disabled) {
      this.props.handleClick();
    }
  }

  render() {
    const {
      className,
      handleClick,
      svgPath,
      altText,
      width,
      height,
    } = this.props;

    return (
      <button
        onClick={handleClick}
        className={
          classNames(
            'IconButton',
            className,
          )
        }
      >
        <RenderSVG
          svgPath={svgPath}
          altText={altText}
          width={width}
          height={height}
        />
      </button>
    );
  }
}

IconButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  svgPath: PropTypes.string,
  altText: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

IconButton.defaultProps = {
  className: '',
  disabled: false,
  svgPath: '',
  altText: '',
  width: '',
  height: '',
};

export default IconButton;
