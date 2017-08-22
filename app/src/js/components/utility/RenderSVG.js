import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import platform from 'platform';

class RenderSVG extends Component {
  constructor(props) {
    super(props);

    autobind(this);
  }

  notSafari() {
    return platform.name !== 'Safari';
  }

  render() {
    const {
      svgPath,
      altText,
      width,
      height,
    } = this.props;

    return (
        this.notSafari() ?
        (
          <img
            src={svgPath}
            alt={altText}
            width={width}
            height={height}
          />
        )
        :
        (
          <object
            data={svgPath}
            type="image/svg+xml"
            alt={altText}
            width={width}
            height={height}
          />
        )
    );
  }
}

RenderSVG.propTypes = {
  svgPath: PropTypes.string,
  altText: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

RenderSVG.defaultProps = {
  svgPath: '',
  altText: '',
  width: '40px',
  height: '40px',
};


export default RenderSVG;
