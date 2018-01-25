import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'UPDATE_FABRIC_SWATCH_ORDER',
  ]),
);

export default assign(
  {},
  actionTypes,
);
