import React, { Component } from 'react';
import autoBind from 'react-autobind';
// import PropTypes from 'prop-types';

import InstagramIcon from '../../../svg/i-instagram.svg';
import FacebookIcon from '../../../svg/i-facebook.svg';
import TwitterIcon from '../../../svg/i-twitter.svg';
import PinterestIcon from '../../../svg/i-pinterest.svg';
import TumblrIcon from '../../../svg/i-tumblr.svg';
import PolyvoreIcon from '../../../svg/i-polyvore.svg';

// CSS
import '../../../css/components/SocialLinks.scss';

class SocialLinks extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <div className="SocialLinks u-text-align--left">
        <div className="icon">
          <a target="_blank" rel="noopener noreferrer" href="https://instagram.com/FameandPartners">
            <InstagramIcon height="28" width="28" />
          </a>
        </div>

        <div className="icon">
          <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/FameandPartners">
            <FacebookIcon height="28" width="28" />
          </a>
        </div>

        <div className="icon">
          <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/FameandPartners">
            <TwitterIcon height="28" width="28" />
          </a>
        </div>

        <div className="icon">
          <a target="_blank" rel="noopener noreferrer" href="https://www.pinterest.com/fameandpartners">
            <PinterestIcon height="28" width="28" />
          </a>
        </div>

        <div className="icon">
          <a target="_blank" rel="noopener noreferrer" href="http://fameandpartners.tumblr.com/">
            <TumblrIcon height="28" width="28" />
          </a>
        </div>

        <div className="icon">
          <a target="_blank" rel="noopener noreferrer" href="http://fameandpartners.polyvore.com/">
            <PolyvoreIcon height="28" width="28" />
          </a>
        </div>
      </div>
    );
  }
}

SocialLinks.propTypes = {};

SocialLinks.defaultProps = {};

export default SocialLinks;
