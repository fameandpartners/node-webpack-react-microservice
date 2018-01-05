import Immutable from 'immutable';

export const $$initialState = Immutable.fromJS({
  // TODO: add temp/selected here?
  $$someThing: {},
});

export default function CollectionFilterSortReducer($$state = $$initialState, action = null) {
  switch (action.type) {

    default: {
      return $$state;
    }
  }
}
