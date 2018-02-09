import BDCustomizationConstants from '../constants/BDCustomizationConstants';

export function bdActivateCustomizationDrawer({
  isActive = true,
  bdProductCustomizationDrawer,
}) {
  return {
    type: BDCustomizationConstants.BD_ACTIVATE_CUSTOMIZATION_DRAWER,
    isActive,
    bdProductCustomizationDrawer,
  };
}

export function saveBDTemporaryCustomizations() {
  return {
    type: BDCustomizationConstants.SAVE_BD_TEMPORARY_CUSTOMIZATIONS,
  };
}

export function setBDTemporaryColor({ temporaryBDCustomizationColor }) {
  return {
    type: BDCustomizationConstants.SET_BD_TEMPORARY_COLOR,
    temporaryBDCustomizationColor,
  };
}

export function setBDColor({ selectedBDCustomizationColor }) {
  return {
    type: BDCustomizationConstants.SET_BD_COLOR,
    selectedBDCustomizationColor,
  };
}

export function setBDTemporaryCustomizationDetails({ temporaryCustomizationDetails }) {
  return {
    type: BDCustomizationConstants.SET_BD_TEMPORARY_CUSTOMIZATION_DETAILS,
    temporaryCustomizationDetails,
  };
}

export function setBDTemporaryLength({ temporaryBDCustomizationLength }) {
  return {
    type: BDCustomizationConstants.SET_BD_TEMPORARY_LENGTH,
    temporaryBDCustomizationLength,
  };
}

export function setBDLength({ selectedBDCustomizationLength }) {
  return {
    type: BDCustomizationConstants.SET_BD_LENGTH,
    selectedBDCustomizationLength,
  };
}

export function setBDCustomizationSection({ sectionId }) {
  return {
    type: BDCustomizationConstants.SET_BD_CUSTOMIZATION_SECTION,
    sectionId,
  };
}

export function setBDIncompatabilities({ incompatabilities, temporaryCustomizationCombinationId }) {
  return {
    type: BDCustomizationConstants.SET_BD_INCOMPATABILITIES,
    incompatabilities,
    temporaryCustomizationCombinationId,
  };
}

export function setBDIncompatabilitiesLoading({ isLoading }) {
  return {
    type: BDCustomizationConstants.SET_BD_INCOMPATABILITIES_LOADING,
    isLoading,
  };
}

// UNDO ACTIONS
export function undoBDTemporaryCustomizationDetails({ undoArray, lastTemporaryItemSelection }) {
  return {
    type: BDCustomizationConstants.UNDO_BD_TEMPORARY_CUSTOMIZATION_DETAILS,
    undoArray,
    lastTemporaryItemSelection,
  };
}

export function redoBDTemporaryCustomizationDetails() {
  return {
    type: BDCustomizationConstants.REDO_BD_TEMPORARY_CUSTOMIZATION_DETAILS,
  };
}

export default {
  bdActivateCustomizationDrawer,
  setBDTemporaryColor,
  setBDTemporaryCustomizationDetails,
  setBDTemporaryLength,
  setBDCustomizationSection,
  setBDIncompatabilities,
  setBDIncompatabilitiesLoading,
  undoBDTemporaryCustomizationDetails,
};
