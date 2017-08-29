import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TwitterShareButton from '../react-share/TwitterShareButton';

// Components
import IconSVG from '../generic/IconSVG';

// Assets
import TwitterShareIcon from '../../../svg/share-twitter.svg';

// CSS
import '../../../css/components/SocialShareIconButton.scss';


/* eslint-disable react/prefer-stateless-function */
class TwitterIconShareButton extends PureComponent {
  render() {
    const {
      url,
      externalLink,
    } = this.props;
    if (externalLink) {
      return (
        <a href={url}>
          <IconSVG
            svgPath={TwitterShareIcon.url}
            width="40px"
            height="40px"
          />
        </a>
      );
    }
    return (
      <TwitterShareButton
        url={url}
        className="SocialShare__icon-button"
      >
        <IconSVG
          svgPath={TwitterShareIcon.url}
          width="40px"
          height="40px"
        />
      </TwitterShareButton>
    );
  }
}

TwitterIconShareButton.propTypes = {
  url: PropTypes.string.isRequired,
  externalLink: PropTypes.bool,
};

TwitterIconShareButton.defaultProps = {
  externalLink: false,
};

export default TwitterIconShareButton;
