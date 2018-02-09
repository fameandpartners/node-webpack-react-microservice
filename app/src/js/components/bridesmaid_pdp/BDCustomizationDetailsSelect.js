/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { includes, intersection, without } from 'lodash';
import { formatCents } from '../../utilities/accounting';

// Services
import BDService from '../../services/BDService';

// Utilities
import {
  generateCustomizationImage,
  removeLengthIdsFromCustomizationIds,
  } from '../../utilities/bridesmaids';

// Actions
import * as BDActions from '../../actions/BDActions';

// Components
import BDColorSelections from '../bridesmaid_pdp/BDColorSelections';

// Constants
import BDCustomizationConstants from '../../constants/BDCustomizationConstants';


// CSS
import '../../../css/components/BDCustomizationDetailsSelect.scss';

function stateToProps({ $$bdCustomizationState, $$customizationState, $$productState }) {
  const addonOptions = $$customizationState.get('addons').toJS().addonOptions;
  const $$temporaryCustomizationDetails = $$bdCustomizationState.get('temporaryCustomizationDetails');

  return {
    addonOptions,
    sku: $$productState.get('sku'),
    productId: $$productState.get('productId'),
    incompatabilities: $$bdCustomizationState.get('incompatabilities').toJS(),
    incompatabilitiesLoading: $$bdCustomizationState.get('incompatabilitiesLoading'),
    productDefaultColors: $$productState.get('productDefaultColors').toJS(),
    singleCustomizationIncompatabilities: $$bdCustomizationState.get('singleCustomizationIncompatabilities').toJS(),
    temporaryCustomizationDetails: $$temporaryCustomizationDetails.toJS(),
    temporaryBDCustomizationLength: $$bdCustomizationState.get('temporaryBDCustomizationLength'),
    temporaryBDCustomizationColor: $$bdCustomizationState.get('temporaryBDCustomizationColor'),
    availableLengths: $$bdCustomizationState.get('availableBDCustomizationLengths').toJS(),
  };
}

function dispatchToProps(dispatch) {
  const {
    setBDTemporaryCustomizationDetails,
    setBDTemporaryColor,
    setBDTemporaryLength,
    setBDIncompatabilities,
    setBDIncompatabilitiesLoading,
    undoBDTemporaryCustomizationDetails,
  } = bindActionCreators(BDActions, dispatch);

  return {
    setBDTemporaryCustomizationDetails,
    setBDTemporaryColor,
    setBDTemporaryLength,
    setBDIncompatabilities,
    setBDIncompatabilitiesLoading,
    undoBDTemporaryCustomizationDetails,
  };
}

class BDCustomizationDetailsSelect extends Component {
  constructor(props) {
    super(props);
    autobind(this);
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
    // const length
    // params[:selectedLength], params[:selectedSilhouette], params[:selectedTopDetails], [{color:  params[:selectedColor]}].to_json)
    // customization_ids].sort.join(','), params[:length], params[:silhouette], params[:neckline], params[:product_id]
  }

  createNewTemporaryFilters(detailGuid, currentTemporaryCustomizationDetails) {
    const optionAlreadySelected = includes(currentTemporaryCustomizationDetails, detailGuid);

    if (optionAlreadySelected) { // Removal
      return without(currentTemporaryCustomizationDetails, detailGuid);
    }

    return currentTemporaryCustomizationDetails.concat(detailGuid); // Add
  }

  generateImageNameForCustomizationId(customizationId, isIncompatible = false) {
    const {
      temporaryBDCustomizationColor,
      temporaryCustomizationDetails,
      temporaryBDCustomizationLength,
      sku,
    } = this.props;
    const { colorNames } = BDCustomizationConstants;
    const customizationIds = isIncompatible
      ? [customizationId]
      : temporaryCustomizationDetails.concat(customizationId);


    const imageStr = generateCustomizationImage({
      sku: sku.toLowerCase(),
      customizationIds,
      imgSizeStr: '142x142',
      length: temporaryBDCustomizationLength.replace('-', '_'),
      colorCode: colorNames[temporaryBDCustomizationColor],
    });
    return imageStr;
  }

