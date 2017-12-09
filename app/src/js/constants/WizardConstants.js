import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'ACTIVATE_STEP',
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
  ]),
);

export default assign(
  {},
  actionTypes,
  availableStepIds,
);
