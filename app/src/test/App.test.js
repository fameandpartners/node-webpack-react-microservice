/* global window */
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../js/App';

it('renders without crashing', () => {
  const div = window.document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('App.sampleTest', () => {
  const AppComponent = new App();
  expect(AppComponent.sampleTest()).toBe(true);
});