  generateImageNameForLengthCustomizationId(customizationId) {
    const {
      availableLengths,
      temporaryBDCustomizationColor,
      temporaryCustomizationDetails,
      sku,
    } = this.props;
    const { colorNames } = BDCustomizationConstants;
    const imageStr = generateCustomizationImage({
      sku: sku.toLowerCase(),
      customizationIds: temporaryCustomizationDetails.concat(customizationId),
      imgSizeStr: '142x142',
      length: availableLengths[customizationId].replace('-', '_'),
      colorCode: colorNames[temporaryBDCustomizationColor],
    });
    return imageStr;
  }

  handleIncompatibleSelection(item) {
    const {
      singleCustomizationIncompatabilities,
      temporaryCustomizationDetails,
      temporaryBDCustomizationLength,
      setBDTemporaryCustomizationDetails,
      undoBDTemporaryCustomizationDetails,
    } = this.props;

    const incompatabilities = singleCustomizationIncompatabilities[item.id][temporaryBDCustomizationLength];
    const undoArray = intersection(temporaryCustomizationDetails, incompatabilities);
    const difference = without(temporaryCustomizationDetails, ...undoArray);
    const newTemporaryCustomizationDetails = this.createNewTemporaryFilters(item.id.toLowerCase(), difference);
    // console.log('temporaryCustomizationDetails', temporaryCustomizationDetails);
    // console.log('incompatabilities', incompatabilities);
    // console.log('undoArray', undoArray);
    // console.log('difference', difference);
    // console.log('newTemporaryCustomizationDetails', newTemporaryCustomizationDetails);
    // console.log('');

    undoBDTemporaryCustomizationDetails({
      undoArray,
      lastTemporaryItemSelection: item.id,
    });
    setBDTemporaryCustomizationDetails({ temporaryCustomizationDetails: newTemporaryCustomizationDetails });
    this.checkForIncompatabilities({
      customizationIds: newTemporaryCustomizationDetails,
    });
  }

  handleCompatibleSelection(item) {
    const {
      temporaryCustomizationDetails,
      setBDTemporaryCustomizationDetails,
      undoBDTemporaryCustomizationDetails,
    } = this.props;
    const newTemporaryCustomizationDetails = this.createNewTemporaryFilters(item.id.toLowerCase(), temporaryCustomizationDetails);

    undoBDTemporaryCustomizationDetails({
      undoArray: [],
      lastTemporaryItemSelection: item.id,
    });
    setBDTemporaryCustomizationDetails({ temporaryCustomizationDetails: newTemporaryCustomizationDetails });
    this.checkForIncompatabilities({
      customizationIds: newTemporaryCustomizationDetails,
    });
  }

  handleCustomizationSelection(item, isIncompatible, isSelected) {
    if (isIncompatible && !isSelected) {
      console.log('INCOMPATIBLE SELECTION');
      return this.handleIncompatibleSelection(item);
    }

    console.log('compatible SELECTION');
    return this.handleCompatibleSelection(item);
  }

  handleLengthSelection(item) {
    const {
      availableLengths,
      setBDTemporaryLength,
    } = this.props;
    const lengthStrChoice = availableLengths[item.id];
    setBDTemporaryLength({ temporaryBDCustomizationLength: lengthStrChoice });
    this.checkForIncompatabilities({
      length: lengthStrChoice,
    });
    // TODO: @elgrecode 3: Create new url naming structure to be shared in shareable link
  }

  handleColorSelection(color) {
    const { setBDTemporaryColor } = this.props;
    setBDTemporaryColor({
      temporaryBDCustomizationColor: color.presentation,
    });
  }

  generateLengthDetailOptions() {
    const {
      addonOptions,
      availableLengths,
      groupName,
      temporaryBDCustomizationLength,
    } = this.props;

    return addonOptions
    .filter(ao => ao.group === groupName)
    .map((item) => {
      const lengthStr = availableLengths[item.id];
      return (
        <div className="u-display--inline-block u-mr--normal" key={item.id}>
          <div
            onClick={() => this.handleLengthSelection(item)}
            className="BDCustomizationDetailsSelect__image-wrapper u-cursor--pointer"
          >
            <img
              className={classnames({
                'BDCustomizationDetailsSelect--selected': temporaryBDCustomizationLength === lengthStr,
              })}
              alt={item.id}
              src={this.generateImageNameForLengthCustomizationId(item.id)}
            />
            <div className="BDCustomizationDetailsSelect__description">
              {lengthStr}
            </div>
          </div>
        </div>
      );
    });
  }

