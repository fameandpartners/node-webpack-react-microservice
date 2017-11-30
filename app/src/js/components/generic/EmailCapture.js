import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import classnames from 'classnames';

// Polyfills
import win from '../../polyfills/windowPolyfill';

// Components
import Button from '../generic/Button';
import Input from '../form/Input';

// CSS
import '../../../css/components/EmailCapture.scss';

class EmailCapture extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      userEmail: null,
      signupError: false,
      signupSuccess: null,
    };
  }

  handleInputEmailChange({ value }) {
    this.setState({
      userEmail: value,
      signupError: false,
    });
  }

  // TODO: move to an imported helper lib
  isEmailValid() {
    const re = /\S+@\S+\.\S+/;
    return re.test(this.state.userEmail);
  }

  // TODO: probably should be a helper too? or at least pulled from appState...
  isDev() {
    const url = win.location.href;
    return !url.includes('www.fameandpartners');
  }

  handleSignupClick(e) {
    e.preventDefault();

    if (this.isEmailValid()) {
      this.handleSubscribe();
    } else {
      this.setState({
        signupError: true,
      });
    }
  }

  handleSubscribe() {
    const { service } = this.props;
    const { userEmail } = this.state;

    if (this.isDev()) {
      console.log('DEV: Successfully "subscribed"!');
      this.handleSuccess();
      return;
    }

    if (service === 'bronto') {
      const directAddUrl = `http://hello.fameandpartners.com/public/?q=direct_add&fn=Public_DirectAddForm&id=bdgojucscmxsxluwqpqutjwzwwfhbah&email=${userEmail}&createCookie=1`;
      const brontoImgEl = `<img src="${directAddUrl}" width="0" height="0" border="0" alt="" />`;

      this.brontoSuccessNode.innerHTML = brontoImgEl;
    }

    this.handleSuccess();
  }

  handleSuccess() {
    this.setState({
      signupSuccess: true,
    });
  }

  render() {
    const {
      className,
      signupError,
      signupSuccess,
    } = this.state;

    return (
      <div
        className={classnames(
        'EmailCapture',
        className,
      )}
      >
        <h2
          className="EmailCapture__success col-12"
          style={{
            display: signupSuccess ? 'flex' : 'none',
          }}
        >
          Thanks for signing up!
        </h2>
        <div
          className="grid-center"
          style={{
            display: signupSuccess ? 'none' : 'flex',
          }}
        >
          <div className="col-9 padding--none">
            <div>
              <Input
                id="footer-email"
                placeholder="Enter your email address"
                type="email"
                error={signupError}
                inlineMeta={signupError ? 'Please enter a valid email...' : null}
                onChange={this.handleInputEmailChange}
              />
            </div>
          </div>
          <div className="col-3 padding--none">
            <Button
              className="padding--none"
              handleClick={this.handleSignupClick}
              text="Join&nbsp;Now"
            />
          </div>
        </div>
        <div
          style={{ display: 'none' }}
          ref={x => this.brontoSuccessNode = x}
        />
      </div>
    );
  }
}

EmailCapture.propTypes = {
  // pseudo enum
  service: PropTypes.oneOf([
    'bronto',
  ]).isRequired,
};

EmailCapture.defaultProps = {
  className: '',
};

export default EmailCapture;
