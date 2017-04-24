import App from '../js/App';
import React from 'react';
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('App.sampleTest', () => {
  const AppComponent = new App();
  expect(AppComponent.sampleTest()).toBe(true);
});
