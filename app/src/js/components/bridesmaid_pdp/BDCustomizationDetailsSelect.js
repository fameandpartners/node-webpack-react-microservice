/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

// Actions
import BridesmaidsFilterActions from '../../actions/BridesmaidsFilterActions';

// CSS
import '../../../css/components/BDCustomizationDetailsSelect.scss';

function stateToProps({ $$customizationState }) {
  console.log('addonOptions', $$customizationState.get('addons'));
  const addonOptions = $$customizationState.get('addons').toJS().addonOptions;
  console.log('addonOptions', addonOptions);

  return {
    addonOptions,
  };
}

function dispatchToProps(dispatch) {
  const {
    selectFilterSilhouette,
  } = bindActionCreators(BridesmaidsFilterActions, dispatch);

  return {
    selectFilterSilhouette,
  };
}

class BDCustomizationDetailsSelect extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  handleCustomizationSelection(item) {
    console.log('clicking....', item);
  }

  getAddonDetailOptions() {
    const {
      addonOptions,
    } = this.props;

    return addonOptions
      .map(item => (
        <div className="u-display--inline-block u-mr--normal" key={item.id}>
          <div
            onClick={() => this.handleCustomizationSelection(item)}
            className={classnames([
              'BDCustomizationDetailsSelect__image-wrapper u-cursor--pointer',
              {
                'BDCustomizationDetailsSelect--selected': item.id === false,
              },
            ])}
          >
            <img className="u-width--full" alt={item.id} src="http://via.placeholder.com/142x142" />
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
};

BDCustomizationDetailsSelect.defaultProps = {
  addonOptions: [],
};

export default connect(stateToProps, dispatchToProps)(BDCustomizationDetailsSelect);
