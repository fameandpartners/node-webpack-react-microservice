import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

// Utilities
import { siteVersionAU } from '../utilities/helpers';

const actionTypes = assign({},
  mirrorCreator([
    'ACTIVATE_SIDE_MENU',
    'ACTIVATE_CART_DRAWER',
    'SET_APP_LOADING_STATE',
    'SET_APP_USER',
    'SET_SHAREABLE_QUERY_PARAMS',
    'SET_GALLERY_SLIDE_ACTIVE_INDEX',
    'SET_ERROR_CODE',
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
        type: 'divider',
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
        type: 'divider',
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
        url: '/dresses/jumpsuit',
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
        text: 'Made in 48 Hours',
        url: '/getitquick',
      },
    ],
    COLLECTIONS: [
      {
        text: 'Holiday Party',
        url: '/holiday-party-survival-kit',
      },
      {
        text: 'High Contrast',
        url: '/high-contrast',
      },
      {
        text: 'Evening Shop',
        url: '/the-evening-shop',
      },
      {
        text: 'Anti-Fast Fashion Shop',
        url: '/the-anti-fast-fashion-shop',
      },
    ],
    ABOUT: [
      {
        text: 'Who We Are',
        url: '/about',
      },
      {
        text: 'Why Made-to-Order',
        url: '/why-us',
      },
      {
        text: 'Empowerment Initiatives',
        url: '/iequalchange',
      },
    ],
    COMMUNITY: [
      {
        text: 'Win an Internship',
        url: '/it-girl',
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
      {
        text: 'Get $25 Off',
        url: '/invite?nav',
      },
      {
        text: 'Shop With Friends',
        url: '#',
        customClass: 'js-shop-with-friends',
        shouldHide: siteVersionAU(),
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
