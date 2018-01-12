import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TransitionMotion } from 'react-motion';

// CSS
// TODO: NEXT figure out what's going on here....
import '../../../css/components/CustomizationButtonLedge.scss';

// Utilities
import noop from '../../libs/noop';
import { dressSizePresence } from '../../utilities/pdpValidations';

// Actions
import * as BDActions from '../../actions/BDActions';
import * as CustomizationActions from '../../actions/CustomizationActions';
import * as AppActions from '../../actions/AppActions';
import * as ModalActions from '../../actions/ModalActions';

// Constants
import BDModalConstants from '../../constants/BDModalConstants';
import * as modalAnimations from '../../utilities/modal-animation';
import {
  COLOR_CUSTOMIZE,
} from '../../constants/BDCustomizationConstants';

import {
  UNITS,
  MIN_CM,
  MAX_CM,
} from '../../constants/ProductConstants';

// UI Components
import ButtonLedge from '../generic/ButtonLedge';

function stateToProps(state) {
  return {
    // Modal State
    modalIsOpen: state.$$modalState.get('shouldAppear'),
    activeModalId: state.$$modalState.get('modalId'),
    // Customziation State
    bdProductCustomizationDrawerOpen: state.$$bdCustomizationState.get('bdProductCustomizationDrawerOpen'),
    bdProductCustomizationDrawer: state.$$bdCustomizationState.get('bdProductCustomizationDrawer'),
    productDefaultColors: state.$$productState.get('productDefaultColors').toJS(),
    temporaryColor: state.$$customizationState.get('temporaryColor').toJS(),
    temporaryDressSize: state.$$customizationState.get('temporaryDressSize'),
    temporaryHeightValue: state.$$customizationState.get('temporaryHeightValue'),
    temporaryStyleCustomizations: state.$$customizationState.get('temporaryStyleCustomizations').toJS(),
    temporaryMeasurementMetric: state.$$customizationState.get('temporaryMeasurementMetric'),
  };
}

function dispatchToProps(dispatch) {
  const appActions = bindActionCreators(AppActions, dispatch);
  const bdActions = bindActionCreators(BDActions, dispatch);
  const modalActions = bindActionCreators(ModalActions, dispatch);
  return {
    activateModal: modalActions.activateModal,
    setShareableQueryParams: appActions.setShareableQueryParams,
    bdActivateCustomizationDrawer: bdActions.bdActivateCustomizationDrawer,
  };
}

