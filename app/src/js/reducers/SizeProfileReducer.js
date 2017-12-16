import Immutable from 'immutable';
import SizeProfileConstants from '../constants/SizeProfileConstants';
import { UNITS } from '../constants/ProductConstants';

export const $$initialState = Immutable.fromJS({
  // String ['cm', 'inch']
  temporaryMeasurementMetric: UNITS.INCH,
  selectedMeasurementMetric: UNITS.INCH,

  // Number
  temporaryHeightValue: null,
  selectedHeightValue: null,

  // String
  temporaryWeightValue: null,
  selectedWeightValue: null,

  // Number
  temporaryAgeValue: null,
  selectedAgeValue: null,

  // String
  temporaryBustValue: null,
  selectedBustValue: null,

  // String
  temporaryWaistValue: null,
  selectedWaistValue: null,

  // Number
  temporaryDressSize: null,
  selectedDressSize: null,

  // Number
  temporaryFittedDressSize: null,
  selectedFittedDressSize: null,

  // Number
  temporaryJeanSize: null,
  selectedJeanSize: null,

  // String
  temporaryBraSize: null,
  selectedBraSize: null,
});

export default function SizeProfileReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    // GENERAL
    case SizeProfileConstants.SET_SIZE_PROFILE_ERROR: {
      return $$state.merge({
        heightError: action.heightError,
        sizeError: action.sizeError,
      });
    }
    // HEIGHT
    case SizeProfileConstants.UPDATE_MEASUREMENT_METRIC: {
      if (action.selectedMeasurementMetric) {
        return $$state.merge({
          temporaryMeasurementMetric: action.selectedMeasurementMetric,
          selectedMeasurementMetric: action.selectedMeasurementMetric,
        });
      }
      return $$state.merge({
        temporaryMeasurementMetric: action.temporaryMeasurementMetric,
      });
    }
    case SizeProfileConstants.UPDATE_HEIGHT_SELECTION: {
      if (action.selectedHeightValue) {
        return $$state.merge({
          selectedHeightValue: action.selectedHeightValue,
          temporaryHeightValue: action.selectedHeightValue,
        });
      }
      return $$state.merge({
        temporaryHeightValue: action.temporaryHeightValue,
      });
    }
    // WEIGHT
    case SizeProfileConstants.UPDATE_WEIGHT_SELECTION: {
      if (action.selectedWeightValue) {
        return $$state.merge({
          selectedWeightValue: action.selectedWeightValue,
          temporaryWeightValue: action.selectedWeightValue,
        });
      }
      return $$state.merge({
        temporaryWeightValue: action.temporaryWeightValue,
      });
    }
    // AGE
    case SizeProfileConstants.UPDATE_AGE_SELECTION: {
      if (action.selectedAgeValue) {
        return $$state.merge({
          selectedAgeValue: action.selectedAgeValue,
          temporaryAgeValue: action.selectedAgeValue,
        });
      }
      return $$state.merge({
        temporaryAgeValue: action.temporaryAgeValue,
      });
    }
    // FITTED DRESS SIZING
    case SizeProfileConstants.UPDATE_BUST_SELECTION: {
      if (action.selectedBustValue) {
        return $$state.merge({
          selectedBustValue: action.selectedBustValue,
          temporaryBustValue: action.selectedBustValue,
        });
      }
      return $$state.merge({
        temporaryBustValue: action.temporaryBustValue,
      });
    }
    case SizeProfileConstants.UPDATE_WAIST_SELECTION: {
      if (action.selectedWaistValue) {
        return $$state.merge({
          selectedWaistValue: action.selectedWaistValue,
          temporaryWaistValue: action.selectedWaistValue,
        });
      }
      return $$state.merge({
        temporaryWaistValue: action.temporaryWaistValue,
      });
    }
    case SizeProfileConstants.UPDATE_HIP_SELECTION: {
      if (action.selectedHipValue) {
        return $$state.merge({
          selectedHipValue: action.selectedHipValue,
          temporaryHipValue: action.selectedHipValue,
        });
      }
      return $$state.merge({
        temporaryHipValue: action.temporaryHipValue,
      });
    }
    // DRESS SIZE
    case SizeProfileConstants.UPDATE_DRESS_SIZE_SELECTION: {
      if (typeof action.selectedDressSize === 'number') {
        return $$state.merge({
          selectedDressSize: action.selectedDressSize,
          temporaryDressSize: action.selectedDressSize,
        });
      }

      return $$state.merge({
        temporaryDressSize: action.temporaryDressSize,
      });
    }
    case SizeProfileConstants.UPDATE_FITTED_DRESS_SIZE_SELECTION: {
      if (typeof action.selectedFittedDressSize === 'number') {
        return $$state.merge({
          selectedFittedDressSize: action.selectedFittedDressSize,
          temporaryFittedDressSize: action.selectedFittedDressSize,
        });
      }

      return $$state.merge({
        temporaryFittedDressSize: action.temporaryFittedDressSize,
      });
    }
    // DRESS FIT
    case SizeProfileConstants.UPDATE_JEAN_SELECTION: {
      if (action.selectedJeanSize) {
        return $$state.merge({
          selectedJeanSize: action.selectedJeanSize,
          temporaryJeanSize: action.selectedJeanSize,
        });
      }
      return $$state.merge({
        temporaryJeanSize: action.temporaryJeanSize,
      });
    }
    case SizeProfileConstants.UPDATE_BRA_SELECTION: {
      if (action.selectedBraSize) {
        return $$state.merge({
          selectedBraSize: action.selectedBraSize,
          temporaryBraSize: action.selectedBraSize,
        });
      }
      return $$state.merge({
        temporaryBraSize: action.temporaryBraSize,
      });
    }

    default: {
      return $$state;
    }
  }
}
