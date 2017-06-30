import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'ACTIVATE_MODAL',
  ]),
);

const modalIds = assign({},
  mirrorCreator([
    'SIGN_UP_MODAL',
    'LOG_IN_MODAL',
    'FORGOT_PASSWORD_MODAL',
  ]),
);

export default assign(
  {},
  actionTypes,
  modalIds,
);
