import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'ADD_ITEM_TO_CART',
    'ACTIVATE_CART_DRAWER',
    'SET_CART_CONTENTS',
  ]),
);

export default actionTypes;
