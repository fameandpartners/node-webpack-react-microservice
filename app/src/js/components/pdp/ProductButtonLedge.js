import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TransitionMotion } from 'react-motion';

// CSS
import '../../../css/components/ProductButtonLedge.scss';

// Utilities
import noop from '../../libs/noop';


// Actions
import * as CustomizationActions from '../../actions/CustomizationActions';

// Constants
import * as modalAnimations from '../../utilities/modal-animation';
import { COLOR_CUSTOMIZE, STYLE_CUSTOMIZE, SIZE_CUSTOMIZE } from '../../constants/CustomizationConstants';

// UI Components
import ButtonLedge from '../generic/ButtonLedge';

function stateToProps(state) {
  return {
    productCustomizationDrawerOpen: state.$$customizationState.get('productCustomizationDrawerOpen'),
    productCustomizationDrawer: state.$$customizationState.get('productCustomizationDrawer'),
    temporaryDressSize: state.$$customizationState.get('temporaryDressSize'),
    temporaryHeightValue: state.$$customizationState.get('temporaryHeightValue'),
    temporaryMeasurementMetric: state.$$customizationState.get('temporaryMeasurementMetric'),
  };
}

function dispatchToProps(dispatch) {
  const customizationActions = bindActionCreators(CustomizationActions, dispatch);
  return {
    activateCustomizationDrawer: customizationActions.activateCustomizationDrawer,
    updateDressSizeSelection: customizationActions.updateDressSizeSelection,
    updateHeightSelection: customizationActions.updateHeightSelection,
    updateMeasurementMetric: customizationActions.updateMeasurementMetric,
  };
}

class ProductButtonLedge extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleLeftButtonClick() {
    this.props.activateCustomizationDrawer({ isActive: false });
  }

  saveColorSelection() {
    // Check if valid
    // If Valid
  }

  saveStyleSelection() {
    const { updateDressSizeSelection } = this.props;
    // Check if valid
    // If Valid
    updateDressSizeSelection();
  }

  saveSizeSeletion() {
    console.warn('need to check validity......');
    // Check if valid
    // If Valid
    const {
      activateCustomizationDrawer,
      temporaryDressSize,
      temporaryMeasurementMetric,
      temporaryHeightValue,
      updateDressSizeSelection,
      updateHeightSelection,
      updateMeasurementMetric,
    } = this.props;


    updateDressSizeSelection({
      selectedDressSize: temporaryDressSize,
    });

    updateHeightSelection({
      selectedHeightValue: temporaryHeightValue,
    });

    updateMeasurementMetric({
      selectedMeasurementMetric: temporaryMeasurementMetric,
    });


    activateCustomizationDrawer({ isActive: false });
  }

  handleRightButtonClick() {
    const { productCustomizationDrawer } = this.props;
    switch (productCustomizationDrawer) {
      case COLOR_CUSTOMIZE:
        return this.saveColorSelection;
      case STYLE_CUSTOMIZE:
        return this.saveStyleSelection;
      case SIZE_CUSTOMIZE:
        return this.saveSizeSeletion;
      default:
        return noop;
    }
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
    const {
      productCustomizationDrawerOpen,
    } = this.props;
    return (
      <TransitionMotion
        styles={productCustomizationDrawerOpen ? [this.defaultStyles()] : []}
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
                className="ProductButtonLedge width--full"
                style={{
                  transform: `translate3d(0, ${style.y}%, 0)`,
                }}
              >
                <ButtonLedge
                  handleLeftButtonClick={this.handleLeftButtonClick}
                  handleRightButtonClick={this.handleRightButtonClick()}
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

ProductButtonLedge.propTypes = {
  // Redux Props
  productCustomizationDrawerOpen: PropTypes.bool,
  productCustomizationDrawer: PropTypes.string,
  temporaryDressSize: PropTypes.number.isRequired,
  temporaryHeightValue: PropTypes.number.isRequired,
  temporaryMeasurementMetric: PropTypes.string.isRequired,
  // Redux Actions
  activateCustomizationDrawer: PropTypes.func.isRequired,
  updateDressSizeSelection: PropTypes.func.isRequired,
  updateHeightSelection: PropTypes.func.isRequired,
  updateMeasurementMetric: PropTypes.func.isRequired,
};

ProductButtonLedge.defaultProps = {
  productCustomizationDrawerOpen: false,
  productCustomizationDrawer: null,
};

export default connect(stateToProps, dispatchToProps)(ProductButtonLedge);
