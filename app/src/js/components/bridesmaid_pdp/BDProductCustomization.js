import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';

// Libraries
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// Assets
import AlertIcon from '../../../svg/i-alert.svg';

import {
  generateCustomizationImage,
} from '../../utilities/bridesmaids';

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
  colorNames,
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

function stateToProps(state) {
  return {
    activeBDCustomizationHeading: state.$$bdCustomizationState.get('activeBDCustomizationHeading'),
    bdProductCustomizationDrawer: state.$$bdCustomizationState.get('bdProductCustomizationDrawer'),
    temporaryCustomizationDetails: state.$$bdCustomizationState.get('temporaryCustomizationDetails').toJS(),
    temporaryBDCustomizationLength: state.$$bdCustomizationState.get('temporaryBDCustomizationLength'),
    temporaryBDCustomizationColor: state.$$bdCustomizationState.get('temporaryBDCustomizationColor'),
    sku: state.$$productState.get('sku'),
  };
}


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

  generateImageNameForSelections() {
    const {
      temporaryBDCustomizationColor,
      temporaryCustomizationDetails,
      temporaryBDCustomizationLength,
      sku,
    } = this.props;

    const imageStr = generateCustomizationImage({
      sku: sku.toLowerCase(),
      customizationIds: temporaryCustomizationDetails,
      imgSizeStr: '800x800',
      length: temporaryBDCustomizationLength,
      colorCode: colorNames[temporaryBDCustomizationColor],
    });
    return imageStr;
  }

  /* eslint-disable max-len */
  generateGroupNameHeadings() {
    const { activeHeading } = this.props;
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
      breakpoint,
      children,
      // hasNavItems,
      onCustomizationHeadingGroupClick,
    } = this.props;

    return (
      <div className="BDProductCustomization u-height--full u-flex u-flex--col">

        <div className="grid-center-bottom u-flex u-flex--1">
          {
            (breakpoint === 'mobile' || breakpoint === 'tablet')
            ? (
              <div className="BDProductCustomization__customization-undo u-position--fixed">
                <AlertIcon
                  width="20px"
                  height="20px"
                />
              </div>
            ) : null
          }
          <a className="BDProductCustomization__main-image-wrapper">
            <img className="u-height--full" src={this.generateImageNameForSelections()} alt="dress customization combinations" />
          </a>

          {
            (breakpoint === 'mobile' || breakpoint === 'tablet')
            ? null : (
              <div className="BDProductCustomization__customization-undo-desktop u-position--absolute">
                <AlertIcon
                  width="20px"
                  height="20px"
                />
              </div>
            )
          }
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
  // Decorator Props
  breakpoint: PropTypes.string.isRequired,
  // Passed Props
  children: PropTypes.isRequired,
  activeHeading: PropTypes.string,
  // Redux Props
  temporaryCustomizationDetails: PropTypes.arrayOf(PropTypes.string).isRequired,
  temporaryBDCustomizationLength: PropTypes.string.isRequired,
  temporaryBDCustomizationColor: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
  // Func Props
  onCustomizationHeadingGroupClick: PropTypes.func,
  // hasNavItems: PropTypes.bool,
  // productCustomizationDrawer: PropTypes.string,
  // handleDrawerSelection: PropTypes.func.isRequired,
};

BDProductCustomization.defaultProps = {
  children: null,
  activeHeading: null,
  hasNavItems: true,
  showCustomizationGroups: false,
  onCustomizationHeadingGroupClick: null,
  // productCustomizationDrawer: null,
};


export default Resize(PDPBreakpoints)(connect(stateToProps)(BDProductCustomization));
