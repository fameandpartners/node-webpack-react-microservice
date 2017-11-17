import AppConstants from '../constants/AppConstants';

export function activateSideMenu({ sideMenuOpen }) {
  return {
    type: AppConstants.ACTIVATE_SIDE_MENU,
    sideMenuOpen,
  };
}

export function setAppLoadingState({ loadingId }) {
  return {
    type: AppConstants.SET_APP_LOADING_STATE,
    loadingId,
  };
}

export function setAppUser({ user }) {
  return {
    type: AppConstants.SET_APP_USER,
    user,
  };
}

export function setShareableQueryParams({ color, customizations }) {
  return {
    type: AppConstants.SET_SHAREABLE_QUERY_PARAMS,
    color,
    customizations,
  };
}

export function setGallerySlideActiveIndex({ index = 0 }) {
  return {
    type: AppConstants.SET_GALLERY_SLIDE_ACTIVE_INDEX,
    index,
  };
}

export default {
  activateSideMenu,
  setShareableQueryParams,
};
