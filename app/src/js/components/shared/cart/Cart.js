import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import win from '../../../polyfills/windowPolyfill';

import { formatCents } from '../../../utilities/accounting';
import noop from '../../../libs/noop';

// UI Components
import Button from '../../generic/Button';
import CancelOut from '../CancelOut';
// import ProductCrossSell from '../../pdp/ProductCrossSell';

// Constants
import { UNITS } from '../../../constants/ProductConstants';

// Actions
import * as CartActions from '../../../actions/CartActions';

import {
  isExtremeLightLuminance,
  generateBackgroundValueFromColor,
} from '../../../utilities/color';

// temp. helper
import { removeFromCart } from '../../../utilities/cart-helper';

// CSS
import '../../../../css/components/Cart.scss';

const HEIGHT_VALS = {
  petite: '4ft 10in - 5ft 4in',
  standard: '5ft 5in - 5ft 7in',
  tall: '5ft 8in - 6ft 4in',
};

function stateToProps({ $$appState }) {
  const siteVersion = win.ApplicationStateData ? win.ApplicationStateData.currentSiteVersion : null;
  return {
    siteVersion: siteVersion || $$appState.get('siteVersion'),
  };
}

function dispatchToProps(dispatch) {
  const {
    setCartContents,
  } = bindActionCreators(CartActions, dispatch);

  return {
    setCartContents,
  };
}

