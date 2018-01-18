/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

// Services
// import BDService from '../../services/BDService';

// Actions
import * as BDActions from '../../actions/BDActions';

// CSS
import '../../../css/components/BDCustomizationDetailsSelect.scss';

function stateToProps({ $$bdCustomizationState, $$customizationState }) {
  const addonOptions = $$customizationState.get('addons').toJS().addonOptions;
  const $$temporaryCustomizationDetails = $$bdCustomizationState.get('temporaryCustomizationDetails');

  return {
    addonOptions,
    $$temporaryCustomizationDetails,
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
    console.log('here are my customizationIds', customizationIds);
    // BDService.getBridesmaidsIncompatabilities();
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

  handleCustomizationSelection(item) {
    // 3 things to occur
    const { setBDTemporaryCustomizationDetails } = this.props;
    const $$newTemporaryDetails = this.createNewTemporaryFilters(item.id);
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
                'BDCustomizationDetailsSelect--selected': $$temporaryCustomizationDetails.includes(item.id),
              })}
              alt={item.id}
              src="http://via.placeholder.com/142x142"
            />
            <div className="BDCustomizationDetailsSelect__description">{item.description}</div>
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
  addonOptions: PropTypes.arrayOf({
    id: PropTypes.string,
    description: PropTypes.string,
    position: PropTypes.number,
    price: PropTypes.object,
    centsTotal: PropTypes.number,
    img: PropTypes.string,
  }),
  $$temporaryCustomizationDetails: ImmutablePropTypes.list.isRequired,
  // Redux Funcs
  setBDTemporaryCustomizationDetails: PropTypes.func.isRequired,
};

BDCustomizationDetailsSelect.defaultProps = {
  addonOptions: [],
};

export default connect(stateToProps, dispatchToProps)(BDCustomizationDetailsSelect);
