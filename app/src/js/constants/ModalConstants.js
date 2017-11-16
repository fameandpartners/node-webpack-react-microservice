import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'ACTIVATE_MODAL',
  ]),
);

const modalIds = assign({},
  mirrorCreator([
    'AFTERPAY_MODAL',
    'COLOR_SELECTION_MODAL',
    'LOG_IN_MODAL',
    'FABRIC_MODAL',
    'FILTER_SELECTION_MODAL',
    'FORGOT_PASSWORD_MODAL',
    'SHARE_MODAL',
    'SIGN_UP_MODAL',
    'SIZE_GUIDE_MODAL',
    'SIZE_SELECTION_MODAL',
    'SORT_SELECTION_MODAL',
    'STYLE_SELECTION_MODAL',
    'ZOOM_MODAL',
    'AFTERPAY_MODAL',
    'FIT_ID_MODAL',
    'SIZE_PROFILE_MODAL',
  ]),
);

export default assign(
  {},
  actionTypes,
  modalIds,
);
