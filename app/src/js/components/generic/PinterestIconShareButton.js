import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PinterestShareButton from '../react-share/PinterestShareButton';

// Assets
import PinterestShareIcon from '../../../svg/share-pinterest.svg';

// CSS
import '../../../css/components/SocialShareIconButton.scss';


/* eslint-disable react/prefer-stateless-function */
class PinterestIconShareButton extends PureComponent {
  render() {
    const {
      url,
      image,
    } = this.props;

    return (
      <PinterestShareButton
        url={url}
        className="SocialShare__icon-button"
        media={image}
      >
        <PinterestShareIcon
          width="40px"
          height="40px"
        />
      </PinterestShareButton>
    );
  }
}

PinterestIconShareButton.propTypes = {
  url: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default PinterestIconShareButton;
