import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// UI components
import ProductOptionsRow from './ProductOptionsRow';
import ProductSecondaryActions from './ProductSecondaryActions';

// TEST IMAGES
import image1 from '../../../img/test/image_1.png';

// Actions
// import * as AppActions from '../../actions/AppActions';

// CSS
import '../../../css/components/ProductOptions.scss';

// UI Components
import Button from '../generic/Button';


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
            <div className="ProductOptions__content App--mb-normal typography">
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
            <div className="ProductOptions__ctas grid-1">
              <Button secondary className="App--mb-small" text="Your size" />
              <Button text="Add to Bag" />
            </div>
            <div className="ProductOptions__additional-info App--mb-normal">
              <p>
                $5 of each sale funds a women's empowerment charity.&nbsp;
                <a className="link link--static">Learn more</a>
              </p>
              <p className="App--mb-small">
                Complimentary shipping and returns.&nbsp;
                <a className="link link--static">Learn more</a>
              </p>
              <ProductSecondaryActions />

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
