import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formatCents } from '../../utilities/accounting';

// Constants
import CustomizationConstants from '../../constants/CustomizationConstants';
import { UNITS } from '../../constants/ProductConstants';

// UI components
import ProductOptionsRow from './ProductOptionsRow';
import ProductSecondaryActions from './ProductSecondaryActions';

// TEST IMAGES
import image1 from '../../../img/test/image_1.png';

// Actions
import * as CartActions from '../../actions/CartActions';
import * as CustomizationActions from '../../actions/CustomizationActions';
// CSS
import '../../../css/components/ProductOptions.scss';

// UI Components
import Button from '../generic/Button';


function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  const selectedColor = state.$$customizationState.get('selectedColor');
  const addons = state.$$customizationState.get('addons');

  return {
    // PRODUCT
    productId: state.$$productState.get('productId'),
    productTitle: state.$$productState.get('productTitle'),
    productCentsBasePrice: state.$$productState.get('productCentsBasePrice'),

    // COLOR
    colorId: selectedColor.get('id'),
    colorName: selectedColor.get('presentation'),
    colorCentsTotal: selectedColor.get('centsTotal'),
    colorHexValue: selectedColor.get('hexValue'),

    // SELECTIONS
    addonOptions: addons.get('addonOptions').toJS(),
    selectedDressSize: state.$$customizationState.get('selectedDressSize'),
    selectedHeightValue: state.$$customizationState.get('selectedHeightValue'),
    selectedMeasurementMetric: state.$$customizationState.get('selectedMeasurementMetric'),
    selectedStyleCustomizations: state.$$customizationState.get('selectedStyleCustomizations').toJS(),
  };
}


function dispatchToProps(dispatch) {
  const { addItemToCart, activateCartDrawer } = bindActionCreators(CartActions, dispatch);
  const { activateCustomizationDrawer } = bindActionCreators(CustomizationActions, dispatch);

  return {
    activateCartDrawer,
    activateCustomizationDrawer,
    addItemToCart,
  };
}

