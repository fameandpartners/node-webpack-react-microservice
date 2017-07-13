import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

// UI Components
import Slider from '../shared/Slider';
import Slide from '../shared/Slide';
import ProductFabric from './ProductFabric';

// // TEST IMAGES
// import image1 from '../../../img/test/image_1.png';
import image1 from '../../../img/test/image_1.png';
import image2 from '../../../img/test/image_2.png';
import image3 from '../../../img/test/image_3.png';
import image4 from '../../../img/test/image_4.png';
import image5 from '../../../img/test/image_5.png';
import image6 from '../../../img/test/image_6.png';
import image7 from '../../../img/test/image_7.png';


// Actions
// import * as AppActions from '../../actions/AppActions';

// CSS
import '../../../css/components/ProductDisplayOptionsTouch.scss';


function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    fabric: state.$$productState.get('fabric'),
    garmentCareInformation: state.$$productState.get('garmentCareInformation'),
  };
}

class ProductDisplayOptionsTouch extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  generateBackgroundImageStyle(url) {
    return {
      background: `url(${url})`,
      backgroundSize: 'cover',
    };
  }

  render() {
    const { fabric, garmentCareInformation } = this.props;
    return (
      <div className="ProductDisplayOptionsTouch">
        <Slider>
          <Slide>
            <div
              className="width--full height--full"
              style={this.generateBackgroundImageStyle(image1)}
            />
          </Slide>
          <Slide>
            <div
              className="width--full height--full"
              style={this.generateBackgroundImageStyle(image2)}
            />
          </Slide>

          <Slide>
            <ProductFabric fabric={fabric} garmentCareInformation={garmentCareInformation} />
          </Slide>

          <Slide>
            <div
              className="width--full height--full"
              style={this.generateBackgroundImageStyle(image3)}
            />
          </Slide>
          <Slide>
            <div
              className="width--full height--full"
              style={this.generateBackgroundImageStyle(image4)}
            />
          </Slide>
          <Slide>
            <div
              className="width--full height--full"
              style={this.generateBackgroundImageStyle(image5)}
            />
          </Slide>
          <Slide>
            <div
              className="width--full height--full"
              style={this.generateBackgroundImageStyle(image6)}
            />
          </Slide>
          <Slide>
            <div
              className="width--full height--full"
              style={this.generateBackgroundImageStyle(image7)}
            />
          </Slide>

        </Slider>
        <div className="ProductDisplayOptionsTouch__options App--mb-normal App--mt-normal">
          <div className="ProductDisplayOptionsTouch__option display--inline-block">
            <span>Fabric & Color</span><br />
            <span>**SELECTION**</span>
          </div>
          <div className="ProductDisplayOptionsTouch__option display--inline-block">
            <span>Style Addons</span><br />
            <span>**SELECTION**</span>
          </div>
        </div>
      </div>
    );
  }
}

ProductDisplayOptionsTouch.propTypes = {
  fabric: PropTypes.shape({
    id: PropTypes.string,
    smallImg: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  garmentCareInformation: PropTypes.string,
};
ProductDisplayOptionsTouch.defaultProps = {
  garmentCareInformation: 'Professional dry-clean only.\rSee label for further details.',
};

export default connect(stateToProps)(ProductDisplayOptionsTouch);
