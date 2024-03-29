/* global window */
import noop from '../libs/noop';

const win = typeof window === 'object'
  ? window
  : {
    isMockWindow: true,
    document: {},
    location: {
      href: '',
    },
    addEventListener: noop,
    removeEventListener: noop,
  };

export default win;
