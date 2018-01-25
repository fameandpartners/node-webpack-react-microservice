import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'HYDRATE_BRIDESMAID_FILTERS_FROM_URL',
    'SELECT_FILTER_COLOR',
    'SELECT_FILTER_SILHOUETTE',
    'SELECT_FILTER_LENGTH',
    'BRIDESMAID_SHOULD_CHANGE_PAGE',
    'BRIDESMAID_SAVE_TEMPORARY_FILTER_SELECTIONS',
    'UPDATE_FILTER_TOP_DETAILS',
  ]),
);

export default actionTypes;
