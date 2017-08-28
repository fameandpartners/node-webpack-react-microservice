import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import classNames from 'classnames';
// Components
import Button from '../generic/Button';
import Input from '../form/Input';

// CSS
import '../../../css/components/Footer.scss';

/* eslint-disable react/prefer-stateless-function */
class Footer extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      siteVersion: 'US',
      signupError: false,
    };
  }
  handleSignupClick(e) {
    e.preventDefault();
    // Simulate signup error
    this.setState({
      signupError: true,
    });
  }
  changeSiteVersion() {
    // Presentaional only, will actually change stuff in the future
    const { siteVersion } = this.state;
    if (siteVersion === 'AU') {
      this.setState({
        siteVersion: 'US',
      });
    } else {
      this.setState({
        siteVersion: 'AU',
      });
    }
  }

  render() {
    const { siteVersion, signupError } = this.state;
    return (
      <footer className="Footer">
        <div className="layout-container grid-noGutter-reverse-spaceAround">
          <ul className="col-2_sm-4 Footer__category-list">
            <li>
              <p className="Footer__category-title">Help</p>
            </li>
            <li>
              <p>
                <a href="##">Shipping Info</a>
              </p>
            </li>
            <li>
              <p>
                <a href="##">Returns Policy</a>
              </p>
            </li>
            <li>
              <p>
                <a href="##">Fame Contact Us</a>
              </p>
            </li>
            <li>
              <p>
                <a href="##">FAQs</a>
              </p>
            </li>
            <li>
              <p>
                <a href="##">Size Guide</a>
              </p>
            </li>
            <li>
              <p>
                <a href="##">Track My Order</a>
              </p>
            </li>
          </ul>
          <ul className="col-2_sm-4 Footer__category-list">
            <li><p className="Footer__category-title">About</p></li>
            <li>
              <p>
                <a href="##">Why shop with us</a>
              </p>
            </li>
            <li>
              <p>
                <a href="##">About us</a>
              </p>
            </li>
            <li>
              <p>
                <a href="##">Fame Society</a>
              </p>
            </li>
            <li>
              <p>
                <a href="##">From our CEO</a>
              </p>
            </li>
            <li>
              <p>
                <a href="##">Privacy Policy</a>
              </p>
            </li>
            <li>
              <p>
                <a href="##">Terms</a>
              </p>
            </li>
          </ul>
          <ul className="col-2_sm-4_xs-0 Footer__category-list">
            <li><p className="Footer__category-title">Shop By</p></li>
            <li>
              <p>
                <a href="##">Best Sellers</a>
              </p>
            </li>
            <li>
              <p>
                <a href="##">What's new</a>
              </p>
            </li>
            <li>
              <p>
                <a href="##">Made in 48 Hours</a>
              </p>
            </li>
            <li>
              <p>
                <a href="##">Formal</a>
              </p>
            </li>
            <li>
              <p>
                <a href="##">Prom</a>
              </p>
            </li>
            <li>
              <p>
                <a href="##">View All Dresses</a>
              </p>
            </li>
          </ul>
          <div className="col-6_md-12_sm-12_sm-first">
            <p className="Footer__copy">
              Sign up to always enjoy free returns
            </p>
            <form
              className={
                classNames({
                  'Footer__form--error': signupError,
                  'grid-center': true,
                  Footer__form: true,

                })
              }
            >
              <div className="col-7_sm-9 padding--none">
                <div>
                  <Input
                    id="footer-email"
                    placeholder="Email your email address"
                    type="email"
                    error={signupError}
                    inlineMeta={signupError ? 'Error! Something is wrong...' : null}
                  />
                </div>
              </div>
              <div className="col-3 padding--none">
                <Button
                  className="padding--none"
                  handleClick={this.handleSignupClick}
                  text="Sign up"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="layout-container grid-noGutter">
          <div className="col-12 Footer__site-version-container">
            <p className="text--noHighlight">Country: &nbsp;
              <span
                className="text--underline cursor--pointer"
                onClick={this.changeSiteVersion}
              >
                {siteVersion}
              </span>
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
