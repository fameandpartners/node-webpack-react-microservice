import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

const actionTypes = assign({},
  mirrorCreator([
    'ACTIVATE_SIDE_MENU',
    'ACTIVATE_CART_DRAWER',
    'SET_APP_LOADING_STATE',
    'SET_APP_USER',
    'SET_SHAREABLE_QUERY_PARAMS',
    'SET_GALLERY_SLIDE_ACTIVE_INDEX',
  ]),
);

const loadingIds = {
  LOADING_IDS: mirrorCreator([
    'ADD_TO_CART_LOADING',
  ]),
};

const queryParams = {
  QUERY_PARAMS: {
    legacyColor: 'color',
    color: 'clr',
    customizations: 'cus',
  },
};

const navigationContainers = {
  NAVIGATION_CONTAINERS: mirrorCreator([
    'SHOP_ALL',
    'WHO_WE_ARE',
  ]),
};

const navigationLinks = {
  NAVIGATION_LINKS: {
    WEDDINGS: [
      {
        text: 'Brides',
        url: '/bespoke-bridal-collection',
      },
      {
        text: 'Bridesmaids',
        url: '/modern-bridesmaid-dresses',
      },
      {
        text: 'Wedding Guests',
        url: '/dresses/wedding-guests',
      },
      {
        text: 'Fall Weddings',
        url: '/dresses/fall-weddings',
      },
      {
        type: 'divider',
      },
      {
        text: 'Wedding Styling',
        url: '/wedding-consultation',
      },
      {
        text: 'The Wedding App',
        url: '/wedding-atelier',
      },
      {
        text: 'Bridal Style Guides',
        url: '/get-the-look',
      },
    ],
    DRESSES: [
      {
        text: 'Maxi Dresses',
        url: '/dresses/long',
      },
      {
        text: 'Midi Dresses',
        url: '/dresses/midi',
      },
      {
        text: 'Mini Dresses',
        url: '/dresses/mini',
      },
      {
        text: 'Cocktail',
        url: '/dresses/cocktail',
      },
      {
        text: 'Casual',
        url: '/dresses/casual',
      },
      {
        text: 'Evening',
        url: '/dresses/evening',
      },
      {
        text: 'Prom',
        url: '/dresses/prom',
      },
      {
        text: 'View All',
        url: '/dresses',
      },
    ],
    DRESSES_PATH: '',
    SEPARATES: [
      {
        text: 'Tops',
        url: '/tops',
      },
      {
        text: 'Skirts',
        url: '/skirts',
      },
      {
        text: 'Pants',
        url: '/pants',
      },
      {
        text: 'Jumpsuits',
        url: '/dresses/jumpsuits',
      },
      {
        text: 'Outerwear',
        url: '/outerwear',
      },
    ],
    FEATURED: [
      {
        text: 'Best Sellers',
        url: '/dresses/best-sellers',
      },
      {
        text: 'New Arrivals',
        url: '/dresses/new-this-week',
      },
      {
        text: 'Florals',
        url: '/dresses/floral',
      },
    ],
    COLLECTIONS: [
      {
        text: 'Holiday Party Collection',
        url: '/holiday-party-survival-kit',
      },
      {
        text: 'High Contrast',
        url: '/high-contrast',
      },
      {
        text: 'Modern Evening',
        url: '/the-modern-evening-collection',
      },
      {
        text: 'Inside/Out',
        url: '/inside-out-collection',
      },
      {
        text: 'Bespoke Bridal',
        url: '/bespoke-bridal-collection',
      },
    ],
    WHO_WE_ARE: [
      {
        text: 'About Us',
        url: '/about',
      },
      {
        text: 'Why Made to Order',
        url: '/why-us',
      },
      {
        text: 'Empowerment Initiatives',
        url: '/iequalchange',
      },
      {
        text: 'Read the Fame Files',
        url: 'http://blog.fameandpartners.com/',
      },
      {
        text: 'Join the Fame Society',
        url: '/fame-society-application',
      },
      {
        text: 'Meet the CEO',
        url: '/from-our-ceo',
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
  loadingIds,
  navigationContainers,
  navigationLinks,
  queryParams,
  configuration,
);
