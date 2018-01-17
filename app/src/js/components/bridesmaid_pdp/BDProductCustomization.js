import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// CSS
import '../../../css/components/BDProductCustomization.scss';
import '../../../css/components/BDCustomizationSelections.scss';

import {
  COLOR_CUSTOMIZE,
  LENGTH_CUSTOMIZE,
  BODICE_CUSTOMIZE,
  STRAPS_SLEEVES_CUSTOMIZE,
  SILHOUTTE_CUSTOMIZE,
  DETAILS_CUSTOMIZE,
  headlines,
} from '../../constants/BDCustomizationConstants';

const customizationHeadings = [
  COLOR_CUSTOMIZE,
  LENGTH_CUSTOMIZE,
  BODICE_CUSTOMIZE,
  STRAPS_SLEEVES_CUSTOMIZE,
  SILHOUTTE_CUSTOMIZE,
  DETAILS_CUSTOMIZE,
];

// UI Components
// import BDProductCustomizationNavigation from './ProductCustomizationNavigation';

class BDProductCustomization extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleHeadingClick(groupName) {
    return () => {
      const { onCustomizationHeadingGroupClick } = this.props;
      onCustomizationHeadingGroupClick(groupName);
    };
  }

  /* eslint-disable max-len */
  generateGroupNameHeadings() {
    const { activeHeading } = this.props;
    console.log('ooooook_>', customizationHeadings);
    return (
      <ul>
        {customizationHeadings.map(g => (
          <li
            key={g}
            className={classnames(
              'BDCustomizationSelections__group-name u-display--inline-block',
              { 'BDCustomizationSelections__group-name--active': activeHeading === g },
            )}
            onClick={this.handleHeadingClick(g)}
          >
            {headlines[g]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const {
      children,
      // hasNavItems,
      onCustomizationHeadingGroupClick,
    } = this.props;

    return (
      <div className="BDProductCustomization u-height--full u-flex u-flex--col">

        <div className="grid-center u-flex u-flex--1">
          <a className="u-height--full">
            <img className="u-height--full" src="http://via.placeholder.com/600x600" alt="stupid" />
          </a>
        </div>

        { onCustomizationHeadingGroupClick ?
          (
            <div className="BDCustomizationSelections__groups grid">
              {this.generateGroupNameHeadings()}
            </div>
          ) : null
        }

        <div className="BDProductCustomization__wrapper u-text-align--center">
          <div className="BDProductCustomization__content u-height--full u-width--full">
            { children }
          </div>
        </div>
        <div className="ButtonLedge--height __fake__" />
      </div>
    );
  }
}

BDProductCustomization.propTypes = {
  // Passed Props
  children: PropTypes.node.isRequired,
  activeHeading: PropTypes.string,
  // Func Props
  onCustomizationHeadingGroupClick: PropTypes.func,
  // hasNavItems: PropTypes.bool,
  // productCustomizationDrawer: PropTypes.string,
  // handleDrawerSelection: PropTypes.func.isRequired,
};

BDProductCustomization.defaultProps = {
  activeHeading: null,
  hasNavItems: true,
  showCustomizationGroups: false,
  onCustomizationHeadingGroupClick: null,
  // productCustomizationDrawer: null,
};


export default BDProductCustomization;

// <div className="BDProductCustomization__header">
//   { hasNavItems
//     ? (
//       <div className="grid-12">
//         <div className="col-1">
//           BDProductCustomizationNavigation
//         </div>
//       </div>
//     )
//     : null
//   }
// </div>
