import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'ACTIVATE_BD_COLOR_DRAWER',
    'BD_ACTIVATE_CUSTOMIZATION_DRAWER',
    'SET_BD_CUSTOMIZATION_SECTION',
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
  COLOR_HEADLINE: 'Color',
  LENGTH_HEADLINE: 'Length',
  BODICE_HEADLINE: 'Bodice',
  STRAPS_HEADLINE: 'Straps & Sleeves',
  SILHOUTTE_HEADLINE: 'Straps & Sleeves',
  DETAILS_HEADLINE: 'Details',
  CUSTOMIZATIONS_HEADLINE: 'Customizations',
};

export default assign({},
  actionTypes,
  productCustomizationDrawers,
  productCustomizationHeadlines,
);
