import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'UPDATE_HEIGHT_SELECTION',
    'UPDATE_WEIGHT_SELECTION',
    'UPDATE_AGE_SELECTION',
    'UPDATE_BUST_SELECTION',
    'UPDATE_WAIST_SELECTION',
    'UPDATE_HIP_SELECTION',
    'UPDATE_DRESS_SIZE_SELECTION',
    'UPDATE_FITTED_DRESS_SIZE_SELECTION',
    'UPDATE_JEAN_SELECTION',
    'UPDATE_BRA_SELECTION',
    'UPDATE_MEASUREMENT_METRIC',
    'SET_STANDARD_SIZE_ERROR',
    'SET_CLOTHING_SIZE_ERROR',
    'SET_BODY_SIZE_ERROR',
    'SET_DRESS_FIT_ERROR',
  ]),
);

export default assign({},
  actionTypes,
);
