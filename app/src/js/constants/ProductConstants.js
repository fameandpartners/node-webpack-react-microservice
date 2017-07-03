import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'SELECT_COLOR',
  ]),
);

export default actionTypes;
