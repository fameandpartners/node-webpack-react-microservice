import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TwitterShareButton from '../react-share/TwitterShareButton';

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

    return (
      <TwitterShareButton
        url={url}
        className="SocialShare__icon-button"
      >
        <TwitterShareIcon
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
