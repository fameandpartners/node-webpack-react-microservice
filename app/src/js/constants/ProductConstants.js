import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'SELECT_PRODUCT_COLOR',
  ]),
);

export default actionTypes;
