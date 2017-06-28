import React, { Component } from 'react';
import autoBind from 'react-autobind';

// App Components
import SideMenu from './components/shared/SideMenu';
import CancelOut from './components/shared/CancelOut';
import AppMain from './components/pdp/AppMain';
import Modal from './components/shared/Modal';
import Input from './components/form/Input';
import FacebookButton from './components/generic/FacebookButton';
import Button from './components/generic/Button';
import Container from './components/generic/Container';

// Global Styles
import '../css/global/variables.scss';
import '../css/reset.scss';
import '../css/gridlex.scss';
import '../css/helpers.scss';
import '../css/layout.scss';
import '../css/typography.scss';
import '../css/components/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    autoBind(this);
  }

  sampleTest() {
    return true;
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  closeModal() {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    return (
      <div className="App">
        <SideMenu />
        <AppMain toggleModal={this.toggleModal} />
        <Modal onClose={this.closeModal} isOpen={this.state.isOpen}>
          <Container>
            <div className="Modal__header">
              <div className="u-text-align-right">
                <CancelOut onClick={this.closeModal} />
              </div>
            </div>
            <div className="Modal__content typography">
              <div className="Modal__content--med-margin-bottom">
                <h3 className="h5">Sign up to save your creation</h3>
              </div>
              <FacebookButton />
              <h4 className="h5 hr">Or</h4>
              <div className="Modal__content--med-margin-bottom">
                <Input id="signup_first" label="First Name" />
                <Input id="signup_last" label="Last Name" />
                <Input id="signup_email" label="Email" />
                <Input id="signup_password" type="password" label="Password" />
              </div>
            </div>
            <Button tall text="Sign up" />
          </Container>
        </Modal>
      </div>
    );
  }
}

export default App;
