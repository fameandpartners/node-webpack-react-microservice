import SizeProfileConstants from '../constants/SizeProfileConstants';

export function setSizeProfileError({
  heightError = false,
  sizeError = false,
}) {
  return {
    type: SizeProfileConstants.SET_SIZE_PROFILE_ERROR,
    heightError,
    sizeError,
  };
}

export function updateMeasurementMetric({ selectedMeasurementMetric, temporaryMeasurementMetric }) {
  return {
    type: SizeProfileConstants.UPDATE_MEASUREMENT_METRIC,
    selectedMeasurementMetric,
    temporaryMeasurementMetric,
  };
}

export function updateHeightSelection({
  temporaryHeightValue,
  selectedHeightValue,
}) {
  return {
    type: SizeProfileConstants.UPDATE_HEIGHT_SELECTION,
    selectedHeightValue,
    temporaryHeightValue,
  };
}

export function updateWeightSelection({
  temporaryWeightValue,
  selectedWeightValue,
}) {
  return {
    type: SizeProfileConstants.UPDATE_WEIGHT_SELECTION,
    selectedWeightValue,
    temporaryWeightValue,
  };
}

export function updateAgeSelection({
  temporaryAgeValue,
  selectedAgeValue,
}) {
  return {
    type: SizeProfileConstants.UPDATE_AGE_SELECTION,
    selectedAgeValue,
    temporaryAgeValue,
  };
}

export function updateDressSizeSelection({ temporaryDressSize, selectedDressSize }) {
  return {
    type: SizeProfileConstants.UPDATE_DRESS_SIZE_SELECTION,
    selectedDressSize,
    temporaryDressSize,
  };
}

export default {
  setSizeProfileError,
  updateMeasurementMetric,
  updateHeightSelection,
  updateWeightSelection,
  updateAgeSelection,
  updateDressSizeSelection,
};