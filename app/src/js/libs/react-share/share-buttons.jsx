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

      const windowOpenBound = () => windowOpen(this.link(), windowOptions);

      windowOpenBound();
    }
  }

  onKeyPress(e) {
    if (e.key === 'Enter' || e.key === 13) {
      this.onClick(e);
    }
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

function createShareButton(network, optsMap = () => ({}), propTypes, defaultProps = {}) {
  const CreatedButton = props => (
    <ShareButton
      {...props}
      network={network}
      opts={optsMap(props)}
    />
  );

  CreatedButton.propTypes = propTypes;
  CreatedButton.defaultProps = defaultProps;

  return CreatedButton;
}

export const FacebookShareButton = createShareButton('facebook', (props) => {
  /* eslint-disable no-console */
  if (props.picture) {
    console.warn('FacebookShareButton warning: picture is a deprecated prop.');
  }

  if (props.title) {
    console.warn('FacebookShareButton warning: title is a deprecated prop. Use "quote" instead.');
  }

  if (props.description) {
    console.warn(`FacebookShareButton warning: description is a deprecated prop.
      Use "quote" instead.`);
  }
  /* eslint-enable no-console */

  return {
    quote: props.quote,
    hashtag: props.hashtag,
  };
}, {
  quote: PropTypes.string,
  hashtag: PropTypes.string,
}, {
  windowWidth: 550,
  windowHeight: 400,
});

export const TwitterShareButton = createShareButton('twitter', props => ({
  hashtags: props.hashtags,
  title: props.title,
  via: props.via,
}), {
  hashtags: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  via: PropTypes.string,
}, {
  windowWidth: 550,
  windowHeight: 400,
});

export const PinterestShareButton = createShareButton('pinterest', props => ({
  media: props.media,
  description: props.description,
}), {
  media: PropTypes.string.isRequired,
  description: PropTypes.string,
}, {
  windowWidth: 1000,
  windowHeight: 730,
});
