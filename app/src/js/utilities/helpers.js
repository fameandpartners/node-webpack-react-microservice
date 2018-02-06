/* eslint-disable import/prefer-default-export */

// Polyfills
import win from '../polyfills/windowPolyfill';

export function redirectSiteVersion(path) {
  let redirectUrl;

  // PRODUCTION
  if (path.includes('.com/')) {
    redirectUrl = path.replace('.com/', '.com.au/');
  } else if (path.includes('.com.au/')) {
    redirectUrl = path.replace('.com.au/', '.com/');
  }

  // LOCAL
  if (path.includes('localhost')) {
    redirectUrl = path.replace('localhost', 'au.lvh.me');
  } else if (path.includes('au.lvh.me')) {
    redirectUrl = path.replace('au.lvh.me', 'localhost');
  }

  // STANDALONE DEV
  if (path.includes(':3030')) {
    console.log("You're on standalone nodey dev... redirect aborted.");
    return;
  }

  win.location.href = redirectUrl;
}

export function formatSizePresentationUS(size) {
  return `${size.split(' ')[1]} ${size.split(' ')[0]}`;
}

export function siteVersionAU() {
  return (win.ApplicationStateData ? win.ApplicationStateData.auSite : false);
}

export function featureFlagSampleSale() {
  return (win.ApplicationStateData ? win.ApplicationStateData.featureFlagSampleSale : false);
}
