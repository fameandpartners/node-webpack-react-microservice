import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PinterestShareButton from '../react-share/PinterestShareButton';

// Components
import IconSVG from '../generic/IconSVG';

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
      externalLink,
    } = this.props;
    if (externalLink) {
      return (
        <a href={url}>
          <IconSVG
            svgPath={PinterestShareIcon.url}
            width="40px"
            height="40px"
          />
        </a>
      );
    }
    return (
      <PinterestShareButton
        url={url}
        className="SocialShare__icon-button"
        media={image}
      >
        <IconSVG
          svgPath={PinterestShareIcon.url}
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
  externalLink: PropTypes.bool,
};

PinterestIconShareButton.defaultProps = {
  externalLink: true,
};

export default PinterestIconShareButton;
