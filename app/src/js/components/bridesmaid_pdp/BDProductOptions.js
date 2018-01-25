import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

// Utilities
import noop from '../../libs/noop';
import { sizeProfilePresence } from '../../utilities/pdpValidations';
import {
  isExtremeLightLuminance,
  generateBackgroundValueFromColor,
} from '../../utilities/color';

import {
  calculateSubTotal,
} from '../../utilities/pdp';

import {
  addonSelectionDisplayText,
  generateCustomizationImage,
  retrieveBDSelectedAddonOptions,
} from '../../utilities/bridesmaids';

// Constants
import BDCustomizationConstants from '../../constants/BDCustomizationConstants';
import ModalConstants from '../../constants/ModalConstants';

// UI components
import ProductOptionsRow from '../pdp/ProductOptionsRow';
import ProductSecondaryActions from '../pdp/ProductSecondaryActions';
import ExpressMaking from '../pdp/ExpressMaking';

// Actions
import * as BDActions from '../../actions/BDActions';
import ModalActions from '../../actions/ModalActions';

// CSS
import '../../../css/components/ProductOptions.scss';

// Assets
import afterpayImage from '../../../img/test/afterpay.png';


function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  const selectedColorPresentation = state.$$bdCustomizationState.get('selectedBDCustomizationColor');
  const productDefaultColors = state.$$productState.get('productDefaultColors').toJS();
  const selectedColor = productDefaultColors.find(
    c => selectedColorPresentation === c.presentation,
  );
  const addons = state.$$customizationState.get('addons');

  return {
    // APP
    auSite: state.$$appState.get('siteVersion').toLowerCase() === 'australia',

    // PRODUCT
    productId: state.$$productState.get('productId'),
    productTitle: state.$$productState.get('productTitle'),
    productCentsBasePrice: state.$$productState.get('productCentsBasePrice'),
    productDefaultColors,
    isActive: state.$$productState.get('isActive'),
    sku: state.$$productState.get('sku'),

    // COLOR
    colorName: selectedColor.presentation,
    colorCentsTotal: selectedColor.centsTotal,
    colorHexValue: selectedColor.hexValue,
    patternUrl: selectedColor.patternUrl,

    // SELECTIONS
    addonOptions: addons ? addons.get('addonOptions').toJS() : null,
    expressMakingSelected: state.$$customizationState.get('expressMakingSelected'),
    selectedDressSize: state.$$customizationState.get('selectedDressSize'),
    selectedHeightValue: state.$$customizationState.get('selectedHeightValue'),
    selectedCustomizationDetails: state.$$bdCustomizationState.get('selectedCustomizationDetails').toJS(),
    selectedBDCustomizationColor: state.$$bdCustomizationState.get('selectedBDCustomizationColor'),
    availableLengths: state.$$bdCustomizationState.get('availableBDCustomizationLengths').toJS(),
  };
}


function dispatchToProps(dispatch) {
  const { bdActivateCustomizationDrawer } = bindActionCreators(BDActions, dispatch);
  const actions = bindActionCreators(ModalActions, dispatch);

  return {
    bdActivateCustomizationDrawer,
    activateModal: actions.activateModal,
  };
}

class BDProductOptions extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  generateColorSelectionNode() {
    const {
      colorName,
      colorHexValue,
      patternUrl,
    } = this.props;
    const background = generateBackgroundValueFromColor({
      hexValue: colorHexValue,
      patternUrl,
    });

