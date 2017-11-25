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
    'START_FIT_ID_STEP',
  ]),
);

export default assign(
  {},
  actionTypes,
  availableStepIds,
);
