import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const modalIds = assign({},
  mirrorCreator([
    'BD_COLOR_SELECTION_MODAL',
    'BD_CUSTOMIZATION_MODAL',
    'BD_FILTER_MODAL',
  ]),
);

export default assign(
  {},
  modalIds,
);
