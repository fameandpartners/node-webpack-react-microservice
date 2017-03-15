import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
// const AppStore = require('./stores/AppStore'); // TODO: Bring Redux in
// const {Provider} = require('react-redux'); // TODO: Bring Redux in

// shouldReturnComponent specifies whether to renturn the app or render it
function startup ({props, shouldReturnComponent}) {

    // const component = <Provider store={AppStore}><App {...props} /></Provider>; // TODO: Redux
    const component = <App {...props} />;

    if (shouldReturnComponent) {
        return component;
    } else {
        const elm = document.getElementById('root');
        if (elm) ReactDOM.render(component, elm);
    }
}

export default startup;
