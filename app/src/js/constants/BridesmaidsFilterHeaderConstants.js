import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'SELECTED_COLOR',
    'SELECTED_SILHOUETTE',
    'SELECTED_LENGTH',
    'SELECTED_TOP_DETAILS',
  ]),
);

export default actionTypes;
