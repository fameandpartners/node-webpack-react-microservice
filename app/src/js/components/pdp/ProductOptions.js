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
} from '../../utilities/pdp';

// Constants
import CustomizationConstants from '../../constants/CustomizationConstants';
import ModalConstants from '../../constants/ModalConstants';

// UI components
import ProductOptionsRow from './ProductOptionsRow';
import ProductSecondaryActions from './ProductSecondaryActions';

// Actions
import * as CustomizationActions from '../../actions/CustomizationActions';
import ModalActions from '../../actions/ModalActions';

// CSS
import '../../../css/components/ProductOptions.scss';

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
    productId: state.$$productState.get('productId'),
    productTitle: state.$$productState.get('productTitle'),
    productCentsBasePrice: state.$$productState.get('productCentsBasePrice'),
    $$productImages: state.$$productState.get('productImages'),
    deliveryCopy: state.$$productState.get('deliveryCopy'),

    // COLOR
    colorId: selectedColor.get('id'),
    colorName: selectedColor.get('presentation'),
    colorCentsTotal: selectedColor.get('centsTotal'),
    colorHexValue: selectedColor.get('hexValue'),
    patternUrl: selectedColor.get('patternUrl'),

    // SELECTIONS
    addonOptions: addons ? addons.get('addonOptions').toJS() : null,
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

  retrieveSelectedAddonOptions() {
    const { addonOptions, selectedStyleCustomizations } = this.props;
    return addonOptions.filter(a => selectedStyleCustomizations.indexOf(a.id) > -1);
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
    const selectedOptions = this.retrieveSelectedAddonOptions();
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
    } = this.props;
    const sizingInformation = sizingDisplayText({
      selectedDressSize,
      selectedHeightValue,
      selectedMeasurementMetric,
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
    } = this.props;

    const selectedAddonOptions = this.retrieveSelectedAddonOptions();
    return calculateSubTotal(
      { colorCentsTotal, productCentsBasePrice, selectedAddonOptions },
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
    const { $$productImages, colorId } = this.props;
    const productImages = $$productImages.toJS();
    const hasMatch = find(productImages, { colorId });
    return hasMatch ? hasMatch.bigImg : productImages[0].bigImg;
  }

  render() {
    const {
      productTitle,
      selectedStyleCustomizations,
      selectedDressSize,
      selectedHeightValue,
      auSite,
      deliveryCopy,
    } = this.props;

    return (
      <div className="ProductOptions grid-12-noGutter">
        <div className="ProductOptions__primary-image-container brick col-6">
          <div
            className="ProductOptions__primary-image-wrapper"
            style={{
              background: `url(${this.findColorSpecificFirstImageUrl()})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            onClick={this.showImageLightboxModal}
          />
        </div>
        <div className="ProductOptions__col grid-middle col-6 u-center">
          <div className="ProductOptions__container">
            <div className="ProductOptions__content u-mb-normal typography">
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
                optionIsSelected={sizeProfilePresence(selectedDressSize, selectedHeightValue)}
                rightNode={this.generateSizingNode()}
                handleClick={this.handleProductOptionClick(CustomizationConstants.SIZE_CUSTOMIZE)}
              />
            </div>
            <div className="ProductOptions__ctas grid-1 u-mb-small">
              <AddToCartButton showTotal={false} shouldActivateCartDrawer />
            </div>
            <div className="ProductOptions__additional-info u-mb-normal">
              { auSite ?
                (
                  <p
                    className="AfterPay__message"
                  >
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
                )
                : null
              }
              <p className="u-mb-small">
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
                    ? `Estimated delivery ${deliveryCopy}.`
                    : null
                }

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
  // COLOR
  colorId: PropTypes.number.isRequired,
  colorCentsTotal: PropTypes.number,
  colorName: PropTypes.string.isRequired,
  colorHexValue: PropTypes.string.isRequired,
  patternUrl: PropTypes.string.isRequired,
  // ADDONS
  addonOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    }),
  ),
  auSite: PropTypes.bool.isRequired,
  selectedDressSize: PropTypes.number,
  selectedHeightValue: PropTypes.number,
  selectedMeasurementMetric: PropTypes.string.isRequired,
  selectedStyleCustomizations: PropTypes.arrayOf(PropTypes.number).isRequired,
  //* Redux Actions
  activateCustomizationDrawer: PropTypes.func.isRequired,
  activateModal: PropTypes.func,
  deliveryCopy: PropTypes.string,
};

ProductOptions.defaultProps = {
  addonOptions: [],
  colorCentsTotal: 0,
  selectedDressSize: null,
  selectedHeightValue: null,
  activateModal: noop,
  deliveryCopy: '',
};

export default connect(stateToProps, dispatchToProps)(ProductOptions);
