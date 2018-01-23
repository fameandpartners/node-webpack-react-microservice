/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import ExpressMaking from '../pdp/ExpressMaking';
// Utilities
import {
  isDarkLuminance,
  isExtremeLightLuminance,
  generateBackgroundValueFromColor,
  separateHexColorsInString,
} from '../../utilities/color';
import { addonSelectionDisplayText } from '../../utilities/pdp';
import { removeLengthFromAddons } from '../../utilities/bridesmaids';

// UI Components
// import ProductImageSlider from '../pdp/ProductImageSlider';
// REMOVE COMPONENTS
import CliqueCallout from '../pdp/CliqueCallout';

// Constants
import BDModalConstants from '../../constants/BDModalConstants';
import {
  BODICE_CUSTOMIZE,
  COLOR_HEADLINE,
  LENGTH_CUSTOMIZE,
  LENGTH_HEADLINE,
  CUSTOMIZATIONS_HEADLINE,
} from '../../constants/BDCustomizationConstants';


// Actions
import * as ModalActions from '../../actions/ModalActions';
import * as BDActions from '../../actions/BDActions';

// CSS
import '../../../css/components/BDProductDisplayOptionsTouch.scss';


function stateToProps(state) {
  const selectedColorPresentation = state.$$bdCustomizationState.get('selectedBDCustomizationColor');
  const productDefaultColors = state.$$productState.get('productDefaultColors').toJS();
  const selectedColor = productDefaultColors.find(
    c => selectedColorPresentation === c.presentation,
  );
  // Which part of the Redux global state does our component want to receive as props?
  return {
    addonOptions: state.$$customizationState.get('addons').get('addonOptions').toJS(),
    selectedColor,
    selectedCustomizationDetails: state.$$bdCustomizationState.get('selectedCustomizationDetails'),
  };
}

function dispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  const { setBDCustomizationSection } = bindActionCreators(BDActions, dispatch);
  return {
    activateModal,
    setBDCustomizationSection,
  };
}

class BDProductDisplayOptionsTouch extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  retrieveSelectedAddonOptions() {
    const { addonOptions, selectedCustomizationDetails } = this.props;
    return removeLengthFromAddons(addonOptions).filter(
      a => selectedCustomizationDetails.indexOf(a.id) > -1,
    );
  }

  generateAddonButtonText(selectedAddonOptions) {
    if (selectedAddonOptions && selectedAddonOptions.length) {
      return addonSelectionDisplayText({ selectedAddonOptions });
    }
    return 'Choose Your Customizations';
  }

  handleOpenModalClick(modalId) {
    return () => { this.props.activateModal({ modalId }); };
  }

  handleOpenBDCustomizationModal(sectionId) {
    return () => {
      this.props.setBDCustomizationSection({ sectionId });
      this.props.activateModal(
        { modalId: BDModalConstants.BD_CUSTOMIZATION_MODAL },
      );
    };
  }

  render() {
    const {
      breakpoint,
      selectedColor,
    } = this.props;
    const selectedAddonOptions = this.retrieveSelectedAddonOptions();
    const background = generateBackgroundValueFromColor(selectedColor);
    const hasDuoTone = selectedColor.hexValue
      ? separateHexColorsInString(selectedColor.hexValue).length === 2
      : false;

    return (
      <div className="BDProductDisplayOptionsTouch">

        <div className="BDProductDisplayOptionsTouch__options u-mb-normal u-mt-normal">
          <div
            onClick={this.handleOpenModalClick(BDModalConstants.BD_COLOR_SELECTION_MODAL)}
            className={classnames(
              'BDProductDisplayOptionsTouch__option u-display--inline-block u-cursor--pointer',
              { 'BDProductDisplayOptionsTouch__option--dark': isDarkLuminance(selectedColor) },
              { 'BDProductDisplayOptionsTouch__option--extreme-light': isExtremeLightLuminance(selectedColor) },
            )}
            style={{ background }}
          >
            <div className="grid-middle-noGutter u-height--full">
              <div className="col">
                <div
                  className={classnames(
                  { 'BDProductDisplayOptionsTouch__background-text': !!selectedColor.patternUrl || hasDuoTone },
                )}
                >
                  <span>{COLOR_HEADLINE}</span><br />
                  <span>{selectedColor.presentation}</span>

                </div>
              </div>
            </div>
          </div>

          { breakpoint === 'tablet'
            ? (
              <div
                onClick={this.handleOpenBDCustomizationModal(LENGTH_CUSTOMIZE)}
                className={classnames(
                  'Button Button--tertiary BDProductDisplayOptionsTouch__option u-display--inline-block',
                  { 'Button--selected': selectedAddonOptions.length },
                )}
              >
                <div className="grid-middle-noGutter u-height--full">
                  <div className="col">
                    <span>{LENGTH_HEADLINE}</span><br />
                    <span>[Mini +$10]</span>
                  </div>
                </div>
              </div>
            ) : null
          }

          <div
            role="button"
            onClick={this.handleOpenBDCustomizationModal(
              breakpoint === 'tablet' ? LENGTH_CUSTOMIZE : BODICE_CUSTOMIZE,
            )}
            className={classnames(
              'Button Button--tertiary BDProductDisplayOptionsTouch__option u-display--inline-block',
              { 'Button--selected': selectedAddonOptions.length },
            )}
          >
            <div className="grid-middle-noGutter u-height--full">
              <div className="col">
                <span>{CUSTOMIZATIONS_HEADLINE}</span><br />
                <span>{this.generateAddonButtonText(selectedAddonOptions)}</span>
              </div>
            </div>
          </div>

        </div>
        <div className="layout-container">
          <CliqueCallout />
          <ExpressMaking mobile />
        </div>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
BDProductDisplayOptionsTouch.propTypes = {
  // Redux Properties
  addonOptions: PropTypes.array.isRequired,
  breakpoint: PropTypes.string.isRequired,
  selectedColor: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    centsTotal: PropTypes.number,
    hexValue: PropTypes.string,
  }).isRequired,
  selectedCustomizationDetails: PropTypes.arrayOf(PropTypes.number),
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
  setBDCustomizationSection: PropTypes.func.isRequired,
};
BDProductDisplayOptionsTouch.defaultProps = {
  selectedCustomizationDetails: [],
};

export default connect(stateToProps, dispatchToProps)(BDProductDisplayOptionsTouch);
