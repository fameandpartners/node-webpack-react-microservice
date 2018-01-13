import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'ACTIVATE_STEP',
    'EDIT_STEP',
  ]),
);

const availableStepIds = assign({},
  mirrorCreator([
    // SIZE PROFILE
    'SELECT_SIZE_PROFILE_STEP',
    'STANDARD_SIZING_STEP',
    'OVERALL_FIT_STEP',
    'PETITE_PLUS_SURVEY_STEP',
    'CURRENT_DRESS_FIT_COMBINED_STEP',
    'FIT_ID_OVERVIEW_STEP',
    'CALCULATE_FIT_ID_STEP',
    'COMPLETED_FIT_ID_STEP',
  ]),
);

export default assign(
  {},
  actionTypes,
  availableStepIds,
);
