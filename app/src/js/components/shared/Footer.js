import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autoBind from 'react-autobind';

// OTHER / TODO: REMOVE
import noop from '../../libs/noop';
import objnoop from '../../libs/objnoop';

// Constants
import ModalConstants from '../../constants/ModalConstants';

// Constants
import ModalActions from '../../actions/ModalActions';

// Components
import Button from '../generic/Button';
import Input from '../form/Input';

// CSS
import '../../../css/components/Footer.scss';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ModalActions, dispatch);
}

/* eslint-disable react/prefer-stateless-function */
class Footer extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleSignupClick(e) {
    e.preventDefault();
    this.props.activateModal({ modalId: ModalConstants.SIGN_UP_MODAL });
  }

  render() {
    return (
      <footer className="Footer">
        <div className="layout-container grid-noGutter-12">
          <div className="col-12">
            <h2>Sign up to always enjoy free returns</h2>
            <form>
              <div className="display--inline-block">
                <Input id="footer-email" placeholder="Email Address" />
              </div>
              <div className="display--inline-block">
                <Button handleClick={noop} text="Sign up" />
              </div>
              <Button handleClick={this.handleSignupClick} text="Test Sign up" />
            </form>
          </div>
          <ul className="col-6">
            <li className="Footer__category-title">About</li>
            <li><a href="##">Why shop with us</a></li>
            <li><a href="##">About us</a></li>
            <li><a href="##">Fame Society</a></li>
            <li><a href="##">From our CEO</a></li>
            <li><a href="##">Privacy Policy</a></li>
            <li><a href="##">Terms</a></li>
          </ul>
          <ul className="col-6">
            <li
              className="Footer__category-title"
            >
      Help
      </li>
            <li><a href="##">Shipping Info</a></li>
            <li><a href="##">Returns Policy</a></li>
            <li><a href="##">Fame Contact Us</a></li>
            <li><a href="##">FAQs</a></li>
            <li><a href="##">Size Guide</a></li>
            <li><a href="##">Track My Order</a></li>
          </ul>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
};

export default connect(objnoop, mapDispatchToProps)(Footer);
