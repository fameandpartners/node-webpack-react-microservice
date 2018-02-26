import Immutable from 'immutable';
import CustomizationConstants from '../constants/CustomizationConstants';
import ProductConstants from '../constants/ProductConstants';

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

  // ArrayOf({
  //   id: Number,
  //   audPrice: String,
  //   belongsToColorGroups: ArrayOf(String),
  //   material: String,
  //   presentation: String,
  //   usdPrice: String,
  // })
  productDefaultFabrics: [],
  productSecondaryFabrics: [],

  // ArrayOf(Number)
  fabricColorGroupSelections: [],
  // ArrayOf(Number)
  fabricGroupSelections: [],

  // ArrayOf(String)
  fabricGroups: [],

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
  //   presentation: String,
  //   hexValue: String,
  //   patternUrl: String,
  // })
  productDefaultColors: [],
  productSecondaryColors: [],

  // ArrayOf({
  //   id: String,
  //   name: String,
  //   presentation: String,
  //   hexValue: String,
  //   patternUrl: String,
  // })
  productGroupColors: [],


  // Number
  productSecondaryColorsCentsPrice: null,

  // String
  productDescription: null,

  // String
  productTitle: null,

  // ArrayOf({
  //   id: Number,
  //   colorId: Number,
  //   smallImg: String,
  //   bigImg: String
  //   height: Number
  //   width: Number
  //   position: Number
  // })
  productImages: [],

  // Bool
  // Whether or not this product can be actively sold
  isActive: true,

  // String
  modelDescription: null,

  // ArrayOf({})
  sizeChart: [
    {
      'Size Aus/UK': 4,
      'Size US': 0,
      'Bust cm': '81',
      'Bust Inches': '32',
      'Underbust cm': 69,
      'Underbust Inches': '27',
      'Waist cm': '64',
      'Waist Inches': '25',
      'Hip cm': '89',
      'Hip Inches': '35',
    },
    {
      'Size Aus/UK': 6,
      'Size US': 2,
      'Bust cm': '84',
      'Bust Inches': '33',
      'Underbust cm': 71,
      'Underbust Inches': '28',
      'Waist cm': '66',
      'Waist Inches': '26',
      'Hip cm': '92',
      'Hip Inches': '36',
    },
    {
      'Size Aus/UK': 8,
      'Size US': 4,
      'Bust cm': '86',
      'Bust Inches': '34',
      'Underbust cm': 74,
      'Underbust Inches': '29',
      'Waist cm': '69',
      'Waist Inches': '27',
      'Hip cm': '94',
      'Hip Inches': '37',
    },
    {
      'Size Aus/UK': 10,
      'Size US': 6,
      'Bust cm': '89',
      'Bust Inches': '35',
      'Underbust cm': 76,
      'Underbust Inches': '30',
      'Waist cm': '71',
      'Waist Inches': '28',
      'Hip cm': '97',
      'Hip Inches': '38',
    },
    {
      'Size Aus/UK': 12,
      'Size US': 8,
      'Bust cm': '93',
      'Bust Inches': '36.5',
      'Underbust cm': 80,
      'Underbust Inches': '31.5',
      'Waist cm': '75',
      'Waist Inches': '29.5',
      'Hip cm': '100',
      'Hip Inches': '39.5',
    },
    {
      'Size Aus/UK': 14,
      'Size US': 10,
      'Bust cm': '97',
      'Bust Inches': '38',
      'Underbust cm': 84,
      'Underbust Inches': '33',
      'Waist cm': '79',
      'Waist Inches': '31',
      'Hip cm': '104',
      'Hip Inches': '41',
    },
    {
      'Size Aus/UK': 16,
      'Size US': 12,
      'Bust cm': '100',
      'Bust Inches': '39.5',
      'Underbust cm': 88,
      'Underbust Inches': '34.5',
      'Waist cm': '83',
      'Waist Inches': '32.5',
      'Hip cm': '108',
      'Hip Inches': '42.5',
    },
    {
      'Size Aus/UK': 18,
      'Size US': 14,
      'Bust cm': '105',
      'Bust Inches': '41.5',
      'Underbust cm': 93,
      'Underbust Inches': '36.5',
      'Waist cm': '88',
      'Waist Inches': '34.75',
      'Hip cm': '114',
      'Hip Inches': '44.75',
    },
    {
      'Size Aus/UK': 20,
      'Size US': 16,
      'Bust cm': '111',
      'Bust Inches': '43.5',
      'Underbust cm': 98,
      'Underbust Inches': '38.5',
      'Waist cm': '94',
      'Waist Inches': '37',
      'Hip cm': '119',
      'Hip Inches': '47',
    },
    {
      'Size Aus/UK': 22,
      'Size US': 18,
      'Bust cm': '116',
      'Bust Inches': '45.5',
      'Underbust cm': 103,
      'Underbust Inches': '40.5',
      'Waist cm': '100',
      'Waist Inches': '39.25',
      'Hip cm': '125',
      'Hip Inches': '49.25',
    },
    {
      'Size Aus/UK': 24,
      'Size US': 20,
      'Bust cm': '121',
      'Bust Inches': '47.5',
      'Underbust cm': 108,
      'Underbust Inches': '42.5',
      'Waist cm': '103',
      'Waist Inches': '41.5',
      'Hip cm': '131',
      'Hip Inches': '51.5',
    },
    {
      'Size Aus/UK': 26,
      'Size US': 22,
      'Bust cm': '126',
      'Bust Inches': '49.5',
      'Underbust cm': 113,
      'Underbust Inches': '44.5',
      'Waist cm': '111',
      'Waist Inches': '43.75',
      'Hip cm': '137',
      'Hip Inches': '53.75',
    },
    {
      'Size Aus/UK': 28,
      'Size US': 24,
      'Bust cm': '131',
      'Bust Inches': '51.5',
      'Underbust cm': 118,
      'Underbust Inches': '46.5',
      'Waist cm': '117',
      'Waist Inches': '46',
      'Hip cm': '142',
      'Hip Inches': '56',
    },
    {
      'Size Aus/UK': 30,
      'Size US': 26,
      'Bust cm': '136',
      'Bust Inches': '53.5',
      'Underbust cm': 124,
      'Underbust Inches': '48.5',
      'Waist cm': '123',
      'Waist Inches': '48.25',
      'Hip cm': '148',
      'Hip Inches': '58.25',
    },
  ],
});

