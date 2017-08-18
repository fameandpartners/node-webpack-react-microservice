import Immutable from 'immutable';
import CustomizationConstants from '../constants/CustomizationConstants';
import StyleConstants from '../constants/StyleConstants';

export const $$initialState = Immutable.fromJS({

  // ArrayOf({
  //   centsPrice: Number
  //   smallImg: String,
  //   productId: String,
  //   productTitle: String,
  //   url: String,
  // })
  complementaryProducts: [],

  // ArrayOf({
  //   title: String,
  //   bigImg: String
  // })
  customizations: [],

  // String
  currency: null,

  // ObjectOf({
  //   id: String,
  //   smallImg: String,
  //   name: String,
  //   description: String,
  // })
  fabric: null,

  // String
  garmentCareInformation: null,


  // ArrayOf({
  //   id: String,
  //   smallImg: String,
  //   description: String,
  //   preSelectedCustomizations: {}
  // })
  preCustomizations: [],

  // String
  productId: null,

  // Number
  productCentsBasePrice: null,

  // ArrayOf({
  //   id: String,
  //   name: String,
  //   hexValue: String,
  //   patternUrl: String,
  // })
  productDefaultColors: [],

  // Number
  productSecondaryColorCentsPrice: null,

  // ArrayOf({
  //   id: String,
  //   name: String,
  //   hexValue: String,
  //   patternUrl: String,
  // })
  productSecondaryColors: [],

  // String
  productDescription: null,

  // String
  productTitle: null,

  // ArrayOf({
  //   smallImg: String,
  //   bigImg: String
  // })
  productImages: [],

  // String
  modelDescription: null,

  // Addon area
  addons: {
    // Marry previous customizations to addons
    addonLayerImages: [],
    selectedAddonImageLayers: [],
    addonOptions: [],
    baseImages: [],
    baseSelected: null,
    addonsLayersComputed: [],
    addonsBasesComputed: [],
  },
});

export default function ProductReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    case CustomizationConstants.ACTIVATE_COLOR_DRAWER: {
      return $$state.merge({
        productCustomizationDrawer: CustomizationConstants.COLOR_CUSTOMIZE,
        productCustomizationDrawerOpen: action.isActive,
      });
    }
    case StyleConstants.SET_ACTIVE_ADDON_IMAGE_LAYERS: {
      return $$state.merge({
        addons: $$state.get('addons').merge({ selectedAddonImageLayers: action.addonImageLayers }),
      });
    }
    case StyleConstants.SET_ADDON_BASE_LAYER: {
      return $$state.merge({
        addons: $$state.get('addons').merge({ baseSelected: action.baseSelected }),
      });
    }
    case StyleConstants.SET_STYLE_ADDON_OPTIONS: {
      return $$state.merge({
        addons: $$state.get('addons').merge({ addonOptions: action.addonOptions }),
      });
    }
    default: {
      return $$state;
    }
  }
}
