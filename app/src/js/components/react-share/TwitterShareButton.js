import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import ShareButton from './ShareButton';

export default class TwitterShareButton extends Component {
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
      hashtags,
      title,
      via,
    } = this.props;

    return (
      <ShareButton
        className={className}
        disabled={disabled}
        disabledStyle={disabledStyle}
        network="twitter"
        opts={this.optsMap(this.props)}
        url={url}
        style={style}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        hashtags={hashtags}
        title={title}
        via={via}
      >
        {children}
      </ShareButton>
    );
  }

}

/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
TwitterShareButton.propTypes = {
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
  hashtags: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  via: PropTypes.string,
};

TwitterShareButton.defaultProps = {
  hashtags: [],
  title: '',
  via: '',
  windowWidth: 550,
  windowHeight: 400,
};
