import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import ShareButton from './ShareButton';

export default class FacebookShareButton extends Component {
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
      quote,
      hashtag,
    } = this.props;

    return (
      <ShareButton
        className={className}
        disabled={disabled}
        disabledStyle={disabledStyle}
        network="facebook"
        opts={this.optsMap(this.props)}
        url={url}
        style={style}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        quote={quote}
        hashtag={hashtag}
      >
        {children}
      </ShareButton>
    );
  }

}

/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
FacebookShareButton.propTypes = {
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
  quote: PropTypes.string,
  hashtag: PropTypes.string,
};

FacebookShareButton.defaultProps = {
  quote: '',
  hashtag: '',
  windowWidth: 550,
  windowHeight: 400,
};
