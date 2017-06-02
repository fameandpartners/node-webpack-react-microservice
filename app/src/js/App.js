import React, { Component } from 'react';
import autoBind from 'react-autobind';

// App Components
import SideMenu from './components/shared/SideMenu';
import AppMain from './components/pdp/AppMain';

// Global Styles
import '../css/global/variables.scss';
import '../css/reset.scss';
import '../css/gridlex.scss';
import '../css/helpers.scss';
import '../css/components/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  handleClick() {
    console.warn('javascript working');
  }
  sampleTest() {
    return true;
  }
  componentDidMount() {
    console.warn('Mounting Node', this.props);
  }

  render() {
    return (
      <div className="App" cacheKey="App">
        <SideMenu />
        <AppMain />
      </div>
    );
  }
}

export default App;
