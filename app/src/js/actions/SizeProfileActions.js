import SizeProfileConstants from '../constants/SizeProfileConstants';

// ERROR ACTIONS

export function setStandardSizeError({
  standardHeightError = false,
  standardSizeError = false,
}) {
  return {
    type: SizeProfileConstants.SET_STANDARD_SIZE_ERROR,
    standardHeightError,
    standardSizeError,
  };
}

export function setClothingSizeError({
  braSizeError = false,
  jeanSizeError = false,
}) {
  return {
    type: SizeProfileConstants.SET_CLOTHING_SIZE_ERROR,
    braSizeError,
    jeanSizeError,
  };
}

export function setBodySizeError({
  heightError = false,
  weightError = false,
  ageError = false,
}) {
  return {
    type: SizeProfileConstants.SET_BODY_SIZE_ERROR,
    heightError,
    weightError,
    ageError,
  };
}

export function setDressFitError({
  bustFitError = false,
  waistFitError = false,
  hipsFitError = false,
}) {
  return {
    type: SizeProfileConstants.SET_DRESS_FIT_ERROR,
    bustFitError,
    waistFitError,
    hipsFitError,
  };
}

export function setDressSizeError({
  dressSizeError = false,
}) {
  return {
    type: SizeProfileConstants.SET_DRESS_SIZE_ERROR,
    dressSizeError,
  };
}

// UPDATE ACTIONS

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

export function updateBustSelection({
  temporaryBustValue,
  selectedBustValue,
}) {
  return {
    type: SizeProfileConstants.UPDATE_BUST_SELECTION,
    selectedBustValue,
    temporaryBustValue,
  };
}

export function updateWaistSelection({
  temporaryWaistValue,
  selectedWaistValue,
}) {
  return {
    type: SizeProfileConstants.UPDATE_WAIST_SELECTION,
    selectedWaistValue,
    temporaryWaistValue,
  };
}

export function updateHipSelection({
  temporaryHipValue,
  selectedHipValue,
}) {
  return {
    type: SizeProfileConstants.UPDATE_HIP_SELECTION,
    selectedHipValue,
    temporaryHipValue,
  };
}

export function updateJeanSelection({
  temporaryJeanSize,
  selectedJeanSize,
}) {
  return {
    type: SizeProfileConstants.UPDATE_JEAN_SELECTION,
    selectedJeanSize,
    temporaryJeanSize,
  };
}

export function updateBraSelection({
  temporaryBraSize,
  selectedBraSize,
}) {
  return {
    type: SizeProfileConstants.UPDATE_BRA_SELECTION,
    selectedBraSize,
    temporaryBraSize,
  };
}

export function updateDressSizeSelection({ temporaryDressSize, selectedDressSize }) {
  return {
    type: SizeProfileConstants.UPDATE_DRESS_SIZE_SELECTION,
    selectedDressSize,
    temporaryDressSize,
  };
}

export function updateFittedDressSizeSelection({
  temporaryFittedDressSize,
  selectedFittedDressSize,
}) {
  return {
    type: SizeProfileConstants.UPDATE_FITTED_DRESS_SIZE_SELECTION,
    selectedFittedDressSize,
    temporaryFittedDressSize,
  };
}

export default {
  setStandardSizeError,
  setClothingSizeError,
  setBodySizeError,
  setDressFitError,
  setDressSizeError,
  updateMeasurementMetric,
  updateHeightSelection,
  updateWeightSelection,
  updateAgeSelection,
  updateDressSizeSelection,
  updateFittedDressSizeSelection,
  updateBustSelection,
  updateWaistSelection,
  updateHipSelection,
  updateBraSelection,
  updateJeanSelection,
};
