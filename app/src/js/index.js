/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../css/index.scss';
// const AppStore = require('./stores/AppStore'); // TODO: Bring Redux in
// const {Provider} = require('react-redux'); // TODO: Bring Redux in

ReactDOM.render(
  // const component = <Provider store={AppStore}><App {...props} /></Provider>; // TODO: Redux
  <App props={window.__data}/>,
  document.getElementById('root')
);
