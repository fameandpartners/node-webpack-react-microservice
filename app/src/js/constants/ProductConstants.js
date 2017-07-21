import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'ACTIVATE_COLOR_DRAWER',
    'SELECT_PRODUCT_COLOR',
  ]),
);

export default actionTypes;
