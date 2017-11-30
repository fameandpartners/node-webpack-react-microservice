import Immutable from 'immutable';

export const $$initialState = Immutable.fromJS({
  $$lineItem: {},
});

export default function CollectionFilterSortReducer($$state = $$initialState, action = null) {
  switch (action.type) {

    default: {
      return $$state;
    }
  }
}
