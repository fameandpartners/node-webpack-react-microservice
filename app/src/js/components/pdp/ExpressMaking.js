import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

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

  isExpressEligible(colorId, defaultColors) {
    const { hasFabrics, productDefaultFabrics } = this.props;
    if (hasFabrics) {
      return productDefaultFabrics.filter(color => color.id === colorId).length > 0;
    }

    return defaultColors.filter(color => color.id === colorId).length > 0;
  }

  setExpressStatus() {
    const {
      expressMakingStatus,
      colorId,
      productDefaultColors,
    } = this.props;
    if (this.isExpressEligible(colorId, productDefaultColors)) {
      this.props.setExpressMakingStatus(!expressMakingStatus);
    }
  }

  setSuperExpressStatus() {
    const {
      superExpressMakingStatus,
    } = this.props;
    this.props.setSuperExpressMakingStatus(!superExpressMakingStatus);
  }
  render() {
    const {
      expressMakingAvailable,
      superExpressMakingAvailable,
      colorId,
      expressMakingStatus,
      superExpressMakingStatus,
      productDefaultColors,
      isActive,
      mobile,
    } = this.props;
    // PRODUCT

    if (isActive) {
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
                        Super Express + $28
                  </p>
                  <p className="ExpressMaking__content--subHeadline">
                      Cut, Sewn and Shipped in 1.5 weeks
                  </p>
                  {
                      mobile ?
                        <p>
                          <a
                            href="/faqs#collapse-what-express-making"
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
                                href="/faqs#collapse-what-express-making"
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
                      disabled={!this.isExpressEligible(colorId, productDefaultColors)}
                    />
                  </div>
                  <div className="col-8_sm-10 u-text-align-left u-paddingBottom--small">
                    <p className="ExpressMaking__content--headline">
                              Express + $18
                    </p>
                    <p className="ExpressMaking__content--subHeadline">
                        Cut, Sewn and Shipped in 2-3 weeks
                    </p>
                    <p
                      className={classnames(
                                    'ExpressMaking__content--subHeadline',
                        {
                          'ExpressMaking__content--error': colorId && !this.isExpressEligible(colorId, productDefaultColors),
                        },
                            )}
                    >
                        Only available for Recommended Colors
                    </p>
                    {
                                  mobile ?
                                    <p>
                                      <a
                                        href="/faqs#collapse-what-express-making"
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
                                    href="/faqs#collapse-what-express-making"
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
  hasFabrics: PropTypes.bool.isRequired,
  productDefaultColors: PropTypes.arrayOf(PropTypes.object),
  productDefaultFabrics: PropTypes.arrayOf(PropTypes.object),
  isActive: PropTypes.bool.isRequired,
  colorId: PropTypes.number,
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
  colorId: null,
  mobile: false,
};

export default connect(stateToProps, dispatchToProps)(ExpressMaking);
