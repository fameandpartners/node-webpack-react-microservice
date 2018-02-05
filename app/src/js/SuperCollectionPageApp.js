import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';

// Sentry Error Tracking
import Raven from 'raven-js';

// Components
import BridesmaidsProductGrid from './components/bridesmaids/BridesmaidsProductGrid';

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


function stateToProps() {
  return {};
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
    return (
      <div className="__react_root__">
        <div className="SuperCollectionPageApp Root__wrapper">
          <BridesmaidsProductGrid
            selectedLength={{ name: 'knee' }}
            products={[
              {
                id: 78000,
                product_name: 'Knee Length Fit and Flare Dress with Strappy Neckline',
                color_count: 19,
                customization_count: 28,
                style_number: 'fp-dr1002-102',
                customization_ids: [
                  't6',
                ],
                length: 'Knee',
                price: {
                  id: 80994,
                  variant_id: 50010,
                  amount: '169.0',
                  currency: 'USD',
                },
                image_urls: [
                  {
                    color: 'Ivory',
                  },
                ],
              },
              {
                id: 78030,
                product_name: 'Knee Length Fit and Flare Dress with Arm Coverage Neckline',
                color_count: 19,
                customization_count: 28,
                style_number: 'fp-dr1002-102',
                customization_ids: [
                  't31',
                ],
                length: 'Knee',
                price: {
                  id: 80994,
                  variant_id: 50010,
                  amount: '169.0',
                  currency: 'USD',
                },
                image_urls: [
                  {
                    color: 'Ivory',
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    );
  }
}

export default connect(stateToProps, dispatchToProps)(SuperCollection);
