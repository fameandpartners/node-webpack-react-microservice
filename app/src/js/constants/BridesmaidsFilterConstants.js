import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'HYDRATE_FILTERS_FROM_URL',
  ]),
);

export default actionTypes;
