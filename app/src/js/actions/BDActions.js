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

export function setBDCustomizationSection({ sectionId }) {
  return {
    type: BDCustomizationConstants.SET_BD_CUSTOMIZATION_SECTION,
    sectionId,
  };
}

export function setBDIncompatabilities({ incompatabilities }) {
  return {
    type: BDCustomizationConstants.SET_BD_INCOMPATABILITIES,
    incompatabilities,
  };
}


export default {
  bdActivateCustomizationDrawer,
  setBDTemporaryColor,
  setBDTemporaryCustomizationDetails,
  setBDTemporaryLength,
  setBDCustomizationSection,
  setBDIncompatabilities,
};
