import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { redirectSiteVersion } from '../../utilities/helpers';

// Polyfills
import win from '../../polyfills/windowPolyfill';

// Components
import EmailCapture from '../generic/EmailCapture';
import SocialLinks from '../generic/SocialLinks';

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
        <div className="layout-container grid-12-noGutter-spaceAround">
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
                <a className="link--static" href="/contact">Contact Us</a>
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
            <li>
              <p>
                <a className="link--static" href="/guest-returns">Return My Order</a>
              </p>
            </li>
          </ul>
          <ul className="col-2_sm-4 Footer__category-list">
            <li><p className="Footer__category-title">About</p></li>
            <li>
              <p>
                <a className="link--static" href="/why-us">Why Shop With Us</a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/about">About Us</a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/fame-society-application">Fame Society</a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/from-our-ceo">From Our CEO</a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/wholesale">Wholesale Inquiries</a>
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
                <a className="link--static" href="/dresses?order=newest">New Arrivals</a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/getitquick">Made in 48 Hours</a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/modern-bridesmaid-collection">Bridesmaid</a>
              </p>
            </li>
            <li>
              <p>
                <a className="link--static" href="/bespoke-bridal-collection">Bridal</a>
              </p>
            </li>
            { auSite ?
              <li>
                <p>
                  <a className="link--static" href="/dresses/formal">Formal</a>
                </p>
              </li> :
              <li>
                <p>
                  <a className="link--static" href="/dresses/prom">Prom</a>
                </p>
              </li>
            }
            <li>
              <p>
                <a className="link--static" href="/dresses">View All Dresses</a>
              </p>
            </li>
          </ul>
          <div className="col-6_sm-12 Footer__sign-up u-mb-big">
            <p className="Footer__copy u-mb-small u-text-align--left">
              Are you on the list?
            </p>
            <p className="u-text-align--left u-mb-small">
              Join for an instant $25 off your first order, exclusive access to
              new arrivals, and more.
            </p>
            <EmailCapture
              className="u-text-align--left"
              service="bronto"
            />

            <div className="Footer__social-icon-row u-mt-normal">
              <SocialLinks />
            </div>
          </div>
        </div>
        <div className="layout-container grid-noGutter">
          <div className="col-12 Footer__site-version-container u-mt-normal">
            <form onChange={this.changeSiteVersion}>
              <p className="u-user-select--none">Country: &nbsp;
              <span
                className="u-text-decoration--underline u-cursor--pointer"
              >
                <select className="inline-select" value={auSite ? 'au' : 'us'}>
                  <option value="us">US</option>
                  <option value="au">Australia</option>
                </select>
              </span>
              </p>
            </form>
          </div>
        </div>

        <p className="u-mt-normal u-mb-big">
          © 2017 Fame and Partners. All rights reserved.
        </p>
      </footer>
    );
  }
}

Footer.propTypes = {
  // Redux Props
  auSite: PropTypes.bool.isRequired,
};

export default Footer;
