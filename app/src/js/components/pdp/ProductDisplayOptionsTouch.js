import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// UI Components
import Slider from '../shared/Slider';
import Slide from '../shared/Slide';

// // TEST IMAGES
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
// import '../../../css/components/ProductDisplayOptionsTouch.scss';

// Assets


// function stateToProps(state) {
//   // Which part of the Redux global state does our component want to receive as props?
//   return {
//     sideMenuOpen: state.$$appState.get('sideMenuOpen'),
//   };
// }
//
// function dispatchToProps(dispatch) {
//   const actions = bindActionCreators(AppActions, dispatch);
//   return {
//     activateSideMenu: actions.activateSideMenu,
//   };
// }

class ProductDisplayOptionsTouch extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <div className="ProductDisplayOptionsTouch">
        <Slider>
          <Slide><img className="width--full" alt="dress2" src={image1} /></Slide>
          <Slide><img className="width--full" alt="dress2" src={image2} /></Slide>
          <Slide><img className="width--full" alt="dress3" src={image3} /></Slide>
          <Slide><img className="width--full" alt="dress4" src={image4} /></Slide>
          <Slide><img className="width--full" alt="dress4" src={image5} /></Slide>
          <Slide><img className="width--full" alt="dress4" src={image6} /></Slide>
          <Slide><img className="width--full" alt="dress4" src={image7} /></Slide>
        </Slider>
      </div>
    );
  }
}

ProductDisplayOptionsTouch.propTypes = {
  // sideMenuOpen: PropTypes.bool,
};

ProductDisplayOptionsTouch.defaultProps = {
  // sideMenuOpen: false,
};

export default ProductDisplayOptionsTouch;
