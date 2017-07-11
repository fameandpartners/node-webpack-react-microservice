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
  const selectedColor = state.$$productState.get('selectedColor');
  return {
    productTitle: state.$$productState.get('productTitle'),
    colorName: selectedColor.get('name'),
    colorCentsTotal: selectedColor.get('centsTotal'),
    colorHexValue: selectedColor.get('hexValue'),
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

  handleColorOptionClick() {
    console.warn('Handling color option click');
  }

  handleAddonOptionClick() {
    console.warn('Handling Adddon Option Click');
  }

  handleSizeProfileClick() {
    console.warn('Handling Size Profile Click');
  }

  handleAddToBag() {
    console.warn('Handling Add to Bag Click');
  }

  generateColorSelectionNode() {
    const {
      colorCentsTotal,
      colorName,
      colorHexValue,
    } = this.props;

    return (
      <span>
        <span>{colorName}</span>
        { colorCentsTotal
          ? <span>{colorCentsTotal}</span>
          : null
        }
        <span
          style={{ background: colorHexValue }}
          className="ProductOptions__color-swatch display--inline-block"
        />
      </span>
    );
  }

  render() {
    const { productTitle } = this.props;
    return (
      <div className="ProductOptions grid-12">
        <div className="ProductOptions__primary-image-container brick col-6">
          <img className="width--full" alt="dress1" src={image1} />
        </div>
        <div className="ProductOptions__col grid-middle col-6 u-center">
          <div className="ProductOptions__container">
            <div className="ProductOptions__content App--mb-normal typography">
              <ProductOptionsRow
                heading
                leftNode={<h1 className="display--inline h4">{productTitle}</h1>}
                rightNode={<span className="h4">$240</span>}
              />
              <ProductOptionsRow
                leftNode={<span>Color</span>}
                leftNodeClassName="u-uppercase"
                optionIsSelected={false}
                rightNode={this.generateColorSelectionNode()}
                handleClick={this.handleColorOptionClick}
              />
              <ProductOptionsRow
                leftNode={<span>Style Addons</span>}
                leftNodeClassName="u-uppercase"
                optionIsSelected={false}
                handleClick={this.handleAddonOptionClick}
              />
            </div>
            <div className="ProductOptions__ctas grid-1">
              <Button
                secondary
                text="Your size"
                onClick={this.handleSizeProfileClick}
                className="App--mb-small"
              />
              <Button
                onClick={this.handleAddToBag}
                text="Add to Bag"
              />
            </div>
            <div className="ProductOptions__additional-info App--mb-normal">
              <p>
                $5 of each sale funds a women&apos;s empowerment charity.&nbsp;
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
  colorCentsTotal: PropTypes.number.isRequired,
  colorName: PropTypes.string.isRequired,
  colorHexValue: PropTypes.string.isRequired,
};

ProductOptions.defaultProps = {
  // sideMenuOpen: false,
};

export default connect(stateToProps, dispatchToProps)(ProductOptions);
