import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

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

    if (service === 'bronto') {
      // TODO: check if dev (vs. prod) & use dummy URL
      const directAddUrl = `http://testurl/&email=${userEmail}`;
      // const directAddUrl = `http://hello.fameandpartners.com/public/?q=direct_add&fn=Public_DirectAddForm&id=bdgojucscmxsxluwqpqutjwzwwfhbah&email=${userEmail}&createCookie=1`;
      const brontoImgEl = `<img src="${directAddUrl}" width="0" height="0" border="0" alt="" />`;

      this.brontoSuccessNode.innerHTML = brontoImgEl;
    }
  }

  render() {
    const {
      signupError,
    } = this.state;

    return (
      <div className="EmailCapture grid-center">
        <div className="col-7_sm-9 padding--none">
          <div>
            <Input
              id="footer-email"
              placeholder="Email your email address"
              type="email"
              error={signupError}
              inlineMeta={signupError ? 'Error! Something is wrong...' : null}
              onChange={this.handleInputEmailChange}
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
        <div
          className="hidden"
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

export default EmailCapture;