  generateCustomizationPrice(priceInCents) {
    return formatCents(
      priceInCents,
      0,
      '$');
  }


  generateGenericDetailOptions() {
    const {
      addonOptions,
      groupName,
      incompatabilities,
      incompatabilitiesLoading,
      temporaryCustomizationDetails,

    } = this.props;

    return addonOptions
    .filter(ao => ao.group === groupName)
    .map((item) => {
      const isSelected = includes(temporaryCustomizationDetails, item.id.toLowerCase());
      const isIncompatible = incompatabilities.indexOf(item.id) > -1;
      return (
        <div className="u-display--inline-block u-mr--normal" key={item.id}>
          <div
            onClick={() => this.handleCustomizationSelection(item, isIncompatible, isSelected)}
            className="BDCustomizationDetailsSelect__image-wrapper u-cursor--pointer"
          >
            <img
              className={classnames({
                'BDCustomizationDetailsSelect--selected': isSelected,
                'BDCustomizationDetailsSelect--loading': incompatabilitiesLoading,
              })}
              alt={item.id}
              src={this.generateImageNameForCustomizationId(item.id, isIncompatible)}
            />
            <div className="BDCustomizationDetailsSelect__description">
              <p>{item.description} {this.generateCustomizationPrice(item.centsTotal)}</p>
            </div>
          </div>
        </div>
      );
    },

  );
  }

  getAddonDetailOptions() {
    const {
      groupName,
      productDefaultColors,
      temporaryBDCustomizationColor,
    } = this.props;

    // Three Options
    if (groupName === BDCustomizationConstants.groupNames.LENGTH_CUSTOMIZE) {
      return this.generateLengthDetailOptions();
    }
    if (groupName === BDCustomizationConstants.groupNames.COLOR_CUSTOMIZE) {
      return (
        <BDColorSelections
          productColors={productDefaultColors}
          selectedColor={temporaryBDCustomizationColor}
          handleColorSelection={this.handleColorSelection}
        />
      );
    }

    return this.generateGenericDetailOptions();
  }


  render() {
    return (
      <div className="BDCustomizationDetailsSelect u-white-space--nowrap u-text-align-left u-height--full u-overflow-x--scroll">
        {this.getAddonDetailOptions()}
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
BDCustomizationDetailsSelect.propTypes = {
  temporaryCustomizationDetails: PropTypes.array.isRequired,
  addonOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    position: PropTypes.number,
    price: PropTypes.object,
    centsTotal: PropTypes.number,
    img: PropTypes.string,
  })),
  groupName: PropTypes.string,
  incompatabilities: PropTypes.object,
  incompatabilitiesLoading: PropTypes.bool,
  productId: PropTypes.number.isRequired,
  productDefaultColors: PropTypes.array.isRequired,
  singleCustomizationIncompatabilities: PropTypes.object.isRequired,
  sku: PropTypes.string.isRequired,
  temporaryBDCustomizationColor: PropTypes.string.isRequired,
  temporaryBDCustomizationLength: PropTypes.string,
  availableLengths: PropTypes.object,
  // Redux Funcs
  setBDTemporaryColor: PropTypes.func.isRequired,
  setBDTemporaryCustomizationDetails: PropTypes.func.isRequired,
  setBDTemporaryLength: PropTypes.func.isRequired,
  setBDIncompatabilities: PropTypes.func.isRequired,
  setBDIncompatabilitiesLoading: PropTypes.func.isRequired,
  undoBDTemporaryCustomizationDetails: PropTypes.func.isRequired,
};

BDCustomizationDetailsSelect.defaultProps = {
  availableLengths: null,
  addonOptions: [],
  groupName: null,
  incompatabilities: [],
  incompatabilitiesLoading: false,
  temporaryBDCustomizationLength: null,
};

export default connect(stateToProps, dispatchToProps)(BDCustomizationDetailsSelect);
