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

export function saveBDCustomizationDetailSelections({ temporaryCustomizationDetails }) {
  return {
    type: BDCustomizationConstants.SAVE_BD_CUSTOMIZATION_DETAIL_SELECTIONS,
    temporaryCustomizationDetails,
  };
}

export function setBDTemporaryCustomizationDetails({ temporaryCustomizationDetails }) {
  return {
    type: BDCustomizationConstants.SET_BD_TEMPORARY_CUSTOMIZATION_DETAILS,
    temporaryCustomizationDetails,
  };
}

export function setBDCustomizationSection({ sectionId }) {
  return {
    type: BDCustomizationConstants.SET_BD_CUSTOMIZATION_SECTION,
    sectionId,
  };
}


export default {
  bdActivateCustomizationDrawer,
  setBDTemporaryCustomizationDetails,
  setBDCustomizationSection,
};
