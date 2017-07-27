import { spring } from 'react-motion';

export const STANDARD_DEFAULT_STYLES = {
  key: 'modal',
  style: {
    opacity: spring(1),
    y: spring(0),
  },
};

export const SLIDE_UP_DEFAULT_STYLES = {
  key: 'modal',
  style: {
    opacity: spring(1),
    y: spring(0),
  },
};

export const STANDARD_WILL_ENTER = {
  opacity: 0,
  y: -3,
};

export const SLIDE_UP_WILL_ENTER = {
  opacity: 0,
  y: 100,
};

export const STANDARD_WILL_LEAVE = {
  opacity: spring(0),
  y: spring(-10),
};

export const SLIDE_UP_WILL_LEAVE = {
  y: spring(100),
};

export default {
  SLIDE_UP_DEFAULT_STYLES,
  STANDARD_DEFAULT_STYLES,
  STANDARD_WILL_ENTER,
  SLIDE_UP_WILL_ENTER,
  STANDARD_WILL_LEAVE,
  SLIDE_UP_WILL_LEAVE,
};
