import React from 'react';
import ReactHoverObserver from 'react-hover-observer';

// Components
import HeaderDesktop from './HeaderDesktop';

// CSS
import '../../../../css/components/Header.scss';

export default () => (
  <ReactHoverObserver hoverOffDelayInMs={2000000}>
    <HeaderDesktop />
  </ReactHoverObserver>
);
