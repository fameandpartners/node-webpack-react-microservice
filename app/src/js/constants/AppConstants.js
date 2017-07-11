import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'ACTIVATE_SIDE_MENU',
    'ACTIVATE_CART_DRAWER',
  ]),
);

const configuration = assign({},
  {
    ANIMATION_CONFIGURATION: {
      stiffness: 170,
      damping: 18,
      precision: 12,
    },
  },
);

export default assign({}, actionTypes, configuration);
