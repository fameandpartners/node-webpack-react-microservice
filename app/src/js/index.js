/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';

// CSS
import '../css/index.scss';

// Store
import AppStore from './stores/AppStore';

function renderApp(Component) {
  ReactDOM.render(
    Component,
    document.getElementById('root'),
  );
}

// eslint-disable-next-line
const pdpData = (typeof window === 'object') ? window.__data : null;
const store = AppStore(pdpData);

const component = <Provider store={store}><App /></Provider>;
renderApp(component);


if (module.hot) {
  module.hot.accept('./App.js', () => {
    /* eslint-disable global-require */
    const NextRootContainer = require('./App.js');
    const AppNode = (<Provider store={store}><NextRootContainer /></Provider>);
    renderApp(AppNode);
  });
}
