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
  const productMakingOptions = state.$$productState.get('productMakingOptions');

  return {
    // PRODUCT
    expressMakingAvailable: productMakingOptions.get('fast_making'),
    productDefaultColors: state.$$productState.get('productDefaultColors').toJS(),

    // COLOR
    colorId: selectedColor.get('id'),

    // SELECTIONS
    expressMakingStatus: state.$$customizationState.get('express_making_selected'),
  };
}


function dispatchToProps(dispatch) {
  const {
    activateCustomizationDrawer,
    setExpressMakingStatus } = bindActionCreators(CustomizationActions, dispatch);
  return {
    activateCustomizationDrawer,
    setExpressMakingStatus,
  };
}

class ExpressMaking extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  isExpressEligible(colorId, defaultColors) {
    return defaultColors.filter(color => color.id === colorId).length > 0;
  }

  setExpressStatus() {
    const { expressMakingStatus, colorId, productDefaultColors } = this.props;
    if (this.isExpressEligible(colorId, productDefaultColors)) {
      this.props.setExpressMakingStatus(!expressMakingStatus);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.colorId !== this.props.colorId) {
      this.props.setExpressMakingStatus(false);
    }
  }

  render() {
    const {
      expressMakingAvailable,
      colorId,
      productDefaultColors,
      mobile,
    } = this.props;
    if (expressMakingAvailable) {
      return (
        <div className="grid-center-spaceAround ExpressMaking__content u-mb-small">
          <div className="col-1">
            <Checkbox
              id="express_making"
              onChange={this.setExpressStatus}
              disabled={!this.isExpressEligible(colorId, productDefaultColors)}
            />
          </div>
          <div className="col-8_sm-10 u-text-align-left u-paddingBottom--small">
            <p className="ExpressMaking__content--headline">
              Make it Express + $30
            </p>
            <p className="ExpressMaking__content--subHeadline">
              Get it in 4-6 business days
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
                  href="/terms#collapse-shipping"
                  className="u-text-decoration--underline ExpressMaking__content--link"
                >
                  Learn More
                </a>
              </p> :
               null
            }

          </div>
          <div className="col-3_sm-9">
            <div
              className={classnames(
                {
                  'u-display--none': mobile,
                },
            )}
            >
              <a
                href="/terms#collapse-shipping"
                className="u-text-decoration--underline ExpressMaking__content--link"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      );
    }
    return <div />;
  }
}
ExpressMaking.propTypes = {
  setExpressMakingStatus: PropTypes.func,
  expressMakingStatus: PropTypes.bool,
  expressMakingAvailable: PropTypes.bool,
  productDefaultColors: PropTypes.arrayOf(PropTypes.object),
  colorId: PropTypes.string,
  mobile: PropTypes.bool,
};

ExpressMaking.defaultProps = {
  setExpressMakingStatus: noop,
  expressMakingStatus: false,
  expressMakingAvailable: false,
  productDefaultColors: [],
  colorId: null,
  mobile: false,
};

export default connect(stateToProps, dispatchToProps)(ExpressMaking);
