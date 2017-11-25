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
    'FIT_ID_OVERALL_FIT_STEP',
  ]),
);

export default assign(
  {},
  actionTypes,
  availableStepIds,
);
