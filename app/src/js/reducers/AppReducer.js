import Immutable from 'immutable';

export const $$initialState = Immutable.fromJS({
  defaultData: [],
});

export default function AppReducer($$state = $$initialState, action = null) {
  switch (action.type) {
    default: {
      return $$state;
    }
  }
}
