import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'ACTIVATE_COLOR_DRAWER',
    'ACTIVATE_CUSTOMIZATION_DRAWER',
    'CHANGE_CUSTOMIZATION_DRAWER',
    'SELECT_PRODUCT_COLOR',
  ]),
);

const productCustomizationDrawer = assign({},
  mirrorCreator([
    'COLOR_CUSTOMIZE',
    'STYLE_CUSTOMIZE',
    'SIZE_CUSTOMIZE',
  ]),
);

export default assign({},
  actionTypes,
  productCustomizationDrawer,
);
