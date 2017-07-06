import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { lory } from 'lory.js';
import win from '../../polyfills/windowPolyfill';

// CSS
import '../../../css/components/Slider.scss';

// TEST IMAGES
import image1 from '../../../img/test/image_1.png';
import image2 from '../../../img/test/image_2.png';
import image3 from '../../../img/test/image_3.png';
import image4 from '../../../img/test/image_4.png';
import image5 from '../../../img/test/image_5.png';
import image6 from '../../../img/test/image_6.png';
import image7 from '../../../img/test/image_7.png';

class Slider extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    if (win.document.querySelector) {
      const simple = win.document.querySelector('.js_slider');

      lory(simple, {
        infinite: 1,
      });
    }
  }

  render() {
    return (
      <div className="Slider u-full-width">
        <div className="slider js_slider">
          <div className="frame js_frame">
            <ul className="slides js_slides">
              <img alt="dress2" src={image1} />
              <img alt="dress2" src={image2} />
              <img alt="dress3" src={image3} />
              <img alt="dress4" src={image4} />
              <img alt="dress4" src={image5} />
              <img alt="dress4" src={image6} />
              <img alt="dress4" src={image7} />
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  sideMenuOpen: PropTypes.bool,
};

Slider.defaultProps = {
  sideMenuOpen: false,
};

export default Slider;
