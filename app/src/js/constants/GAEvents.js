import { assign } from 'lodash';

const STANDARD_EVENTS = assign({},
  {
    ADD_TO_CART_PDP: {
      category: 'PDP',
      action: 'Add to Cart - PDP',
    },
  },
);

export default {
  STANDARD_EVENTS,
};
