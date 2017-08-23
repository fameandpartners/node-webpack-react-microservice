import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// // TEST IMAGES
// import image1 from '../../../img/test/image_1.png';
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

class ProductGrid extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <div className="ProductGrid">
        <div className="App__photo-montage masonry grid-12">
          <div className="col-6">
            <div className="brick">
              <img className="u-width--full" alt="dress2" src={image2} />
            </div>
            <div className="brick">
              <img className="u-width--full" alt="dress3" src={image3} />
            </div>
            <div className="brick">
              <img className="u-width--full" alt="dress4" src={image4} />
            </div>
          </div>
          <div className="col-6">
            <div className="brick">
              <img className="u-width--full" alt="dress5" src={image5} />
            </div>
            <div className="brick">
              <img className="u-width--full" alt="dress6" src={image6} />
            </div>
            <div className="brick">
              <img className="u-width--full" alt="dress7" src={image7} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductGrid.propTypes = {
  // sideMenuOpen: PropTypes.bool,
};

ProductGrid.defaultProps = {
  // sideMenuOpen: false,
};

export default ProductGrid;