    return (
      <span>
        <span>{colorName}</span>&nbsp;
        <span
          style={{ background }}
          className={classnames(
            'ProductOptions__color-swatch u-display--inline-block',
            { 'ProductOptions__color-swatch--extreme-light': isExtremeLightLuminance({ hexValue: colorHexValue }) },
          )}
        />
      </span>
    );
  }

  generateImageNameForSelections() {
    const {
      availableLengths,
      selectedCustomizationDetails,
      selectedBDCustomizationColor,
      sku,
    } = this.props;

    const lengthKeys = Object.keys(availableLengths);
    const foundLengthId = selectedCustomizationDetails.find(
      id => lengthKeys.indexOf(id) > -1,
    );

    const { colorNames } = BDCustomizationConstants;
    const imageStr = generateCustomizationImage({
      sku: sku.toLowerCase(),
      customizationIds: selectedCustomizationDetails,
      imgSizeStr: '800x800',
      length: availableLengths[foundLengthId].replace('-', '_'),
      colorCode: colorNames[selectedBDCustomizationColor],
    });
    return imageStr;
  }

  generateAddonSelectionNode() {
    const {
      addonOptions,
      selectedCustomizationDetails,
    } = this.props;
    const selectedOptions = retrieveBDSelectedAddonOptions(
      addonOptions,
      selectedCustomizationDetails,
    );
    const displayText = addonSelectionDisplayText({ selectedAddonOptions: selectedOptions });

    return displayText
    ? (
      <span>{displayText}</span>
    )
    : null;
  }

  generateLengthNode() {
    const {
      availableLengths,
      selectedCustomizationDetails,
    } = this.props;
    const lengthKeys = Object.keys(availableLengths);
    const foundLengthId = selectedCustomizationDetails.find(
      id => lengthKeys.indexOf(id) > -1,
    );

    return foundLengthId ? (
      <span>
        {availableLengths[foundLengthId]}
      </span>
    ) : null;
  }

  calculateSubTotal(currencySymbol) {
    const {
      productCentsBasePrice,
      colorCentsTotal,
      expressMakingSelected,
      addonOptions,
      selectedCustomizationDetails,
    } = this.props;
    const selectedAddonOptions = retrieveBDSelectedAddonOptions(
      addonOptions,
      selectedCustomizationDetails,
    );
    return calculateSubTotal(
      { colorCentsTotal, productCentsBasePrice, selectedAddonOptions, expressMakingSelected },
      currencySymbol,
    );
  }

  calculateInstallment(divisor, currencySymbol) {
    return currencySymbol + (Number(this.calculateSubTotal('')) / divisor).toFixed(2);
  }

  handleOpenAfterpayModalClick(e) {
    e.preventDefault();
    this.props.activateModal({
      modalId: ModalConstants.AFTERPAY_MODAL,
    });
  }

  showImageLightboxModal() {
    this.props.activateModal({
      modalId: ModalConstants.ZOOM_MODAL,
      shouldAppear: true,
    });
  }

  /**
   * Activates a drawer to a specific drawer type
   * @param  {String} drawer
   */
  handleProductOptionClick(drawer) {
    return () => {
      this.props.bdActivateCustomizationDrawer({
        bdProductCustomizationDrawer: drawer,
      });
    };
  }

  render() {
    const {
      auSite,
      productTitle,
      isActive,
      selectedCustomizationDetails,
      selectedDressSize,
      selectedHeightValue,
    } = this.props;

    return (
      <div className="ProductOptions grid-12-noGutter">
        <div className="ProductOptions__primary-image-container brick col-6">
          <div
            className="ProductOptions__primary-image-wrapper u-cursor--pointer"
            style={{
              backgroundImage: `url(${this.generateImageNameForSelections()})`,
              backgroundSize: 'contain',
            }}
            onClick={this.showImageLightboxModal}
          />
        </div>
        <div className="ProductOptions__col grid-middle col-6 u-center">
          <div className="ProductOptions__container">
            <div className="ProductOptions__content u-mb-small typography">
              <ProductOptionsRow
                heading
                leftNode={<h1 className="u-display--inline h4">{productTitle}</h1>}
                rightNode={
                  <span className="h4">
                    {this.calculateSubTotal()}
                  </span>
                }
              />
              <ProductOptionsRow
                leftNode={<span>{BDCustomizationConstants.headlines.COLOR_CUSTOMIZE}</span>}
                leftNodeClassName="u-uppercase"
                optionIsSelected
                rightNode={this.generateColorSelectionNode()}
                handleClick={
                  this.handleProductOptionClick(BDCustomizationConstants.COLOR_CUSTOMIZE)
                }
              />
              <ProductOptionsRow
                leftNode={<span>{BDCustomizationConstants.headlines.LENGTH_CUSTOMIZE}</span>}
                leftNodeClassName="u-uppercase"
                optionIsSelected={sizeProfilePresence(selectedDressSize, selectedHeightValue)}
                rightNode={this.generateLengthNode()}
                handleClick={
                  this.handleProductOptionClick(BDCustomizationConstants.LENGTH_CUSTOMIZE)
                }
              />
              <ProductOptionsRow
                leftNode={<span>{BDCustomizationConstants.headlines.CUSTOMIZATIONS_HEADLINE}</span>}
                leftNodeClassName="u-uppercase"
                optionIsSelected={!!selectedCustomizationDetails.length}
                rightNode={this.generateAddonSelectionNode()}
                handleClick={
                  this.handleProductOptionClick(BDCustomizationConstants.BODICE_CUSTOMIZE)
                }
              />
            </div>

            <ProductSecondaryActions
              shareText="Share your design"
            />


            <ExpressMaking />

            {isActive ?
              <div className="ProductOptions__additional-info u-mt-small u-mb-normal">


                { auSite ?
                  (
                    <p className="AfterPay__message">
                      4 easy payments of {this.calculateInstallment(4, '$')} with
                    <img
                      alt="AfterPay Logo"
                      className="AfterPay__image-logo"
                      src={afterpayImage}
                    />
                      <a
                        className="link link--static"
                        onClick={this.handleOpenAfterpayModalClick}
                      >
                        Info
                      </a>
                    </p>
                  ) : null
                }
              </div> : null
            }
          </div>
        </div>
      </div>
    );
  }
}

BDProductOptions.propTypes = {
  //* Redux Properties
  auSite: PropTypes.bool.isRequired,
  // PRODUCT
  productTitle: PropTypes.string.isRequired,
  productCentsBasePrice: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  sku: PropTypes.string.isRequired,
  // COLOR
  colorCentsTotal: PropTypes.number,
  colorName: PropTypes.string.isRequired,
  colorHexValue: PropTypes.string.isRequired,
  expressMakingSelected: PropTypes.bool,
  patternUrl: PropTypes.string.isRequired,
  // ADDONS
  addonOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    }),
  ),
  // eslint-disable-next-line
  availableLengths:PropTypes.object,
  selectedDressSize: PropTypes.number,
  selectedHeightValue: PropTypes.number,
  selectedCustomizationDetails: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedBDCustomizationColor: PropTypes.string.isRequired,
  //* Redux Actions
  bdActivateCustomizationDrawer: PropTypes.func.isRequired,
  activateModal: PropTypes.func,

};

BDProductOptions.defaultProps = {
  addonOptions: [],
  availableLengths: null,
  colorCentsTotal: 0,
  selectedDressSize: null,
  selectedHeightValue: null,
  activateModal: noop,
  expressMakingSelected: false,
};

export default connect(stateToProps, dispatchToProps)(BDProductOptions);
