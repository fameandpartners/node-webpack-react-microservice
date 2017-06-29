import React, { Component } from 'react';
import autoBind from 'react-autobind';

// App Components
import SideMenu from './components/shared/SideMenu';
import AppMain from './components/pdp/AppMain';
import OnboardingModal from './components/modal/OnboardingModal';

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

  render() {
    return (
      <div className="App">
        <SideMenu />
        <AppMain />
        <OnboardingModal />
      </div>
    );
  }
}

export default App;
