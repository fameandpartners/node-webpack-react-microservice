import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'ACTIVATE_COLOR_DRAWER',
    'ACTIVATE_CUSTOMIZATION_DRAWER',
    'CHANGE_CUSTOMIZATION_DRAWER',
    'SELECT_PRODUCT_COLOR',
    'SET_ACTIVE_ADDON_IMAGE_LAYERS',
    'SET_ADDON_BASE_LAYER',
    'SET_SIZE_PROFILE_ERROR',
    'SET_EXPRESS_MAKING_STATUS',
    'SET_SUPER_EXPRESS_MAKING_STATUS',
    'UPDATE_CUSTOMIZATION_STYLE_SELECTION',
    'UPDATE_DRESS_SIZE_SELECTION',
    'UPDATE_MEASUREMENT_METRIC',
    'UPDATE_HEIGHT_SELECTION',
  ]),
);

const productCustomizationDrawers = assign({},
  mirrorCreator([
    'COLOR_CUSTOMIZE',
    'STYLE_CUSTOMIZE',
    'SIZE_CUSTOMIZE',
  ]),
);

const productCustomizationHeadlines = {
  COLOR_HEADLINE: 'Choose your Color',
  FABRIC_COLOR_HEADLINE: 'Choose your Fabric&nbsp;+&nbsp;Color',
  STYLE_HEADLINE: 'Customize the Design',
  SIZE_HEADLINE: 'Select your Size',
};

export default assign({},
  actionTypes,
  productCustomizationDrawers,
  productCustomizationHeadlines,
);