class CustomizationButtonLedge extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleLeftButtonClick() {
    this.props.bdActivateCustomizationDrawer({ isActive: false });
    this.closeCustomization({ shouldAppear: false });
  }

  closeCustomization() {
    const { activateModal, activateCustomizationDrawer } = this.props;
    if (this.isCustomizationModalOpen()) {
      activateModal({ shouldAppear: false });
    } else {
      activateCustomizationDrawer({ isActive: false });
    }
  }

  isExpressEligible(colorId, defaultColors) {
    return defaultColors.filter(color => color.id === colorId).length > 0;
  }

  hasHeightError() {
    const {
     temporaryMeasurementMetric,
     temporaryHeightValue,
   } = this.props;

    return (
     !(temporaryHeightValue && temporaryMeasurementMetric) || // Not Present
     (temporaryMeasurementMetric === UNITS.CM &&
     (temporaryHeightValue < MIN_CM || temporaryHeightValue > MAX_CM))
    );
  }

  validateSizeSelection() {
    const { setSizeProfileError, temporaryDressSize } = this.props;
    const errors = { heightError: false, sizeError: false };

    if (this.hasHeightError() || !dressSizePresence(temporaryDressSize)) {
      if (this.hasHeightError()) { errors.heightError = true; }
      if (!temporaryDressSize) { errors.sizeError = true; }
      setSizeProfileError(errors);
      return false;
    }

    setSizeProfileError(errors);
    return true;
  }

  saveColorSelection() {
    const {
      selectProductColor,
      setShareableQueryParams,
      temporaryColor,
      productDefaultColors,
      setExpressMakingStatus,
    } = this.props;
    if (!this.isExpressEligible(temporaryColor.id, productDefaultColors)) {
      setExpressMakingStatus(false);
    }
    selectProductColor({ selectedColor: temporaryColor });
    setShareableQueryParams({ color: temporaryColor.id });
    this.closeCustomization();
  }

  saveCustomizationSelection() {
    console.log('determine which customization option to save....');
  }

  saveSizeSelection() {
    const {
      temporaryDressSize,
      temporaryMeasurementMetric,
      temporaryHeightValue,
      updateDressSizeSelection,
      updateHeightSelection,
      updateMeasurementMetric,
    } = this.props;
    if (!this.validateSizeSelection()) return null;

    updateDressSizeSelection({
      selectedDressSize: temporaryDressSize,
    });

    updateHeightSelection({
      selectedHeightValue: temporaryHeightValue,
    });

    updateMeasurementMetric({
      selectedMeasurementMetric: temporaryMeasurementMetric,
    });

    this.closeCustomization();
    return null;
  }

  chooseCustomizationCallback() {
    const { activeModalId, bdProductCustomizationDrawer } = this.props;
    if (
      // Checks for modal or drawer scenario
      activeModalId === BDModalConstants.COLOR_SELECTION_MODAL
      || bdProductCustomizationDrawer === COLOR_CUSTOMIZE
    ) {
      return this.saveColorSelection;
    }

    if (
      activeModalId === BDModalConstants.BD_CUSTOMIZATION_MODAL
    ) {
      return this.saveCustomizationSelection;
    }
    //
    // if (
    //   activeModalId === BDModalConstants.SIZE_SELECTION_MODAL
    //   || bdProductCustomizationDrawer === SIZE_CUSTOMIZE
    // ) {
    //   return this.saveSizeSelection;
    // }

    return noop;
  }

  isCustomizationModalOpen() {
    const {
      modalIsOpen,
      activeModalId,
    } = this.props;

    return modalIsOpen
    && (
      (activeModalId === BDModalConstants.BD_COLOR_SELECTION_MODAL)
      || (activeModalId === BDModalConstants.BD_CUSTOMIZATION_MODAL)
    );
  }

  isCustomizationOpen() {
    const { activeModalId, modalIsOpen } = this.props;
    if (modalIsOpen && activeModalId === BDModalConstants.SIZE_GUIDE_MODAL) {
      return false;
    }
    return (
      this.props.bdProductCustomizationDrawerOpen || this.isCustomizationModalOpen()
    );
  }

  defaultStyles() {
    return modalAnimations.SLIDE_UP_DEFAULT_STYLES;
  }

  willEnter() {
    return modalAnimations.SLIDE_UP_WILL_ENTER;
  }

  willLeave() {
    return modalAnimations.SLIDE_UP_WILL_LEAVE;
  }

  render() {
    return (
      <TransitionMotion
        styles={this.isCustomizationOpen() ? [this.defaultStyles()] : []}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {
        (items) => {
          if (items.length) {
            const { key, style } = items[0];
            return (
              <div
                key={key}
                className="CustomizationButtonLedge u-width--full"
                style={{
                  transform: `translate3d(0, ${style.y}%, 0)`,
                }}
              >
                <ButtonLedge
                  addHeight
                  handleLeftButtonClick={this.handleLeftButtonClick}
                  handleRightButtonClick={this.chooseCustomizationCallback()}
                />
              </div>
            );
          }
          return null;
        }
      }
      </TransitionMotion>
    );
  }
}

CustomizationButtonLedge.propTypes = {
  // Redux Props
  // -- Modal
  modalIsOpen: PropTypes.bool.isRequired,
  activeModalId: PropTypes.string,
  // -- Customizations
  bdProductCustomizationDrawerOpen: PropTypes.bool,
  bdProductCustomizationDrawer: PropTypes.string,
  temporaryColor: PropTypes.shape({
    id: PropTypes.number,
    centsTotal: PropTypes.number,
    name: PropTypes.string,
    presentation: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  }).isRequired,
  temporaryDressSize: PropTypes.number,
  temporaryHeightValue: PropTypes.number,
  temporaryMeasurementMetric: PropTypes.string.isRequired,
  // temporaryStyleCustomizations: PropTypes.arrayOf(PropTypes.number),
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
  activateCustomizationDrawer: PropTypes.func.isRequired,
  bdActivateCustomizationDrawer: PropTypes.func.isRequired,
  // selectProductColor: PropTypes.func.isRequired,
  // setShareableQueryParams: PropTypes.func.isRequired,
  // setSizeProfileError: PropTypes.func.isRequired,
  // updateDressSizeSelection: PropTypes.func.isRequired,
  // updateHeightSelection: PropTypes.func.isRequired,
  // updateMeasurementMetric: PropTypes.func.isRequired,
  // updateCustomizationStyleSelection: PropTypes.func.isRequired,
  productDefaultColors: PropTypes.arrayOf(PropTypes.object),
  setExpressMakingStatus: PropTypes.func,
};

CustomizationButtonLedge.defaultProps = {
  activeModalId: null,
  bdProductCustomizationDrawerOpen: false,
  bdProductCustomizationDrawer: null,
  temporaryColor: null,
  temporaryDressSize: null,
  temporaryHeightValue: null,
  temporaryStyleCustomizations: [],
  productDefaultColors: [],
  setExpressMakingStatus: noop,
};

export default connect(stateToProps, dispatchToProps)(CustomizationButtonLedge);
