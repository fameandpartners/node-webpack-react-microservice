/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

// Services
import BDService from '../../services/BDService';

// Utilities
import { generateCustomizationImage } from '../../utilities/bridesmaids';

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
    incompatabilities: $$bdCustomizationState.get('incompatabilities'),
    $$temporaryCustomizationDetails,
    temporaryBDCustomizationLength: $$bdCustomizationState.get('temporaryBDCustomizationLength'),
    productDefaultColors: $$productState.get('productDefaultColors').toJS(),
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
  } = bindActionCreators(BDActions, dispatch);

  return {
    setBDTemporaryCustomizationDetails,
    setBDTemporaryColor,
    setBDTemporaryLength,
    setBDIncompatabilities,
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
      $$temporaryCustomizationDetails,
      setBDIncompatabilities,
    } = this.props;

    BDService.getBridesmaidsIncompatabilities({
      length: length || temporaryBDCustomizationLength,
      customizationIds: customizationIds || $$temporaryCustomizationDetails.toJS(),
      productId,
    }).then((res) => {
      setBDIncompatabilities({ incompatabilities: res.body.incompatible_ids });
    });
    // const length
    // params[:selectedLength], params[:selectedSilhouette], params[:selectedTopDetails], [{color:  params[:selectedColor]}].to_json)
    // customization_ids].sort.join(','), params[:length], params[:silhouette], params[:neckline], params[:product_id]
  }

  createNewTemporaryFilters(detailGuid) {
    const { $$temporaryCustomizationDetails } = this.props;
    const optionAlreadySelected = $$temporaryCustomizationDetails.includes(detailGuid);

    if (optionAlreadySelected) { // Removal
      return $$temporaryCustomizationDetails.filterNot(t => t === detailGuid);
    }

    return $$temporaryCustomizationDetails.push(detailGuid); // Add
  }

  generateImageNameForCustomizationId(customizationId) {
    const {
      temporaryBDCustomizationColor,
      $$temporaryCustomizationDetails,
      temporaryBDCustomizationLength,
      sku,
    } = this.props;
    const { colorNames } = BDCustomizationConstants;
    const imageStr = generateCustomizationImage({
      sku: sku.toLowerCase(),
      customizationIds: $$temporaryCustomizationDetails.toJS().concat(customizationId),
      imgSizeStr: '142x142',
      length: temporaryBDCustomizationLength,
      colorCode: colorNames[temporaryBDCustomizationColor],
    });
    return imageStr;
  }

  handleCustomizationSelection(item) {
    const { setBDTemporaryCustomizationDetails } = this.props;
    const $$newTemporaryDetails = this.createNewTemporaryFilters(item.id.toLowerCase());
    setBDTemporaryCustomizationDetails({ temporaryCustomizationDetails: $$newTemporaryDetails });
    this.checkForIncompatabilities({
      customizationIds: $$newTemporaryDetails.toJS(),
    });
    // 3: Create new url naming structure to be shared in shareable link
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
              src={this.generateImageNameForCustomizationId(item.id)}
            />
            <div className="BDCustomizationDetailsSelect__description">
              {lengthStr}
            </div>
          </div>
        </div>
      );
    });
  }

  generateGenericDetailOptions() {
    const {
      addonOptions,
      groupName,
      incompatabilities,
      $$temporaryCustomizationDetails,
    } = this.props;

    return addonOptions
    .filter(ao => ao.group === groupName)
    .filter(item => !(incompatabilities.indexOf(item.id) > -1))
    .map(item => (
      <div className="u-display--inline-block u-mr--normal" key={item.id}>
        <div
          onClick={() => this.handleCustomizationSelection(item)}
          className="BDCustomizationDetailsSelect__image-wrapper u-cursor--pointer"
        >
          <img
            className={classnames({
              'BDCustomizationDetailsSelect--selected': $$temporaryCustomizationDetails.includes(item.id.toLowerCase()),
            })}
            alt={item.id}
            src={this.generateImageNameForCustomizationId(item.id)}
          />
          <div className="BDCustomizationDetailsSelect__description">{item.description}</div>
        </div>
      </div>
    ));
  }

  getAddonDetailOptions() {
    const {
      groupName,
      productDefaultColors,
      temporaryBDCustomizationColor,
    } = this.props;

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
  $$temporaryCustomizationDetails: ImmutablePropTypes.list.isRequired,
  addonOptions: PropTypes.arrayOf({
    id: PropTypes.string,
    description: PropTypes.string,
    position: PropTypes.number,
    price: PropTypes.object,
    centsTotal: PropTypes.number,
    img: PropTypes.string,
  }),
  groupName: PropTypes.string,
  incompatabilities: PropTypes.arrayOf(PropTypes.string),
  productId: PropTypes.number.isRequired,
  productDefaultColors: PropTypes.array.isRequired,
  temporaryBDCustomizationColor: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
  temporaryBDCustomizationLength: PropTypes.string,
  availableLengths: PropTypes.object,
  // Redux Funcs
  setBDTemporaryColor: PropTypes.func.isRequired,
  setBDTemporaryCustomizationDetails: PropTypes.func.isRequired,
  setBDTemporaryLength: PropTypes.func.isRequired,
  setBDIncompatabilities: PropTypes.func.isRequired,
};

BDCustomizationDetailsSelect.defaultProps = {
  availableLengths: null,
  addonOptions: [],
  groupName: null,
  incompatabilities: [],
  temporaryBDCustomizationLength: null,
};

export default connect(stateToProps, dispatchToProps)(BDCustomizationDetailsSelect);
