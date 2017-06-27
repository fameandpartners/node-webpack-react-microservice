import React, { Component } from 'react';
import autoBind from 'react-autobind';

// App Components
import SideMenu from './components/shared/SideMenu';
import AppMain from './components/pdp/AppMain';
import Modal from './components/shared/Modal';
import Input from './components/form/Input';

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

  render() {
    return (
      <div className="App">
        <SideMenu />
        <AppMain toggleModal={this.toggleModal} />
        <Modal onClose={this.toggleModal} isOpen={this.state.isOpen}>
          <div className="Modal__content">
            <h2>Sign up to save your creation</h2>
            <button>Sign up with Facebook</button>
            <hr />
            <Input id="signup_first" label="First Name" />
            <Input id="signup_last" label="Last Name" />
            <Input id="signup_email" label="Email" />
            <Input id="signup_password" type="password" label="Password" />
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;
