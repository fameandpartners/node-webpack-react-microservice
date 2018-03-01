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
  sizingDisplayText,
  retrieveSelectedAddonOptions,
} from '../../utilities/pdp';

// Constants
import CustomizationConstants from '../../constants/CustomizationConstants';
import ModalConstants from '../../constants/ModalConstants';

// UI components
import ProductOptionsRow from './ProductOptionsRow';
import ProductSecondaryActions from './ProductSecondaryActions';
import ExpressMaking from './ExpressMaking';

// REMOVE Component
import CliqueCallout from './CliqueCallout';

// Actions
import * as CustomizationActions from '../../actions/CustomizationActions';
import ModalActions from '../../actions/ModalActions';

// CSS
import '../../../css/components/ProductOptions.scss';
// CSS REMOVE
import '../../../css/components/ShoppingSpree.scss';

// Assets
import afterpayImage from '../../../img/test/afterpay.png';

// UI Components
import AddToCartButton from './AddToCartButton';


function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  const selectedColor = state.$$customizationState.get('selectedColor');
  const addons = state.$$customizationState.get('addons');

  return {
    // APP
    auSite: state.$$appState.get('siteVersion').toLowerCase() === 'australia',

    // PRODUCT
    hasFabrics: state.$$productState.get('hasFabrics'),
    deliveryCopy: state.$$productState.get('deliveryCopy'),
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
    colorPrice: parseInt(selectedColor.get('usdPrice'), 10),
    patternUrl: selectedColor.get('patternUrl'),
    expressMakingStatus: state.$$customizationState.get('expressMakingSelected'),

    // SELECTIONS
    addonOptions: addons ? addons.get('addonOptions').toJS() : null,
    expressMakingSelected: state.$$customizationState.get('expressMakingSelected'),
    selectedDressSize: state.$$customizationState.get('selectedDressSize'),
    selectedHeightValue: state.$$customizationState.get('selectedHeightValue'),
    selectedMeasurementMetric: state.$$customizationState.get('selectedMeasurementMetric'),
    selectedStyleCustomizations: state.$$customizationState.get('selectedStyleCustomizations').toJS(),
  };
}


function dispatchToProps(dispatch) {
  const { activateCustomizationDrawer } = bindActionCreators(CustomizationActions, dispatch);
  const actions = bindActionCreators(ModalActions, dispatch);

  return {
    activateCustomizationDrawer,
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
      colorPrice,
      hasFabrics,
      patternUrl,
    } = this.props;
    const background = generateBackgroundValueFromColor({
      hexValue: colorHexValue,
      patternUrl,
    });
    const centsPrice = hasFabrics ? parseInt(colorPrice, 10) : colorCentsTotal;

    return (
      <span>
        <span>{colorName}</span>&nbsp;
        { centsPrice
          ? <span>+{formatCents(centsPrice, 0)}</span>
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

  generateSizingNode() {
    const {
      selectedHeightValue,
      selectedMeasurementMetric,
      selectedDressSize,
      auSite,
    } = this.props;
    const sizingInformation = sizingDisplayText({
      selectedDressSize,
      selectedHeightValue,
      selectedMeasurementMetric,
      auSite,
    });

    return sizingInformation ? (
      <span>
        {sizingInformation}
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
      this.props.activateCustomizationDrawer({
        productCustomizationDrawer: drawer,
      });
    };
  }


  /**
   * Checks for our current color amongst images and returns that image, or default
   * @return {String} imageUrl
   */
  findColorSpecificFirstImageUrl() {
    const { $$productImages, hasFabrics, colorId: id } = this.props;
    const productImages = $$productImages.toJS();
    const hasMatch = hasFabrics
      ? find(productImages, { fabricId: id })
      : find(productImages, { colorId: id });
    return hasMatch ? hasMatch.bigImg : productImages[0].bigImg;
  }

  generateDeliveryCopy() {
    const { deliveryCopy, expressMakingSelected } = this.props;
    return expressMakingSelected ? '2-3 weeks' : deliveryCopy;
  }

  render() {
    const {
      auSite,
      deliveryCopy,
      hasFabrics,
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
            <div className="ProductOptions__content u-mb--small typography">
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
                leftNode={(
                  <span
                    dangerouslySetInnerHTML={{
                      __html: hasFabrics
                        ? CustomizationConstants.FABRIC_COLOR_HEADLINE
                        : CustomizationConstants.COLOR_HEADLINE,
                    }}
                  />)
                }
                leftNodeClassName="u-uppercase"
                optionIsSelected
                rightNode={this.generateColorSelectionNode()}
                handleClick={this.handleProductOptionClick(CustomizationConstants.COLOR_CUSTOMIZE)}
              />
              <ProductOptionsRow
                leftNode={<span>{CustomizationConstants.STYLE_HEADLINE}</span>}
                leftNodeClassName="u-uppercase"
                optionIsSelected={!!selectedStyleCustomizations.length}
                rightNode={this.generateAddonSelectionNode()}
                handleClick={this.handleProductOptionClick(CustomizationConstants.STYLE_CUSTOMIZE)}
              />
              <ProductOptionsRow
                leftNode={<span>{CustomizationConstants.SIZE_HEADLINE}</span>}
                leftNodeClassName="u-uppercase"
                optionIsSelected={sizeProfilePresence(selectedDressSize, selectedHeightValue)}
                rightNode={this.generateSizingNode()}
                handleClick={this.handleProductOptionClick(CustomizationConstants.SIZE_CUSTOMIZE)}
              />
            </div>


            <ExpressMaking />

            <div className="ProductOptions__ctas grid-1 u-mb--small">
              <AddToCartButton showTotal={false} shouldActivateCartDrawer />
            </div>

            {isActive ?
              <div className="ProductOptions__additional-info u-mt-small u-mb--normal">

                <CliqueCallout />

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
                <p className="u-mb--small">
                  {
                    selectedStyleCustomizations.length === 0
                    ? 'Shipping and returns are free.'
                    : 'Shipping is free on your customized item.'
                  } &nbsp;
                  <a
                    className="link link--static"
                    href="/faqs#collapse-returns-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  Learn&nbsp;more
                  </a> <br />
                  {
                    deliveryCopy
                    ? `Estimated delivery ${this.generateDeliveryCopy()}.`
                    : null
                  }
                  <br />
                </p>
                <ProductSecondaryActions />
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
  hasFabrics: PropTypes.bool.isRequired,
  productTitle: PropTypes.string.isRequired,
  productCentsBasePrice: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  // COLOR
  colorId: PropTypes.number.isRequired,
  colorCentsTotal: PropTypes.number,
  colorName: PropTypes.string.isRequired,
  colorHexValue: PropTypes.string.isRequired,
  colorPrice: PropTypes.number,
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
  selectedMeasurementMetric: PropTypes.string.isRequired,
  selectedStyleCustomizations: PropTypes.arrayOf(PropTypes.number).isRequired,
  //* Redux Actions
  activateCustomizationDrawer: PropTypes.func.isRequired,
  activateModal: PropTypes.func,
  deliveryCopy: PropTypes.string,
  expressMakingSelected: PropTypes.bool,

};

ProductOptions.defaultProps = {
  addonOptions: [],
  colorCentsTotal: 0,
  colorPrice: 0,
  selectedDressSize: null,
  selectedHeightValue: null,
  activateModal: noop,
  deliveryCopy: '',
  expressMakingSelected: false,

};

export default connect(stateToProps, dispatchToProps)(ProductOptions);
