import Immutable from 'immutable';

export const $$initialState = Immutable.fromJS({});

export default function SuperCollectionReducer($$state = $$initialState, action = null) {
  switch (action.type) {

    default: {
      return $$state;
    }
  }
}
