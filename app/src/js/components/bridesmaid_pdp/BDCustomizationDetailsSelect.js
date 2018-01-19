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

// CSS
import '../../../css/components/BDCustomizationDetailsSelect.scss';

function stateToProps({ $$bdCustomizationState, $$customizationState, $$productState }) {
  const addonOptions = $$customizationState.get('addons').toJS().addonOptions;
  const $$temporaryCustomizationDetails = $$bdCustomizationState.get('temporaryCustomizationDetails');

  return {
    addonOptions,
    sku: $$productState.get('sku'),
    $$temporaryCustomizationDetails,
    temporaryBDCustomizationLength: $$bdCustomizationState.get('temporaryBDCustomizationLength'),
  };
}

function dispatchToProps(dispatch) {
  const { setBDTemporaryCustomizationDetails } = bindActionCreators(BDActions, dispatch);

  return {
    setBDTemporaryCustomizationDetails,
  };
}

class BDCustomizationDetailsSelect extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  checkForIncompatabilities(customizationIds) {
    const {
      sku,
      temporaryBDCustomizationLength,
    } = this.props;
    console.log('this.props', this.props);

    BDService.getBridesmaidsIncompatabilities({
      length: temporaryBDCustomizationLength,
      customizationIds,
      productId: sku,
    }).then((res) => {
      console.log('res', res);
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
    const { $$temporaryCustomizationDetails, sku } = this.props;
    const imageStr = generateCustomizationImage({
      sku,
      customizationIds: $$temporaryCustomizationDetails.toJS().concat(customizationId),
      imgSizeStr: '800x800',
      length: 'maxi',
      colorCode: '000',
    });
    return imageStr;
  }

  handleCustomizationSelection(item) {
    // 3 things to occur
    const { setBDTemporaryCustomizationDetails } = this.props;
    const $$newTemporaryDetails = this.createNewTemporaryFilters(item.id.toLowerCase());
    setBDTemporaryCustomizationDetails({ temporaryCustomizationDetails: $$newTemporaryDetails });
    this.checkForIncompatabilities($$newTemporaryDetails.toJS());
    // 3: Create new url naming structure to be shared in shareable link
  }

  getAddonDetailOptions() {
    const {
      addonOptions,
      $$temporaryCustomizationDetails,
    } = this.props;

    return addonOptions
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
              src="http://via.placeholder.com/142x142"
            />
            <div className="BDCustomizationDetailsSelect__description">{item.description}</div>
            <div className="BDCustomizationDetailsSelect__description">{this.generateImageNameForCustomizationId(item.id)}</div>
          </div>
        </div>
      ));
  }


  render() {
    return (
      <div className="BDCustomizationDetailsSelect u-white-space--nowrap u-text-align-left u-height--full u-overflow-x--scroll">
        {this.getAddonDetailOptions()}
      </div>
    );
  }
}

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
  sku: PropTypes.string.isRequired,
  temporaryBDCustomizationLength: PropTypes.string,
  // Redux Funcs
  setBDTemporaryCustomizationDetails: PropTypes.func.isRequired,
};

BDCustomizationDetailsSelect.defaultProps = {
  addonOptions: [],
  temporaryBDCustomizationLength: null,
};

export default connect(stateToProps, dispatchToProps)(BDCustomizationDetailsSelect);
