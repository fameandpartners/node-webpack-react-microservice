import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';
import classnames from 'classnames';

// Utilities
import noop from '../../libs/noop';
import { formatCents } from '../../utilities/accounting';
import { sizeProfilePresence } from '../../utilities/pdpValidations';
import {
  isExtremeLightLuminance,
  generateBackgroundValueFromColor,
} from '../../utilities/color';
import {
  addonSelectionDisplayText,
  calculateSubTotal,
  retrieveSelectedAddonOptions,
} from '../../utilities/pdp';

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
  const selectedColor = state.$$customizationState.get('selectedColor');
  const addons = state.$$customizationState.get('addons');

  return {
    // APP
    auSite: state.$$appState.get('siteVersion').toLowerCase() === 'australia',

    // PRODUCT
    productId: state.$$productState.get('productId'),
    productTitle: state.$$productState.get('productTitle'),
    productCentsBasePrice: state.$$productState.get('productCentsBasePrice'),
    $$productImages: state.$$productState.get('productImages'),
    productDefaultColors: state.$$productState.get('productDefaultColors').toJS(),
    isActive: state.$$productState.get('isActive'),

    // COLOR
    colorId: selectedColor.get('id'),
    colorName: selectedColor.get('presentation'),
    colorCentsTotal: selectedColor.get('centsTotal'),
    colorHexValue: selectedColor.get('hexValue'),
    patternUrl: selectedColor.get('patternUrl'),

    // SELECTIONS
    addonOptions: addons ? addons.get('addonOptions').toJS() : null,
    expressMakingSelected: state.$$customizationState.get('expressMakingSelected'),
    selectedDressSize: state.$$customizationState.get('selectedDressSize'),
    selectedHeightValue: state.$$customizationState.get('selectedHeightValue'),
    selectedStyleCustomizations: state.$$customizationState.get('selectedStyleCustomizations').toJS(),
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

class ProductOptions extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  generateColorSelectionNode() {
    const {
      colorCentsTotal,
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
        { colorCentsTotal
          ? <span>+{formatCents(colorCentsTotal, 0)}</span>
          : null
        }
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

  generateAddonSelectionNode() {
    const {
      addonOptions,
      selectedStyleCustomizations,
    } = this.props;
    const selectedOptions = retrieveSelectedAddonOptions(addonOptions, selectedStyleCustomizations);
    const displayText = addonSelectionDisplayText({ selectedAddonOptions: selectedOptions });

    return displayText
    ? (
      <span>{displayText}</span>
    )
    : null;
  }

  generateLengthNode() {
    return true ? (
      <span>
        [Ankle Length]
      </span>
    ) : null;
  }

  calculateSubTotal(currencySymbol) {
    const {
      productCentsBasePrice,
      colorCentsTotal,
      expressMakingSelected,
      addonOptions,
      selectedStyleCustomizations,
    } = this.props;
    const selectedAddonOptions = retrieveSelectedAddonOptions(
      addonOptions,
      selectedStyleCustomizations,
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

  /**
   * Checks for our current color amongst images and returns that image, or default
   * @return {String} imageUrl
   */
  findColorSpecificFirstImageUrl() {
    const { $$productImages, colorId } = this.props;
    const productImages = $$productImages.toJS();
    if (!productImages[0]) return null;

    const hasMatch = find(productImages, { colorId });
    return hasMatch ? hasMatch.bigImg : productImages[0].bigImg;
  }

  render() {
    const {
      auSite,
      productTitle,
      isActive,
      selectedStyleCustomizations,
      selectedDressSize,
      selectedHeightValue,
    } = this.props;

    return (
      <div className="ProductOptions grid-12-noGutter">
        <div className="ProductOptions__primary-image-container brick col-6">
          <div
            className="ProductOptions__primary-image-wrapper u-cursor--pointer"
            style={{
              backgroundImage: `url(${this.findColorSpecificFirstImageUrl()})`,
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
                optionIsSelected={!!selectedStyleCustomizations.length}
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

ProductOptions.propTypes = {
  //* Redux Properties
  auSite: PropTypes.bool.isRequired,
  // PRODUCT
  $$productImages: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
    id: PropTypes.number,
    colorId: PropTypes.number,
    smallImg: PropTypes.string,
    bigImg: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    position: PropTypes.number,
  })).isRequired,
  productTitle: PropTypes.string.isRequired,
  productCentsBasePrice: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  // COLOR
  colorId: PropTypes.number.isRequired,
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
  selectedDressSize: PropTypes.number,
  selectedHeightValue: PropTypes.number,
  selectedStyleCustomizations: PropTypes.arrayOf(PropTypes.number).isRequired,
  //* Redux Actions
  bdActivateCustomizationDrawer: PropTypes.func.isRequired,
  activateModal: PropTypes.func,

};

ProductOptions.defaultProps = {
  addonOptions: [],
  colorCentsTotal: 0,
  selectedDressSize: null,
  selectedHeightValue: null,
  activateModal: noop,
  expressMakingSelected: false,
};

export default connect(stateToProps, dispatchToProps)(ProductOptions);
