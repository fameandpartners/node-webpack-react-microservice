import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import noop from '../../libs/noop';

// UI components
import Checkbox from '../form/Checkbox';
// Actions
import * as CustomizationActions from '../../actions/CustomizationActions';
// CSS
import '../../../css/components/ExpressMaking.scss';

function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  const selectedColor = state.$$customizationState.get('selectedColor');
  const productDefaultFabrics = state.$$productState.get('productDefaultFabrics');
  const productSecondaryFabrics = state.$$productState.get('productSecondaryFabrics');
  return {
    // PRODUCT
    expressMakingAvailable: state.$$productState.get('fastMaking'),
    superExpressMakingAvailable: state.$$productState.get('superFastMaking'),
    hasFabrics: !productDefaultFabrics.isEmpty() || !productSecondaryFabrics.isEmpty(),
    productDefaultFabrics: productDefaultFabrics.toJS(),
    productDefaultColors: state.$$productState.get('productDefaultColors').toJS(),
    isActive: state.$$productState.get('isActive'),
    showShippingInfoPDP: false,

    // COLOR
    colorId: selectedColor.get('id'),

    // SELECTIONS
    expressMakingStatus: state.$$customizationState.get('expressMakingSelected'),
    superExpressMakingStatus: state.$$customizationState.get('superExpressMakingSelected'),
  };
}


function dispatchToProps(dispatch) {
  const {
    activateCustomizationDrawer,
    setExpressMakingStatus,
    setSuperExpressMakingStatus,
  } = bindActionCreators(CustomizationActions, dispatch);
  return {
    activateCustomizationDrawer,
    setExpressMakingStatus,
    setSuperExpressMakingStatus,
  };
}

class ExpressMaking extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  setExpressStatus() {
    const {
      expressMakingStatus,
    } = this.props;
    this.props.setExpressMakingStatus(!expressMakingStatus);
    this.props.setSuperExpressMakingStatus(false);
  }

  setSuperExpressStatus() {
    const {
      superExpressMakingStatus,
    } = this.props;
    this.props.setSuperExpressMakingStatus(!superExpressMakingStatus);
    this.props.setExpressMakingStatus(false);
  }
  render() {
    const {
      expressMakingAvailable,
      superExpressMakingAvailable,
      expressMakingStatus,
      superExpressMakingStatus,
      isActive,
      showShippingInfoPDP,
      mobile,
    } = this.props;
    // PRODUCT

    if (isActive && showShippingInfoPDP) {
      return (
        <div>
          {
            superExpressMakingAvailable ?
              /* eslint-disable max-len */
              <div className="grid-center-spaceAround ExpressMaking__content u-mb--small js-express-make">
                <div className="col-1">
                  <Checkbox
                    id="super_express_making"
                    onChange={this.setSuperExpressStatus}
                    showChecked={superExpressMakingStatus}
                  />
                </div>
                <div className="col-8_sm-10 u-text-align-left u-paddingBottom--small">
                  <p className="ExpressMaking__content--headline">
                        Super Express + $19
                  </p>
                  <p className="ExpressMaking__content--subHeadline">
                      Cut, Sewn and Shipped in 1.5 weeks
                  </p>
                  {
                      mobile ?
                        <p>
                          <a
                            href="/faqs#collapse-delivery-how-long"
                            className="u-text-decoration--underline link link--static"
                            target="noopener noreferrer"
                          >
                              Learn More
                          </a>
                        </p>
                          : null
                    }

                </div>
                <div className="col-3_sm-9 u-text-align--right">
                  {
                          !mobile ?
                            <div>
                              <a
                                href="/faqs#collapse-delivery-how-long"
                                className="link link--static u-text-decoration--underline"
                              >
                                  Learn More
                              </a>
                            </div>
                            : null
                            }
                </div>
              </div>
              : null
            }
          {
              expressMakingAvailable ?
                <div className="grid-center-spaceAround ExpressMaking__content u-mb--small js-express-make">
                  <div className="col-1">
                    <Checkbox
                      id="express_making"
                      onChange={this.setExpressStatus}
                      showChecked={expressMakingStatus}
                    />
                  </div>
                  <div className="col-8_sm-10 u-text-align-left u-paddingBottom--small">
                    <p className="ExpressMaking__content--headline">
                              Express + $4
                    </p>
                    <p className="ExpressMaking__content--subHeadline">
                        Cut, Sewn and Shipped in 2-3 weeks
                    </p>
                    {
                                  mobile ?
                                    <p>
                                      <a
                                        href="/faqs#collapse-delivery-how-long"
                                        className="u-text-decoration--underline link link--static"
                                        target="noopener noreferrer"
                                      >
                                          Learn More
                                      </a>
                                    </p>
                                      : null
                                      }

                  </div>
                  <div className="col-3_sm-9 u-text-align--right">
                    {
                              !mobile ?
                                <div>
                                  <a
                                    href="/faqs#collapse-delivery-how-long"
                                    className="link link--static u-text-decoration--underline"
                                  >
                                      Learn More
                                  </a>
                                </div>
                                : null
                                }
                  </div>
                </div>
                  : null
                }
        </div>
      );
    }
    return <div />;
  }
}
ExpressMaking.propTypes = {
  setExpressMakingStatus: PropTypes.func,
  setSuperExpressMakingStatus: PropTypes.func,
  expressMakingStatus: PropTypes.bool,
  superExpressMakingStatus: PropTypes.bool,
  expressMakingAvailable: PropTypes.bool,
  superExpressMakingAvailable: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  showShippingInfoPDP: PropTypes.bool,
  mobile: PropTypes.bool,
};

ExpressMaking.defaultProps = {
  setExpressMakingStatus: noop,
  setSuperExpressMakingStatus: noop,
  expressMakingStatus: false,
  superExpressMakingStatus: false,
  expressMakingAvailable: false,
  superExpressMakingAvailable: false,
  productDefaultColors: [],
  productDefaultFabrics: [],
  showShippingInfoPDP: true,
  colorId: null,
  mobile: false,
};

export default connect(stateToProps, dispatchToProps)(ExpressMaking);