class Cart extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  subTotal() {
    const { lineItems } = this.props;
    if (lineItems.length > 0) {
      // Reduces subTotal based on base price, colors, and addons chosen
      return lineItems.reduce(
        (prevTotal, currLineItem) => prevTotal + currLineItem.productCentsBasePrice,
        0,
      );
    }
    return '';
  }

  handleRemoveFromCartClick(id) {
    this.handleRemoveFromCartCallback(removeFromCart(id));
  }

  handleRemoveFromCartCallback(req) {
    const {
      setCartContents,
    } = this.props;

    req.end((err, res) => {
      if (err) {
        // eslint-disable-next-line
        return console.log('Error removing dress from cart.');
      }

      setCartContents({ cart: res.body });
      return null;
    });
  }

  addonNamePresenter(nameStr) {
    const strParts = nameStr.split('-');
    if (strParts.length > 1) {
      return strParts.map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ');
    }
    return nameStr;
  }

  generateTitle(lineItem, productTitle) {
    let ret = productTitle;
    if (lineItem.isFlashSaleItem) {
      const parts = productTitle.split('-');
      ret = (
        <span>
          <span className="Cart__line-description u-bold">{parts[0]}</span>
          <span>{parts[1]}</span>
        </span>
      );
    } else {
      ret = (
        <span>{productTitle}</span>
      );
    }
    return ret;
  }

  generateAddonSummary(addons) {
    return (
      <ul>
        { addons.map(a => (
          <li key={a.name}>{this.addonNamePresenter(a.name)}</li>
        ))}
      </ul>
    );
  }

  generateColorSelectionNode(lineItem) {
    const { color, isFlashSaleItem } = lineItem;

    const {
      centsTotal,
      presentation,
      hexValue,
      patternUrl,
    } = color;
    const background = generateBackgroundValueFromColor({
      hexValue,
      patternUrl,
    });

    return (
      <span>
        <span>{presentation}</span>&nbsp;
        { (centsTotal && !isFlashSaleItem)
          ? <span>+{formatCents(centsTotal, 0)}</span>
          : null
        }
        <span
          style={{ background }}
          className={classnames(
            'ProductOptions__color-swatch u-display--inline-block',
            { 'ProductOptions__color-swatch--extreme-light': isExtremeLightLuminance({ hexValue }) },
          )}
        />
      </span>
    );
  }

  generateSizeSummary(lineItem) {
    const { siteVersion } = this.props;
    const {
      height,
      heightUnit,
      heightValue,
      sizePresentationAU,
      sizePresentationUS,
    } = lineItem;
    const sizePresentation = (siteVersion && siteVersion.toLowerCase() === 'usa')
      ? sizePresentationUS
      : sizePresentationAU;
    let sizingInformation = '';


    if (heightUnit === UNITS.INCH) {
      // INCH
      const ft = Math.floor(heightValue / 12);
      const inch = heightValue % 12;
      sizingInformation = `Size: ${ft}ft ${inch}in / ${sizePresentation}`;
    } else if (heightUnit === UNITS.CM) {
      // CM
      sizingInformation = `Size: ${heightValue} ${heightUnit.toLowerCase()} / ${sizePresentation}`;
    } else if (height) {
      const lowerHeight = height.toLowerCase();
      if (HEIGHT_VALS[lowerHeight]) {
        sizingInformation = `Size: ${HEIGHT_VALS[lowerHeight]} / ${sizePresentation}`;
      } else {
        sizingInformation = `Size: ${height} / ${sizePresentation}`;
      }
    }

    return sizingInformation;
  }


  generateLineItems() {
    const { lineItems } = this.props;

    return lineItems.map((lineItem) => {
      const {
        id,
        productCentsBasePrice,
        productImage,
        productTitle,
      } = lineItem;
      return (
        <div
          key={id}
          className="Cart__single-product-description grid-12"
        >
          <span
            onClick={() => this.handleRemoveFromCartClick(id)}
            className="Cart__product-remove u-cursor--pointer"
          >
            <CancelOut />
          </span>
          <div className="col-5 u-mr--small">
            <img className="u-width--full" alt="dress1" src={productImage} />
          </div>
          <div className="u-text-align--left">
            <span className="Cart__line-description u-bold">
              {this.generateTitle(lineItem, productTitle)}&nbsp;
              <span>{formatCents(productCentsBasePrice, 2)}</span>
            </span>
            <span className="Cart__line-description">
              {this.generateColorSelectionNode(lineItem)}
            </span>
            <span className="Cart__line-description">
              {this.generateAddonSummary(lineItem.addons)}
            </span>
            <span className="Cart__line-description">
              {this.generateSizeSummary(lineItem)}
            </span>
          </div>
        </div>
      );
    });
  }

  render() {
    // const { complementaryProducts } = this.props;

    return (
      <div className="Cart u-flex u-flex--1">
        <div className="Cart__contents Cart__layout-container u-flex--col u-width--full">

          <div>
            <div className="Cart__subtotal u-text-align--center grid-12 u-mt-small">
              <span className="col-6 u-text-align--left">Subtotal</span>
              <span className="col-6 Cart__subtotal-price u-text-align--right">
                { formatCents(this.subTotal(), 2) }
              </span>
            </div>
            <Button
              tall
              className="u-mb--normal"
              url="/checkout"
              text="Checkout"
              handleClick={noop}
            />
          </div>


          <div className="u-flex u-flex--1">
            <div className="u-overflow-y--scroll u-width--full">
              <div className="Cart__line-item-wrapper u-overflow-x--hidden">
                { this.generateLineItems() }
              </div>
              {/* <ProductCrossSell complementaryProducts={complementaryProducts} /> */}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  // Redux Props
  siteVersion: PropTypes.string.isRequired,
  // complementaryProducts: PropTypes.arrayOf(PropTypes.shape({
  //   centsPrice: PropTypes.number,
  //   smallImg: PropTypes.string,
  //   productId: PropTypes.number,
  //   productTitle: PropTypes.string,
  //   url: PropTypes.string,
  // })).isRequired,
  lineItems: PropTypes.arrayOf(PropTypes.shape({
    addons: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      centsTotal: PropTypes.number,
    })),
    color: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      centsTotal: PropTypes.number,
      hexValue: PropTypes.string,
    }),
    productCentsBasePrice: PropTypes.number,
    productImage: PropTypes.string,
    productTitle: PropTypes.string,
  })).isRequired,
  setCartContents: PropTypes.func.isRequired,
};

export default connect(stateToProps, dispatchToProps)(Cart);
