import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'ACTIVATE_SIDE_MENU',
    'ACTIVATE_CART_DRAWER',
    'SET_SHAREABLE_QUERY_PARAMS',
  ]),
);

const queryParams = {
  QUERY_PARAMS: {
    color: 'clr',
    customizations: 'cus',
  },
};

const navigationLinks = {
  NAVIGATION_LINKS: {
    WEDDINGS: [
      {
        text: 'Brides',
        relativeUrl: '/bespoke-bridal-collection',
      },
      {
        text: 'Bridesmaids',
        relativeUrl: '/modern-bridesmaid-dresses',
      },
      {
        text: 'Wedding Guests',
        relativeUrl: '/dresses/wedding-guests',
      },
      {
        text: 'Bespoke Bridal',
        relativeUrl: '/this-has-no-link',
      },
      {
        text: 'Bridal Style Guides',
        relativeUrl: '/this-has-no-link',
      },
      {
        text: 'Summer Weddings',
        relativeUrl: '/dresses/summer-weddings',
      },
      {
        text: 'Wedding Styling',
        relativeUrl: '/wedding-consultation',
      },
      {
        text: 'The Wedding App',
        relativeUrl: '/wedding-atelier',
      },
    ],
    DRESSES: [
      {
        text: 'Maxi Dresses',
        relativeUrl: '/dresses/long',
      },
      {
        text: 'Midi Dresses',
        relativeUrl: '/dresses/midi',
      },
      {
        text: 'Mini Dresses',
        relativeUrl: '/dresses/mini',
      },
      {
        text: 'Cocktail',
        relativeUrl: '/dresses/cocktail',
      },
      {
        text: 'Casual',
        relativeUrl: '/dresses/casual',
      },
      {
        text: 'Evening',
        relativeUrl: '/dresses/evening',
      },
      {
        text: 'Prom',
        relativeUrl: '/dresses/prom',
      },
    ],
    SEPARATES: [
      {
        text: 'Tops',
        relativeUrl: '/tops',
      },
      {
        text: 'Skirts',
        relativeUrl: '/skirts',
      },
      {
        text: 'Pants',
        relativeUrl: '/pants',
      },
      {
        text: 'Jumpsuits',
        relativeUrl: '/dresses/jumpsuits',
      },
      {
        text: 'Outerwear',
        relativeUrl: '/outerwear',
      },
    ],
    NEW_ARRIVALS: [
      {
        text: 'Best Sellers',
        relativeUrl: '/bespoke-bridal-collection',
      },
      {
        text: 'Trending Looks',
        relativeUrl: '/modern-bridesmaid-dresses',
      },
    ],
    COLLECTIONS: [
      {
        text: 'High Contrast',
        relativeUrl: '/high-contrast',
      },
      {
        text: 'Modern Evening',
        relativeUrl: '/the-modern-evening-collection',
      },
      {
        text: 'Pre-Season Evening',
        relativeUrl: '/pre-season-evening-collection',
      },
      {
        text: 'Inside/Out',
        relativeUrl: '/inside-out-collection',
      },
      {
        text: 'Anti Fast Fashion Shop',
        relativeUrl: '/the-anti-fast-fashion-shop',
      },
    ],
  },
};

const configuration = assign({},
  {
    ANIMATION_CONFIGURATION: {
      stiffness: 94,
      damping: 20,
      precision: 5,
    },
    ANIMATION_CONFIGURATION_SMOOTH: {
      stiffness: 100,
      damping: 29,
      precision: 8,
    },
  },
);

export default assign({},
  actionTypes,
  navigationLinks,
  queryParams,
  configuration,
);
