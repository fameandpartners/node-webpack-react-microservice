/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

// Actions
import * as BDActions from '../../actions/BDActions';

// CSS
import '../../../css/components/BDCustomizationDetailsSelect.scss';

function stateToProps({ $$bdCustomizationState, $$customizationState }) {
  const addonOptions = $$customizationState.get('addons').toJS().addonOptions;
  const $$temporaryCustomizationDetails = $$bdCustomizationState.get('temporaryCustomizationDetails').toJS();

  return {
    addonOptions,
    $$temporaryCustomizationDetails,
  };
}

function dispatchToProps(dispatch) {
  const { selectBDCustomizationDetail } = bindActionCreators(BDActions, dispatch);

  return {
    selectBDCustomizationDetail,
  };
}

class BDCustomizationDetailsSelect extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  handleCustomizationSelection(item) {
    // 3 things to occur
    const { selectBDCustomizationDetail } = this.props;
    selectBDCustomizationDetail({ detailGuid: item.id });
    // 2: TODO:NEXT Send a request to get incompatibilities
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
  selectBDCustomizationDetail: PropTypes.func.isRequired,
};

BDCustomizationDetailsSelect.defaultProps = {
  addonOptions: [],
};

export default connect(stateToProps, dispatchToProps)(BDCustomizationDetailsSelect);
