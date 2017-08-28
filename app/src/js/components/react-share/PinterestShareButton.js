import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import ShareButton from './ShareButton';

export default class PinterestShareButton extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  optsMap() {
    return ({});
  }

  render() {
    const {
      children,
      className,
      disabled,
      disabledStyle,
      // opts,
      url,
      style,
      windowWidth,
      windowHeight,
      media,
      description,
    } = this.props;

    return (
      <ShareButton
        className={className}
        disabled={disabled}
        disabledStyle={disabledStyle}
        network="pinterest"
        opts={this.optsMap(this.props)}
        url={url}
        style={style}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        media={media}
        description={description}
      >
        {children}
      </ShareButton>
    );
  }

}

/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
PinterestShareButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  disabledStyle: PropTypes.object,
  // network: PropTypes.oneOf(supportedNetworks),
  // opts: PropTypes.object,
  url: PropTypes.string.isRequired,
  style: PropTypes.object,
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number,
  media: PropTypes.string,
  description: PropTypes.string,
};

PinterestShareButton.defaultProps = {
  media: '',
  description: '',
  windowWidth: 1000,
  windowHeight: 730,
};
