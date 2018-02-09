import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { without } from 'lodash';

// Libraries
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// Assets
import BDCustomizationUndoAlerter from './BDCustomizationUndoAlerter';

// Actions
import BDActions from '../../actions/BDActions';

// Services
import BDService from '../../services/BDService';

import {
  generateCustomizationImage,
  removeLengthIdsFromCustomizationIds,
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
    addonOptions: state.$$customizationState.get('addons').toJS().addonOptions,
    bdProductCustomizationDrawer: state.$$bdCustomizationState.get('bdProductCustomizationDrawer'),
    lastTemporaryItemSelection: state.$$bdCustomizationState.get('lastTemporaryItemSelection'),
    $$lastUndoTemporaryCustomizationDetails: state.$$bdCustomizationState.get('lastUndoTemporaryCustomizationDetails'),
    temporaryCustomizationDetails: state.$$bdCustomizationState.get('temporaryCustomizationDetails').toJS(),
    temporaryBDCustomizationLength: state.$$bdCustomizationState.get('temporaryBDCustomizationLength'),
    temporaryBDCustomizationColor: state.$$bdCustomizationState.get('temporaryBDCustomizationColor'),
    productId: state.$$productState.get('productId'),
    sku: state.$$productState.get('sku'),
  };
}

function dispatchToProps(dispatch) {
  const {
    setBDIncompatabilities,
    setBDIncompatabilitiesLoading,
    setBDTemporaryCustomizationDetails,
    redoBDTemporaryCustomizationDetails,
  } = bindActionCreators(BDActions, dispatch);

  return {
    setBDIncompatabilities,
    setBDIncompatabilitiesLoading,
    setBDTemporaryCustomizationDetails,
    redoBDTemporaryCustomizationDetails,
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

  checkForIncompatabilities({
    customizationIds,
    length,
  }) {
    const {
      productId,
      temporaryBDCustomizationLength,
      temporaryCustomizationDetails,
      setBDIncompatabilities,
      setBDIncompatabilitiesLoading,
    } = this.props;
    const sanitizedCustomizationIds = customizationIds || temporaryCustomizationDetails;

    setBDIncompatabilitiesLoading({ isLoading: true });
    BDService.getBridesmaidsIncompatabilities({
      length: length || temporaryBDCustomizationLength,
      customizationIds: removeLengthIdsFromCustomizationIds(sanitizedCustomizationIds),
      productId,
    }).then(({ body, error }) => {
      if (error) {
        console.log('perform some error handling');
      }

      setBDIncompatabilities({
        temporaryCustomizationCombinationId: body.id,
        incompatabilities: body.incompatible_ids,
      });
      setBDIncompatabilitiesLoading({ isLoading: false });
    })
    .catch(() => {
      setBDIncompatabilitiesLoading({ isLoading: false });
    });
  }

  handleUndoClick() {
    const {
      lastTemporaryItemSelection,
      $$lastUndoTemporaryCustomizationDetails,
      temporaryCustomizationDetails,
      setBDTemporaryCustomizationDetails,
    } = this.props;
    const newTemporaryCustomizationDetails = without(
      temporaryCustomizationDetails,
      lastTemporaryItemSelection,
    ).concat($$lastUndoTemporaryCustomizationDetails.toJS());

    setBDTemporaryCustomizationDetails({
      temporaryCustomizationDetails: newTemporaryCustomizationDetails,
    });
    this.checkForIncompatabilities({
      customizationIds: newTemporaryCustomizationDetails,
    });
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

  filterColorForMobileTablet(headlineKey) {
    const { breakpointTypes } = PDPBreakpoints;
    const { breakpoint } = this.props;
    const removeColorConditionMet = (
      (breakpoint === breakpointTypes.mobile || breakpoint === breakpointTypes.tablet)
      && headlineKey === COLOR_CUSTOMIZE
    );
    return !removeColorConditionMet;
  }

  /* eslint-disable max-len */
  generateGroupNameHeadings() {
    const { activeHeading } = this.props;
    return (
      <ul>
        {customizationHeadings
          .filter(this.filterColorForMobileTablet)
          .map(g => (
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
      addonOptions,
      breakpoint,
      children,
      $$lastUndoTemporaryCustomizationDetails,
      onCustomizationHeadingGroupClick,
    } = this.props;

    return (
      <div className="BDProductCustomization u-height--full u-flex u-flex--col">

        <div className="grid-center-bottom u-flex u-flex--1">
          {
            (breakpoint === 'mobile' || breakpoint === 'tablet')
            ? (
              <BDCustomizationUndoAlerter
                addonOptions={addonOptions}
                className="BDProductCustomization__customization-undo u-position--fixed"
                $$lastUndoTemporaryCustomizationDetails={$$lastUndoTemporaryCustomizationDetails}
                onUndoClick={this.handleUndoClick}
              />
            ) : null
          }
          <a className="BDProductCustomization__main-image-wrapper">
            <img className="u-height--full" src={this.generateImageNameForSelections()} alt="dress customization combinations" />
          </a>

          {
            (breakpoint === 'mobile' || breakpoint === 'tablet')
            ? null : (
              <BDCustomizationUndoAlerter
                addonOptions={addonOptions}
                className="BDProductCustomization__customization-undo-desktop u-position--absolute"
                $$lastUndoTemporaryCustomizationDetails={$$lastUndoTemporaryCustomizationDetails}
                onUndoClick={this.handleUndoClick}
              />
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
        <div className="ButtonLedge--height ButtonLedge--height--fake" />
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
BDProductCustomization.propTypes = {
  // Decorator Props
  breakpoint: PropTypes.string.isRequired,
  // Passed Props
  activeHeading: PropTypes.string,
  children: PropTypes.isRequired,
  // Redux Props
  addonOptions: PropTypes.array.isRequired,
  lastTemporaryItemSelection: PropTypes.string,
  $$lastUndoTemporaryCustomizationDetails: PropTypes.array,
  productId: PropTypes.number.isRequired,
  temporaryCustomizationDetails: PropTypes.arrayOf(PropTypes.string).isRequired,
  temporaryBDCustomizationLength: PropTypes.string.isRequired,
  temporaryBDCustomizationColor: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
  // Redux Funcs
  setBDTemporaryCustomizationDetails: PropTypes.func.isRequired,
  setBDIncompatabilities: PropTypes.func.isRequired,
  setBDIncompatabilitiesLoading: PropTypes.func.isRequired,
  // redoBDTemporaryCustomizationDetails: PropTypes.func.isRequired,
  // Func Props
  onCustomizationHeadingGroupClick: PropTypes.func,
  // hasNavItems: PropTypes.bool,
  // productCustomizationDrawer: PropTypes.string,
  // handleDrawerSelection: PropTypes.func.isRequired,
};

BDProductCustomization.defaultProps = {
  activeHeading: null,
  children: null,
  hasNavItems: true,
  lastTemporaryItemSelection: null,
  $$lastUndoTemporaryCustomizationDetails: [],
  showCustomizationGroups: false,
  onCustomizationHeadingGroupClick: null,
  // productCustomizationDrawer: null,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(BDProductCustomization));
