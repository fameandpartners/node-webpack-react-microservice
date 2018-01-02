import BDCustomizationConstants from '../constants/BDCustomizationConstants';

export function setBDCustomizationSection({ sectionId }) {
  return {
    type: BDCustomizationConstants.SET_BD_CUSTOMIZATION_SECTION,
    sectionId,
  };
}

export default {
  setBDCustomizationSection,
};
