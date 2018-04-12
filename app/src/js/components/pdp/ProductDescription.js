import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import objnoop from '../../libs/objnoop';
// import { bindActionCreators } from 'redux';

// Breakpoint Decoration
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';
// Actions
// import * as AppActions from '../../actions/AppActions';

// CSS
import '../../../css/components/ProductDescription.scss';

// Assets
import afterpayImage from '../../../img/test/afterpay.png';

import {
  calculateSubTotal,
  retrieveSelectedAddonOptions,
} from '../../utilities/pdp';

function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  const selectedColor = state.$$customizationState.get('selectedColor');
  const addons = state.$$customizationState.get('addons');

  return {
    auSite: state.$$appState.get('siteVersion').toLowerCase() === 'australia',
    // SELECTIONS
    addonOptions: addons ? addons.get('addonOptions').toJS() : null,
    deliveryCopy: state.$$productState.get('deliveryCopy'),
    expressMakingSelected: state.$$customizationState.get('expressMakingSelected'),
    superExpressMakingSelected: state.$$customizationState.get('superExpressMakingSelected'),
    selectedStyleCustomizations: state.$$customizationState.get('selectedStyleCustomizations').toJS(),
    // PRODUCT
    productCentsBasePrice: state.$$productState.get('productCentsBasePrice'),
    productDescription: state.$$productState.get('productDescription'),
    modelDescription: state.$$productState.get('modelDescription'),
    colorCentsTotal: selectedColor.get('centsTotal'),
  };
}


class ProductDescription extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  generateDeliveryCopy() {
    const { deliveryCopy, expressMakingSelected, superExpressMakingSelected } = this.props;
    if (expressMakingSelected) {
      return '2-3 weeks';
    } else if (superExpressMakingSelected) {
      return '1.5 weeks';
    }
    return deliveryCopy;
  }

  calculateSubTotal(currencySymbol) {
    const {
      productCentsBasePrice,
      colorCentsTotal,
      expressMakingSelected,
      superExpressMakingSelected,
      addonOptions,
      selectedStyleCustomizations,
    } = this.props;
    const selectedAddonOptions = retrieveSelectedAddonOptions(
      addonOptions,
      selectedStyleCustomizations,
    );
    return calculateSubTotal(
      { colorCentsTotal,
        productCentsBasePrice,
        selectedAddonOptions,
        expressMakingSelected,
        superExpressMakingSelected },
      currencySymbol,
    );
  }

  calculateInstallment(divisor, currencySymbol) {
    return currencySymbol + (Number(this.calculateSubTotal('')) / divisor).toFixed(2);
  }

  render() {
    const {
      productDescription,
      modelDescription,
      deliveryCopy,
      breakpoint,
      auSite,
      selectedStyleCustomizations,
    } = this.props;
    return (
      <div className="u-center">
        { auSite && (breakpoint === 'mobile' || breakpoint === 'tablet') ?
          (
            <p
              className="AfterPay__message u-mb--small ProductDescription__copy"
            >
              4 easy payments of {this.calculateInstallment(4, '$')} with <br />
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
        <p className="ProductDescription__copy">
          $5 of each sale is donated to UN Women and Plan International&nbsp;
          <a
            className="link link--static"
            href="/iequalchange"
            target="_blank"
            rel="noopener noreferrer"
          >
              Learn more
          </a>
        </p>
        { deliveryCopy && (breakpoint === 'mobile' || breakpoint === 'tablet') ?
          (<p className="u-mt-small ProductDescription__copy">
            {
              selectedStyleCustomizations.length === 0
              ? 'Shipping and returns are free.'
              : 'Shipping is free on your customized item.'
            }
             &nbsp; Estimated <br /> delivery {this.generateDeliveryCopy()}.
             &nbsp;
             <a
               href="/faqs#collapse-what-express-making"
               target="_blank"
               className="link link--static"
               rel="noopener noreferrer"
             >
               Learn more
             </a>
          </p>)
          : null
          }
        <div className="ProductDescription u-center">
          <p dangerouslySetInnerHTML={{ __html: productDescription }} />
          <p>-</p>
          <p dangerouslySetInnerHTML={{ __html: modelDescription }} />
        </div>
      </div>
    );
  }
}

ProductDescription.propTypes = {
  productDescription: PropTypes.string.isRequired,
  addonOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    }),
  ),
  modelDescription: PropTypes.string.isRequired,
  deliveryCopy: PropTypes.string,
  expressMakingSelected: PropTypes.bool.isRequired,
  superExpressMakingSelected: PropTypes.bool,
  breakpoint: PropTypes.string,
  auSite: PropTypes.bool.isRequired,
  productCentsBasePrice: PropTypes.number.isRequired,
  colorCentsTotal: PropTypes.number,
  selectedStyleCustomizations: PropTypes.arrayOf(PropTypes.number).isRequired,
};

ProductDescription.defaultProps = {
  deliveryCopy: null,
  expressMakingSelected: false,
  superExpressMakingSelected: false,
  colorCentsTotal: 0,
  breakpoint: '',
  addonOptions: [],
};

export default Resize(PDPBreakpoints)(connect(stateToProps, objnoop)(ProductDescription));
