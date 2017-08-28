/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import classnames from 'classnames';
import * as links from './social-media-share-links';
import { windowOpen } from './utils';


const supportedNetworks = Object.keys(links);

export default class ShareButton extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  onClick(e) {
    const {
      disabled,
      windowWidth,
      windowHeight,
    } = this.props;

    if (!disabled) {
      e.preventDefault();

      const windowOptions = {
        height: windowHeight,
        width: windowWidth,
      };

      this.handleWindowOpen(this.link(), windowOptions);
    }
  }

  onKeyPress(e) {
    if (e.key === 'Enter' || e.key === 13) {
      this.onClick(e);
    }
  }

  handleWindowOpen(link, options) {
    windowOpen(link, options);
  }

  link() {
    const { url, opts, network } = this.props;
    return links[network](url, opts);
  }

  render() {
    const {
      children,
      className,
      disabled,
      disabledStyle,
      network,
      style,
    } = this.props;

    const classes = classnames(
      'SocialMediaShareButton',
      `SocialMediaShareButton--${network}`,
      {
        'SocialMediaShareButton--disabled': disabled,
        disabled,
      },
      className,
    );

    return (
      <div
        role="button"
        tabIndex="0"
        onClick={this.onClick}
        onKeyPress={this.onKeyPress}
        className={classes}
        style={{
          ...style,
          ...(disabled ? disabledStyle : {}),
        }}
      >
        {children}
      </div>
    );
  }
}

/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
ShareButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  disabledStyle: PropTypes.object,
  network: PropTypes.oneOf(supportedNetworks),
  opts: PropTypes.object,
  url: PropTypes.string.isRequired,
  style: PropTypes.object,
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number,
};

ShareButton.defaultProps = {
  disabled: false,
  disabledStyle: {
    opacity: 0.6,
  },
};
