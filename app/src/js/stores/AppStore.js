import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import assign from 'lodash';
import reducers, { initialStates } from '../reducers';

export default (props = {}) => {
  console.log('props', props);
  // Merging of initial state with injected state
  // const hydratedStates = { someStore: props.someStore };

  const reducer = combineReducers(reducers);
  const composedStore = compose(composeWithDevTools(applyMiddleware(thunkMiddleware)));

  return composedStore(createStore)(reducer, initialStates);
};
