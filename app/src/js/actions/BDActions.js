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

export function setBDCustomizationSection({ sectionId }) {
  return {
    type: BDCustomizationConstants.SET_BD_CUSTOMIZATION_SECTION,
    sectionId,
  };
}


export default {
  bdActivateCustomizationDrawer,
  setBDCustomizationSection,
};