export default function ProductReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    case CustomizationConstants.ACTIVATE_COLOR_DRAWER: {
      return $$state.merge({
        productCustomizationDrawer: CustomizationConstants.COLOR_CUSTOMIZE,
        productCustomizationDrawerOpen: action.isActive,
      });
    }

    case ProductConstants.SELECT_FABRIC_COLOR_GROUP: {
      const { presentation: name } = action;
      const $$fabricColorGroupSelections = $$state.get('fabricColorGroupSelections');

      // If Present, remove from selections
      if ($$fabricColorGroupSelections.includes(name)) {
        return $$state.merge({
          fabricColorGroupSelections: $$fabricColorGroupSelections.filter(id => id !== name),
        });
      }

      // Else, add from selections
      return $$state.merge({
        fabricColorGroupSelections: $$fabricColorGroupSelections.concat(name),
      });
    }

    case ProductConstants.SELECT_FABRIC_GROUP: {
      const { name } = action;
      const $$fabricGroupSelections = $$state.get('fabricGroupSelections');

      // If Present, remove from selections
      if ($$fabricGroupSelections.includes(name)) {
        return $$state.merge({
          fabricGroupSelections: $$fabricGroupSelections.filter(fName => fName !== name),
        });
      }

      // Else, add from selections
      return $$state.merge({
        fabricGroupSelections: $$fabricGroupSelections.concat(name),
      });
    }

    default: {
      return $$state;
    }
  }
}
