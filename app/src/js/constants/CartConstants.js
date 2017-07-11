import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'ADD_ITEM_TO_CART',
  ]),
);

export default actionTypes;
