import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

// Sentry Error Tracking
import Raven from 'raven-js';

// Components
import BridesmaidsProductGrid from './components/bridesmaids/BridesmaidsProductGrid';
import BridesmaidsThemeHeader from './components/bridesmaids/BridesmaidsThemeHeader';

// Global Styles
import '../css/global/variables.scss';
import '../css/reset.scss';
import '../css/gridlex.scss';
import '../css/helpers.scss';
import '../css/typography.scss';
import '../css/layout.scss';
import '../css/animations.scss';
import '../css/components/SuperCollection.scss';

// Configure Error Tracking
Raven
  .config('https://bc3111a59f064fbba31becef25d2fb7c@sentry.io/88252')
  .install();


function stateToProps({ $$bridesmaidsFilterState, $$themeState }) {
  return {
    bridesmaidsColors: $$bridesmaidsFilterState.get('$$bridesmaidsFilterColors').toJS(),
    products: $$themeState.get('collection').toJS(),
    themeName: $$themeState.get('name'),
  };
}

function dispatchToProps() {
  return {};
}

class SuperCollection extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    autoBind(this);
  }

  render() {
    const { bridesmaidsColors, products, themeName } = this.props;
    return (
      <div className="__react_root__">
        <div className="SuperCollectionPageApp Root__wrapper">
          <BridesmaidsThemeHeader themeName={themeName} />
          <BridesmaidsProductGrid
            bridesmaidsColors={bridesmaidsColors}
            selectedLength={{ name: 'knee' }}
            products={products}
          />
        </div>
      </div>
    );
  }
}

SuperCollection.propTypes = {
  bridesmaidsColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    presentation: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })),
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  themeName: PropTypes.string.isRequired,
};

SuperCollection.defaultProps = {
  bridesmaidsColors: [],
};

export default connect(stateToProps, dispatchToProps)(SuperCollection);
