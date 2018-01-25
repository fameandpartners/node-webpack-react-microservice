import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'ACTIVATE_BD_COLOR_DRAWER',
    'BD_ACTIVATE_CUSTOMIZATION_DRAWER',
    'SET_BD_CUSTOMIZATION_SECTION',
    'SET_BD_TEMPORARY_COLOR',
    'SET_BD_TEMPORARY_CUSTOMIZATION_DETAILS',
    'SET_BD_TEMPORARY_LENGTH',
    'SET_BD_INCOMPATABILITIES',
    'SET_BD_INCOMPATABILITIES_LOADING',

    // Customization selection screen
    'SAVE_BD_TEMPORARY_CUSTOMIZATIONS',
    'SELECT_BD_CUSTOMIZATION_DETAIL',

    // Color selection Screen
    'SELECT_PRODUCT_COLOR',
  ]),
);

const productCustomizationDrawers = assign({},
  mirrorCreator([
    'COLOR_CUSTOMIZE',
    'LENGTH_CUSTOMIZE',
    'BODICE_CUSTOMIZE',
    'STRAPS_SLEEVES_CUSTOMIZE',
    'SILHOUTTE_CUSTOMIZE',
    'DETAILS_CUSTOMIZE',
  ]),
);

const productCustomizationHeadlines = {
  headlines: {
    COLOR_CUSTOMIZE: 'Color',
    LENGTH_CUSTOMIZE: 'Length',
    BODICE_CUSTOMIZE: 'Bodice',
    STRAPS_SLEEVES_CUSTOMIZE: 'Straps & Sleeves',
    SILHOUTTE_CUSTOMIZE: 'Silhouette',
    DETAILS_CUSTOMIZE: 'Details',
    CUSTOMIZATIONS_HEADLINE: 'Customizations',
  },
};

const productCustomizationGroupNames = {
  groupNames: {
    LENGTH_CUSTOMIZE: 'Lengths',
    COLOR_CUSTOMIZE: 'Color',
    BODICE_CUSTOMIZE: 'Bodice',
    STRAPS_SLEEVES_CUSTOMIZE: 'Straps & Sleeves',
    SILHOUTTE_CUSTOMIZE: 'Silhouette',
    DETAILS_CUSTOMIZE: 'Details',
  },
};

const productCustomizationlengthNames = {
  lengthNames: {
    l0: 'Cheeky',
    l1: 'Short',
    l2: 'Midi',
    l3: 'Ankle',
    l4: 'Full',
    l5: 'Extra',
  },
};

const colorCustomizationNames = {
  colorNames: {
    'Bright Turquoise': '0000',
    'Pale Blue': '0001',
    Blush: '0002',
    Guava: '0003',
    Burgundy: '0004',
    Champagne: '0005',
    Ivory: '0006',
    Lilac: '0007',
    Mint: '0008',
    'Pale Grey': '0009',
    'Pale Pink': '0010',
    Peach: '0011',
    Red: '0012',
    'Royal Blue': '0013',
    Black: '0014',
    'Sage Green': '0015',
    Berry: '0016',
    Navy: '0017',
  },
};

export default assign({},
  actionTypes,
  colorCustomizationNames,
  productCustomizationDrawers,
  productCustomizationHeadlines,
  productCustomizationGroupNames,
  productCustomizationlengthNames,
);
