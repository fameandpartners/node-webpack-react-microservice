import Immutable from 'immutable';

export const $$initialState = Immutable.fromJS({
  $$orderedSections: [],
  $$header: {},
});

export default function SuperCollectionReducer($$state = $$initialState, action = null) {
  switch (action.type) {

    default: {
      return $$state;
    }
  }
}
