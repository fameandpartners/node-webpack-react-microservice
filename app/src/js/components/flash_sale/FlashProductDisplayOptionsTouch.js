/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import ExpressMaking from './ExpressMaking';
// Utilities
import {
  isDarkLuminance,
  isExtremeLightLuminance,
  generateBackgroundValueFromColor,
  separateHexColorsInString,
} from '../../utilities/color';
import { addonSelectionDisplayText } from '../../utilities/pdp';
import { formatCents } from '../../utilities/accounting';

// UI Components
import ProductImageSlider from './ProductImageSlider';

// Constants
import ModalConstants from '../../constants/ModalConstants';
import {
  COLOR_HEADLINE,
  STYLE_HEADLINE,
} from '../../constants/CustomizationConstants';


// Actions
import * as ModalActions from '../../actions/ModalActions';

// CSS
import '../../../css/components/FlashProductDisplayOptionsTouch.scss';


function stateToProps(state) {
  const selectedColor = state.$$customizationState.get('selectedColor');
  // Which part of the Redux global state does our component want to receive as props?
  return {
    addonOptions: state.$$customizationState.get('addons').get('addonOptions').toJS(),
    selectedColor: state.$$customizationState.get('selectedColor').toJS(),
    selectedStyleCustomizations: state.$$customizationState.get('selectedStyleCustomizations').toJS(),
    colorCentsTotal: selectedColor.get('centsTotal'),
  };
}

function dispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  return { activateModal };
}

class FlashProductDisplayOptionsTouch extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  retrieveSelectedAddonOptions() {
    const { addonOptions, selectedStyleCustomizations } = this.props;
    return addonOptions.filter(a => selectedStyleCustomizations.indexOf(a.id) > -1);
  }

  generateAddonButtonText(selectedAddonOptions) {
    if (selectedAddonOptions && selectedAddonOptions.length) {
      return addonSelectionDisplayText({ selectedAddonOptions });
    }
    return '-';
  }

  handleOpenModalClick(modalId) {
    return () => { this.props.activateModal({ modalId }); };
  }

  render() {
    const { selectedColor, colorCentsTotal } = this.props;
    const selectedAddonOptions = this.retrieveSelectedAddonOptions();
    const background = generateBackgroundValueFromColor(selectedColor);
    const hasDuoTone = selectedColor.hexValue
      ? separateHexColorsInString(selectedColor.hexValue).length === 2
      : false;

    return (
      <div className="FlashProductDisplayOptionsTouch">

        <ProductImageSlider />

        <div className="FlashProductDisplayOptionsTouch__options u-mb-normal u-mt-normal">
          <div
            onClick={this.handleOpenModalClick(ModalConstants.COLOR_SELECTION_MODAL)}
            className={classnames(
              'FlashProductDisplayOptionsTouch__option u-display--inline-block u-cursor--pointer',
              { 'FlashProductDisplayOptionsTouch__option--dark': isDarkLuminance(selectedColor) },
              { 'FlashProductDisplayOptionsTouch__option--extreme-light': isExtremeLightLuminance(selectedColor) },
            )}
            style={{ background }}
          >
            <div className="grid-middle-noGutter u-height--full">
              <div className="col">
                <div
                  className={classnames(
                  { 'FlashProductDisplayOptionsTouch__background-text': !!selectedColor.patternUrl || hasDuoTone },
                )}
                >
                  <span>{COLOR_HEADLINE}</span><br />
                  <span>{selectedColor.presentation} &nbsp;
                    {
                      colorCentsTotal ?
                      `+(${formatCents(colorCentsTotal, 0)})`
                      : null
                    }
                  </span>

                </div>
              </div>
            </div>
          </div>
          <div
            role="button"
            onClick={this.handleOpenModalClick(ModalConstants.STYLE_SELECTION_MODAL)}
            className={classnames(
              'Button Button--tertiary FlashProductDisplayOptionsTouch__option u-display--inline-block',
              { 'Button--selected': selectedAddonOptions.length },
            )}
          >
            <div className="grid-middle-noGutter u-height--full">
              <div className="col">
                <span>{STYLE_HEADLINE}</span><br />
                <span>{this.generateAddonButtonText(selectedAddonOptions)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="layout-container">
          <ExpressMaking mobile />
        </div>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
FlashProductDisplayOptionsTouch.propTypes = {
  // Redux Properties
  addonOptions: PropTypes.array.isRequired,
  selectedColor: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    centsTotal: PropTypes.number,
    hexValue: PropTypes.string,
  }).isRequired,
  selectedStyleCustomizations: PropTypes.arrayOf(PropTypes.number),
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
  colorCentsTotal: PropTypes.number,
};
FlashProductDisplayOptionsTouch.defaultProps = {
  selectedStyleCustomizations: [],
  colorCentsTotal: 0,
};

export default connect(stateToProps, dispatchToProps)(FlashProductDisplayOptionsTouch);
