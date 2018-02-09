/* eslint-disable max-len */
import { includes } from 'lodash';
import Immutable from 'immutable';
import BDCustomizationConstants from '../constants/BDCustomizationConstants';

export const $$initialState = Immutable.fromJS({
  // Enum String, [
  // 'COLOR_CUSTOMIZE',
  // 'LENGTH_CUSTOMIZE',
  // 'BODICE_CUSTOMIZE',
  // 'STRAPS_SLEEVES_CUSTOMIZE',
  // 'SILHOUTTE_CUSTOMIZE',
  // 'DETAILS_CUSTOMIZE'
  // ]
  activeBDCustomizationHeading: null,

  // // String ['?', '?', '?']
  bdProductCustomizationDrawer: null,

  // // Bool
  productCustomizationDrawerOpen: false,

  // Color
  temporaryBDCustomizationColor: 'Ivory',
  selectedBDCustomizationColor: 'Ivory',

  // Length
  temporaryBDCustomizationLength: 'ankle',
  selectedBDCustomizationLength: 'ankle',

  // Details
  temporaryCustomizationDetails: [],
  selectedCustomizationDetails: [],
  lastTemporaryItemSelection: null,
  lastUndoTemporaryCustomizationDetails: [],

  incompatabilities: [],
  incompatabilitiesLoading: false,
  temporaryCustomizationCombinationId: null,

});

export default function CartReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    // GENERAL
    case BDCustomizationConstants.SET_BD_CUSTOMIZATION_SECTION: {
      return $$state.merge({
        bdProductCustomizationDrawer: action.sectionId,
      });
    }

    case BDCustomizationConstants.BD_ACTIVATE_CUSTOMIZATION_DRAWER: {
      return $$state.merge({
        bdProductCustomizationDrawer: action.bdProductCustomizationDrawer,
        bdProductCustomizationDrawerOpen: action.isActive,
      });
    }

    case BDCustomizationConstants.SAVE_BD_TEMPORARY_CUSTOMIZATIONS: {
      return $$state.merge({
        selectedBDCustomizationColor: $$state.get('temporaryBDCustomizationColor'),
        selectedBDCustomizationLength: $$state.get('temporaryBDCustomizationLength'),
        selectedCustomizationDetails: $$state.get('temporaryCustomizationDetails'),
      });
    }

    case BDCustomizationConstants.SET_BD_TEMPORARY_CUSTOMIZATION_DETAILS: {
      const { temporaryCustomizationDetails } = action;
      return $$state.merge({ // Addition
        temporaryCustomizationDetails,
      });
    }

    case BDCustomizationConstants.SET_BD_TEMPORARY_COLOR: {
      const { temporaryBDCustomizationColor } = action;
      return $$state.merge({ // Addition
        temporaryBDCustomizationColor,
      });
    }

    case BDCustomizationConstants.SET_BD_COLOR: {
      const { selectedBDCustomizationColor } = action;
      return $$state.merge({ // Addition
        selectedBDCustomizationColor,
        temporaryBDCustomizationColor: selectedBDCustomizationColor,
      });
    }

    case BDCustomizationConstants.SET_BD_TEMPORARY_LENGTH: {
      const { temporaryBDCustomizationLength } = action;
      return $$state.merge({ // Addition
        temporaryBDCustomizationLength,
      });
    }

    case BDCustomizationConstants.SET_BD_LENGTH: {
      const { selectedBDCustomizationLength } = action;
      return $$state.merge({ // Addition
        selectedBDCustomizationLength,
        temporaryBDCustomizationLength: selectedBDCustomizationLength,
      });
    }

    case BDCustomizationConstants.SET_BD_INCOMPATABILITIES: {
      const {
        incompatabilities,
        temporaryCustomizationCombinationId,
      } = action;

      return $$state.merge({ // Addition
        incompatabilities,
        temporaryCustomizationCombinationId,
      });
    }

    case BDCustomizationConstants.SET_BD_INCOMPATABILITIES_LOADING: {
      return $$state.merge({ // Addition
        incompatabilitiesLoading: action.isLoading,
      });
    }

    case BDCustomizationConstants.UNDO_BD_TEMPORARY_CUSTOMIZATION_DETAILS: {
      const { lastTemporaryItemSelection, undoArray } = action;
      if (includes(undoArray, ...['l1', 'l2', 'l3', 'l4', 'l5'])) {
        console.error('LENGTH SELECTED');
        // edge case, does it contain a length???? Need logic for length selection
      }

      return $$state.merge({
        lastUndoTemporaryCustomizationDetails: undoArray,
        lastTemporaryItemSelection,
      });
      // return $$state.merge({ // Addition
      //   incompatabilitiesLoading: action.isLoading,
      // });
    }

    default: {
      return $$state;
    }
  }
}
