import Immutable from 'immutable';

export const $$initialState = Immutable.fromJS({
  collection: [],
});

export default function ThemeReducer($$state = $$initialState, action = null) {
  switch (action.type) {

    default: {
      return $$state;
    }
  }
}
