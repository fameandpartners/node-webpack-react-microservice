import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ShareButtons } from '../../libs/react-share/react-share';

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
    } = this.props;

    const {
      TwitterShareButton,
    } = ShareButtons;

    return (
      <TwitterShareButton
        url={url}
        className="ShareModal__icon-button"
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
};

export default TwitterIconShareButton;
