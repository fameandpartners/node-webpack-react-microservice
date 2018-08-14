/* eslint-disable import/no-unresolved, react/prefer-stateless-function */
/* eslint-disable import/extensions, import/no-extraneous-dependencies */

import React from 'react';
import Footer from '@components/layout/Footer/Footer';
import { connect } from 'react-redux';
import { redirectSiteVersion } from '../../utilities/helpers';
import win from '../../polyfills/windowPolyfill';

class FooterContainer extends React.Component {
  isDev() {
    const url = win.location.href;
    return !url.includes('www.fameandpartners');
  }

  render() {
    const newsletterSignUpUrl = this.isDev() ? 'https://loremflickr.com/1/1' : 'http://hello.fameandpartners.com/public/';

    return (
      <Footer {...this.props} newsletterSignUpUrl={newsletterSignUpUrl} />
    );
  }
}

const ConnectedFooter = connect(
    state => ({
      siteVersion: state.$$appState.get('siteVersion').toLowerCase() === 'australia' ? 'en-AU' : 'en-US',
      isDev: false,
      changeSiteVersion: (newSiteVersion) => {
        const siteVersion = state.$$appState.get('siteVersion').toLowerCase() === 'australia' ? 'en-AU' : 'en-US';

        if (siteVersion !== newSiteVersion) {
          redirectSiteVersion(win.location.href);
        }
      },
    }),
  )(FooterContainer);

export default ConnectedFooter;
