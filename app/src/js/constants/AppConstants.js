import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'ACTIVATE_SIDE_MENU',
    'ACTIVATE_CART_DRAWER',
    'SET_SHAREABLE_QUERY_PARAMS',
  ]),
);

const queryParams = {
  QUERY_PARAMS: {
    color: 'clr',
    customizations: 'cus',
  },
};

const configuration = assign({},
  {
    ANIMATION_CONFIGURATION: {
      stiffness: 94,
      damping: 20,
      precision: 5,
    },
    ANIMATION_CONFIGURATION_SMOOTH: {
      stiffness: 100,
      damping: 29,
      precision: 8,
    },
  },
);

export default assign({}, actionTypes, queryParams, configuration);