class ProductOptions extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  retrieveSelectedAddonOptions() {
    const { addonOptions, selectedStyleCustomizations } = this.props;
    return addonOptions.filter(a => selectedStyleCustomizations.indexOf(a.id) > -1);
  }

  /**
   * TODO: This should be a shared utility
   * or should punt to a shared utility
   */
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
      addonOptions,
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
      addons: addonOptions,
    };
  }

  addSelectionPrice(centsTotal) {
    if (centsTotal) { return `+${formatCents(parseInt(centsTotal, 10), 0)}`; }
    return null;
  }

  reduceCustomizationSelectionPrice(selectedOptions) {
    return `+${formatCents(
      selectedOptions.reduce(
        (subTotal, c) =>
          subTotal + parseInt(c.price.money.fractional, 10), 0),
        0,
    )}`;
  }

  generateColorSelectionNode() {
    const {
      colorCentsTotal,
      colorName,
      colorHexValue,
    } = this.props;

    return (
      <span>
        <span>{colorName}</span>&nbsp;
        { colorCentsTotal
          ? <span>{this.addSelectionPrice(colorCentsTotal)}</span>
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
    const selectedOptions = this.retrieveSelectedAddonOptions();
    console.warn('TODO: @elgrecode polish. addonOptions need to reference white listed build not old structure');

    if (selectedOptions.length === 1) { // One customization
      return (
        <span>
          <span>{selectedOptions[0].name}</span>&nbsp;
          <span>{this.addSelectionPrice(selectedOptions[0].price.money.fractional)}</span>
        </span>
      );
    } else if (selectedOptions.length > 1) { // Multiple customizations
      return (
        <span>
          <span>{selectedOptions.length} Additions</span>&nbsp;
          <span>{this.reduceCustomizationSelectionPrice(selectedOptions)}</span>
        </span>
      );
    }

    return null;
  }

  generateSizingNode() {
    const {
      selectedHeightValue,
      selectedMeasurementMetric,
      selectedDressSize,
    } = this.props;
    let sizingInformation = null;

    if (selectedHeightValue && selectedDressSize) {
      if (selectedMeasurementMetric === UNITS.INCH) {
        // INCH
        const ft = Math.floor(selectedHeightValue / 12);
        const inch = selectedHeightValue % 12;
        sizingInformation = `${ft}ft ${inch}in / ${selectedDressSize}`;
      } else {
        // CM
        sizingInformation = `${selectedHeightValue} ${selectedMeasurementMetric.toLowerCase()} / ${selectedDressSize}`;
      }
    }

    return sizingInformation ? (
      <span>
        {sizingInformation}
      </span>
    ) : null;
  }

  calculateSubTotal() {
    const {
      productCentsBasePrice = 0,
      colorCentsTotal = 0,
    } = this.props;

    console.warn('TODO: switch to clean transformed version of addons');
    const customizationStyleCents = this.retrieveSelectedAddonOptions()
      .reduce((prev, curr) => prev + parseInt(curr.price.money.fractional, 10), 0);

    return formatCents(
      parseInt(colorCentsTotal, 10) + customizationStyleCents + productCentsBasePrice,
      0,
    );
  }

  /**
   * Activates a drawer to a specific drawer type
   * @param  {String} drawer
   */
  handleProductOptionClick(drawer) {
    return () => {
      this.props.activateCustomizationDrawer({
        productCustomizationDrawer: drawer,
      });
    };
  }

  /**
   * Handles adding item to cart
   */
  handleAddToBag() {
    const {
      activateCartDrawer,
      addItemToCart,
    } = this.props;
    const lineItem = this.accumulateItemSelections();

    addItemToCart({ lineItem });
    activateCartDrawer({ cartDrawerOpen: true });
  }

  render() {
    const {
      productTitle,
      selectedStyleCustomizations,
      selectedDressSize,
      selectedHeightValue,
    } = this.props;

    return (
      <div className="ProductOptions grid-12-noGutter">
        <div className="ProductOptions__primary-image-container brick col-6">
          <img className="u-width--full" alt="dress1" src={image1} />
        </div>
        <div className="ProductOptions__col grid-middle col-6 u-center">
          <div className="ProductOptions__container">
            <div className="ProductOptions__content u-mb-normal typography">
              <ProductOptionsRow
                heading
                leftNode={<h1 className="display--inline h4">{productTitle}</h1>}
                rightNode={
                  <span className="h4">
                    {this.calculateSubTotal()}
                  </span>
                }
              />
              <ProductOptionsRow
                leftNode={<span>Color</span>}
                leftNodeClassName="u-uppercase"
                optionIsSelected
                rightNode={this.generateColorSelectionNode()}
                handleClick={this.handleProductOptionClick(CustomizationConstants.COLOR_CUSTOMIZE)}
              />
              <ProductOptionsRow
                leftNode={<span>Design Customizations</span>}
                leftNodeClassName="u-uppercase"
                optionIsSelected={!!selectedStyleCustomizations.length}
                rightNode={this.generateAddonSelectionNode()}
                handleClick={this.handleProductOptionClick(CustomizationConstants.STYLE_CUSTOMIZE)}
              />
              <ProductOptionsRow
                leftNode={<span>Your size</span>}
                leftNodeClassName="u-uppercase"
                optionIsSelected={selectedDressSize && selectedHeightValue}
                rightNode={this.generateSizingNode()}
                handleClick={this.handleProductOptionClick(CustomizationConstants.SIZE_CUSTOMIZE)}
              />
            </div>
            <div className="ProductOptions__ctas grid-1">
              <Button
                tall
                handleClick={this.handleAddToBag}
                text="Add to Bag"
              />
            </div>
            <div className="ProductOptions__additional-info u-mb-normal">
              <p>
                $5 of each sale funds a women&apos;s empowerment charity.&nbsp;
                <a className="link link--static">Learn more</a>
              </p>
              <p className="u-mb-small">
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
  colorId: PropTypes.number.isRequired,
  // ADDONS
  addonOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    }),
  ).isRequired,
  selectedDressSize: PropTypes.number,
  selectedHeightValue: PropTypes.number,
  selectedMeasurementMetric: PropTypes.string.isRequired,
  selectedStyleCustomizations: PropTypes.string.isRequired,
  //* Redux Actions
  activateCartDrawer: PropTypes.func.isRequired,
  activateCustomizationDrawer: PropTypes.func.isRequired,
  addItemToCart: PropTypes.func.isRequired,
};

ProductOptions.defaultProps = {
  selectedDressSize: null,
  selectedHeightValue: null,
};

export default connect(stateToProps, dispatchToProps)(ProductOptions);
