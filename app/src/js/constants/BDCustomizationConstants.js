import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'ACTIVATE_BD_COLOR_DRAWER',
    'BD_ACTIVATE_CUSTOMIZATION_DRAWER',
    'SET_BD_CUSTOMIZATION_SECTION',
    'SET_BD_TEMPORARY_CUSTOMIZATION_DETAILS',

    // Customization selection screen
    'SAVE_BD_CUSTOMIZATION_DETAIL_SELECTIONS',
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

export default assign({},
  actionTypes,
  productCustomizationDrawers,
  productCustomizationHeadlines,
);
