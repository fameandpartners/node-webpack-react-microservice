import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { redirectSiteVersion } from '../../utilities/helpers';

// Polyfills
import win from '../../polyfills/windowPolyfill';

// Components
import EmailCapture from '../generic/EmailCapture';

// CSS
import '../../../css/components/Footer.scss';

/* eslint-disable react/prefer-stateless-function */
class Footer extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      auSite: win.ApplicationStateData ? win.ApplicationStateData.auSite : false,
    };
  }

  changeSiteVersion() {
    redirectSiteVersion(win.location.href);
  }

  render() {
    const { auSite } = this.state;

    return (
      <footer className="Footer">
        <div className="layout-container grid-noGutter-reverse-spaceAround">
          <ul className="col-2_sm-4 Footer__category-list">
            <li>
              <p className="Footer__category-title">Help</p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/faqs#collapse-delivery-how-long">
                  Shipping Info
                </a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/faqs#collapse-returns-policy">Returns Policy</a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/contact">Fame Contact Us</a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/faqs">FAQs</a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/size-guide">Size Guide</a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/faqs#collapse-orders-track">Track My Order</a>
              </p>
            </li>
          </ul>
          <ul className="col-2_sm-4 Footer__category-list">
            <li><p className="Footer__category-title">About</p></li>
            <li>
              <p>
                <a className="link--static" href="/why-us">Why shop with us</a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/about">About us</a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/fame-society-application">Fame Society</a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/from-our-ceo">From our CEO</a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/privacy">Privacy Policy</a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/terms">Terms</a>
              </p>
            </li>
          </ul>
          <ul className="col-2_sm-4_xs-0 Footer__category-list">
            <li><p className="Footer__category-title">Shop By</p></li>
            <li>
              <p>
                <a className="link--static" href="/dresses/best-sellers">Best Sellers</a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/dresses?order=newest">What's new</a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/getitquick">Made in 48 Hours</a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/dresses/formal">Formal</a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/dresses/prom">Prom</a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/dresses">View All Dresses</a>
              </p>
            </li>
          </ul>
          <div className="col-6_md-12_sm-12_sm-first u-mb-big">
            <p className="Footer__copy u-mb-small">
              Sign up to always enjoy free returns
            </p>
            <EmailCapture service="bronto" />
          </div>
        </div>
        <div className="layout-container grid-noGutter">
          <div className="col-12 Footer__site-version-container">
            <p className="u-user-select--none">Country: &nbsp;
              <span
                className="u-text-decoration--underline u-cursor--pointer"
              >
                <form onChange={this.changeSiteVersion}>
                  <select className="inline-select" value={auSite ? 'au' : 'us'}>
                    <option value="us">U.S</option>
                    <option value="au">Australia</option>
                  </select>
                </form>
              </span>
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  // Redux Props
  auSite: PropTypes.bool.isRequired,
};

export default Footer;
