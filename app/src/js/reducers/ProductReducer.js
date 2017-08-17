import Immutable from 'immutable';
import ProductConstants from '../constants/ProductConstants';
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

  // String ['COLOR_CUSTOMIZE', 'STYLE_CUSTOMIZE', 'SIZE_PROFILE']
  productCustomizationDrawer: ProductConstants.COLOR_CUSTOMIZE,

  // Bool
  productCustomizationDrawerOpen: false,


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

  // ObjectOf({
  //   id: String,
  //   name: String,
  //   centsTotal: Number,
  //   hexValue: String,
  //   patternUrl,
  // })
  selectedColor: null,

  // ObjectOf({
  //   id: String,
  //   description: String,
  // })
  selectedCustomizations: null,

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
    case ProductConstants.ACTIVATE_COLOR_DRAWER: {
      return $$state.merge({
        productCustomizationDrawer: ProductConstants.COLOR_CUSTOMIZE,
        productCustomizationDrawerOpen: action.isActive,
      });
    }
    case ProductConstants.ACTIVATE_CUSTOMIZATION_DRAWER: {
      return $$state.merge({
        productCustomizationDrawerOpen: action.isActive,
      });
    }
    case ProductConstants.CHANGE_CUSTOMIZATION_DRAWER: {
      return $$state.merge({
        productCustomizationDrawer: action.productCustomizationDrawer,
      });
    }
    case ProductConstants.SELECT_PRODUCT_COLOR: {
      return $$state.merge({
        selectedColor: action.color,
      });
    }
    case StyleConstants.SET_ADDON_OPTIONS: {
      return $$state.merge({
        addons: $$state.get('addons').merge({ addonOptions: action.addonOptions }),
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
    default: {
      return $$state;
    }
  }
}
