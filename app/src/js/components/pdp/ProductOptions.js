import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// UI components
import ProductOptionsRow from './ProductOptionsRow';

// TEST IMAGES
import image1 from '../../../img/test/image_1.png';

// Actions
// import * as AppActions from '../../actions/AppActions';

// CSS
import '../../../css/components/ProductOptions.scss';

// Assets


function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    productTitle: state.$$productState.get('productTitle'),
  };
}

function dispatchToProps() {
  return {};
  // const actions = bindActionCreators(AppActions, dispatch);
  // return {
  //   activateSideMenu: actions.activateSideMenu,
  // };
}

class ProductOptions extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { productTitle } = this.props;
    return (
      <div className="ProductOptions grid-12">
        <div className="App__primary-image-container brick col-6">
          <img className="width--full" alt="dress1" src={image1} />
        </div>
        <div className="ProductOptions__col grid-middle col-6 u-center">
          <div className="ProductOptions__container">
            <div className="ProductOptions__content typography">
              <ProductOptionsRow
                header
                leftNode={<h1 className="display--inline h4">{productTitle}</h1>}
                leftNodeClassName="ProductOptionsRow--heading"
                rightNode={<span className="h4">$240</span>}
              />
              <ProductOptionsRow
                leftNode={<span>Color</span>}
                leftNodeClassName="u-uppercase"
                optionIsSelected={false}
              />
              <ProductOptionsRow
                leftNode={<span>Length</span>}
                leftNodeClassName="u-uppercase"
                optionIsSelected={false}
              />
              <ProductOptionsRow
                leftNode={<span>Style Addons</span>}
                leftNodeClassName="u-uppercase"
                optionIsSelected={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductOptions.propTypes = {
  productTitle: PropTypes.string.isRequired,
};

ProductOptions.defaultProps = {
  // sideMenuOpen: false,
};

export default connect(stateToProps, dispatchToProps)(ProductOptions);
