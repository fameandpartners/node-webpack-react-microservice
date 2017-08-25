import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import classNames from 'classnames';

// Components
import IconSVG from '../generic/IconSVG';

// CSS
import '../../../css/components/IconButton.scss';

class IconButton extends Component {
  constructor(props) {
    super(props);

    autobind(this);
  }

  render() {
    const {
      className,
      handleClick,
      svgPath,
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
        <IconSVG
          svgPath={svgPath}
          width={width}
          height={height}
        />
      </button>
    );
  }
}

IconButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  svgPath: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

IconButton.defaultProps = {
  className: '',
  width: '40px',
  height: '40px',
};

export default IconButton;
