import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formatCents } from '../../utilities/accounting';

// UI components
import ProductOptionsRow from './ProductOptionsRow';
import ProductSecondaryActions from './ProductSecondaryActions';

// TEST IMAGES
import image1 from '../../../img/test/image_1.png';

// Actions
import * as AppActions from '../../actions/AppActions';
import * as CartActions from '../../actions/CartActions';

// CSS
import '../../../css/components/ProductOptions.scss';

// UI Components
import Button from '../generic/Button';


function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  const selectedColor = state.$$productState.get('selectedColor');

  return {
    // PRODUCT
    productId: state.$$productState.get('productId'),
    productTitle: state.$$productState.get('productTitle'),
    productCentsBasePrice: state.$$productState.get('productCentsBasePrice'),

    // COLOR
    colorId: selectedColor.get('id'),
    colorName: selectedColor.get('name'),
    colorCentsTotal: selectedColor.get('centsTotal'),
    colorHexValue: selectedColor.get('hexValue'),

    // ADDONS
    selectedCustomizations: state.$$productState.get('selectedCustomizations').toJS(),
  };
}


function dispatchToProps(dispatch) {
  const { addItemToCart } = bindActionCreators(CartActions, dispatch);
  const { activateCartDrawer } = bindActionCreators(AppActions, dispatch);

  return { addItemToCart, activateCartDrawer };
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

  accumulateItemSelections() {
    const {
      // PRODUCT
      productId,
      productTitle,
      productCentsBasePrice,
      // COLOR
      colorId,
      colorName,
      colorCentsTotal,
      colorHexValue,
      // ADDONS
      selectedCustomizations,
    } = this.props;

    return {
      productId,
      productTitle,
      productCentsBasePrice,
      color: {
        id: colorId,
        name: colorName,
        centsTotal: colorCentsTotal,
        hexValue: colorHexValue,
      },
      addons: selectedCustomizations,
    };
  }

  handleAddToBag() {
    const {
      activateCartDrawer,
      addItemToCart,
    } = this.props;
    const lineItem = this.accumulateItemSelections();

    addItemToCart({ lineItem });
    activateCartDrawer({ cartDrawerOpen: true });
  }

  addSelectionPrice(centsTotal) {
    if (centsTotal) { return `+${formatCents(centsTotal, 0)}`; }
    return null;
  }

  reduceCustomizationSelectionPrice() {
    const { selectedCustomizations } = this.props;
    return formatCents(
      selectedCustomizations.reduce((subTotal, c) => subTotal + c.centsTotal, 0),
      0,
    );
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

  generateAddonSelectionNode() {
    const { selectedCustomizations } = this.props;

    if (selectedCustomizations.length === 1) { // One customization
      return (
        <span>
          <span>{selectedCustomizations[0].description}</span>&nbsp;
          <span>{this.addSelectionPrice(selectedCustomizations[0].centsTotal)}</span>
        </span>
      );
    } else if (selectedCustomizations.length > 1) { // Multiple customizations
      return (
        <span>
          <span>{selectedCustomizations.length} Additions</span>&nbsp;
          <span>{this.reduceCustomizationSelectionPrice()}</span>
        </span>
      );
    }

    return null;
  }

  render() {
    const {
      productCentsBasePrice,
      productTitle,
    } = this.props;

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
                rightNode={
                  <span className="h4">
                    {formatCents(productCentsBasePrice, 0)}
                  </span>
                }
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
                rightNode={this.generateAddonSelectionNode()}
                handleClick={this.handleAddonOptionClick}
              />
            </div>
            <div className="ProductOptions__ctas grid-1">
              <Button
                secondary
                text="Your size"
                handleClick={this.handleSizeProfileClick}
                className="App--mb-small"
              />
              <Button
                handleClick={this.handleAddToBag}
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
  //* Redux Properties
  // PRODUCT
  productId: PropTypes.string.isRequired,
  productTitle: PropTypes.string.isRequired,
  productCentsBasePrice: PropTypes.number.isRequired,
  // COLOR
  colorCentsTotal: PropTypes.number.isRequired,
  colorName: PropTypes.string.isRequired,
  colorHexValue: PropTypes.string.isRequired,
  colorId: PropTypes.string.isRequired,
  // ADDONS
  selectedCustomizations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
    }),
  ).isRequired,
  //* Redux Actions
  addItemToCart: PropTypes.func.isRequired,
  activateCartDrawer: PropTypes.func.isRequired,
};

ProductOptions.defaultProps = {
  // sideMenuOpen: false,
};

export default connect(stateToProps, dispatchToProps)(ProductOptions);
