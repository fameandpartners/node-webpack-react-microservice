import { assign } from 'lodash';
import mirrorCreator from 'mirror-creator';

// Utilities
// import { siteVersionAU } from '../utilities/helpers';

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
        text: 'Bridesmaids',
        url: '/modern-bridesmaid-dresses',
      },
      {
        text: 'Bridal',
        url: '/navigation-bridal',
      },
      {
        text: 'Wedding Guests',
        url: '/dresses/wedding-guests',
      },
      {
        type: 'divider',
      },
      {
        text: 'New Bridesmaid 20% Off',
        url: '/coming-soon-custom-bridesmaid-dresses',
      },
    ],
    DRESSES: [
      {
        text: 'Day',
        url: '/navigation-day',
      },
      {
        text: 'Work',
        url: '/navigation-work',
      },
      {
        text: 'Weddings',
        url: '/weddings-and-parties',
      },
      {
        text: 'Cocktail',
        url: '/dresses/cocktail',
      },
      {
        text: 'Night Out',
        url: '/navigation-night-out',
      },
      {
        text: 'Vacation',
        url: '/navigation-vacation',
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
        text: 'Skirts',
        url: '/skirts',
      },
      {
        text: 'Jumpsuits',
        url: '/dresses/jumpsuit',
      },
      {
        text: 'Pants',
        url: '/pants',
      },
      {
        text: 'Outerwear',
        url: '/outerwear',
      },
      { type: 'divider' },
      {
        text: 'View All',
        url: '/navigation-all-separates',
      },
    ],
    FEATURED: [
      {
        text: 'Just In',
        url: '/dresses/new-this-week',
      },
      {
        text: 'Under $200',
        url: '/navigation-under-200',
      },
      {
        text: 'Best Sellers',
        url: '/dresses/best-sellers',
      },
      { type: 'divider' },
      {
        text: 'Summer \'18',
        url: '/fresh-for-summer-collection',
      },
      {
        text: 'Weddings & Parties',
        url: '/weddings-parties-say-lou-lou',
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
        text: 'Read the Files',
        url: 'http://blog.fameandpartners.com/',
      },
      {
        text: 'Join the Fame Society',
        url: '/fame-society-application',
      },
      {
        text: 'Shop Instagram',
        url: '/shop-social?traffic_source=nav',
      },
      // {
      //   text: 'Shop With Friends',
      //   url: '#',
      //   customClass: 'js-shop-with-friends',
      //   shouldHide: siteVersionAU(),
      // },
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
