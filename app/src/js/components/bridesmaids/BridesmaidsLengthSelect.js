/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';
import classnames from 'classnames';

// CSS
import '../../../css/components/BridesmaidsLengthSelect.scss';

// Actions
import BridesmaidsFilterActions from '../../actions/BridesmaidsFilterActions';

function stateToProps({ $$bridesmaidsFilterState }) {
  const selectedLength = $$bridesmaidsFilterState.get('selectedLength');
  const $$bridesmaidsFilterLengths = $$bridesmaidsFilterState.get('$$bridesmaidsFilterLengths');
  const selectedSilhouette = $$bridesmaidsFilterState.get('selectedSilhouette');
  return {
    selectedLengthId: selectedLength ? selectedLength.get('id') : null,
    bridesmaidsFilterLengths: $$bridesmaidsFilterLengths ? $$bridesmaidsFilterLengths.toJS() : [],
    selectedSilhouetteNameLowerCase: selectedSilhouette ? selectedSilhouette.get('name').toLowerCase().replace('-','').split(' ')[0] : 'column',
  };
}

function dispatchToProps(dispatch) {
  const {
    selectFilterLength,
  } = bindActionCreators(BridesmaidsFilterActions, dispatch);

  return {
    selectFilterLength,
  };
}

class BridesmaidsLengthSelect extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  handleLengthClick(selectedLength) {
    const {
      selectFilterLength,
    } = this.props;

    selectFilterLength({ selectedLength });
    this.props.handleSelection();
  }

  getFilterLengths() {
    const {
      bridesmaidsFilterLengths,
      selectedLengthId,
      selectedSilhouetteNameLowerCase,
    } = this.props;

    return bridesmaidsFilterLengths
      .map((item, index) => (
        <div className="col-2_sm-4_md-2" key={item.image + index}>
          <div
            onClick={() => this.handleLengthClick(item)}
            className={classnames(
              'BridesmaidsLengthSelect--image-wrapper u-center u-cursor--pointer',
              {
                'DressFilterLength--selected': item.id == selectedLengthId
              }
            )}
          >
            <img className="u-width--full" alt={item.name} src={`/images/bridesmaids_builder/length_${selectedSilhouetteNameLowerCase}_${item.name.toLowerCase().split('-')[0]}_148.jpg`}  />
          </div>
          <p>{item.name}</p>
        </div>
      ));
  }


  render() {
    return (
      <div className="BridesmaidsLengthSelect">
        <div className="BridesmaidsLengthSelect__contents grid-12 u-center">
          {this.getFilterLengths()}
        </div>
      </div>
    );
  }
}

BridesmaidsLengthSelect.propTypes = {
  bridesmaidsFilterLengths: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
  selectFilterLength: PropTypes.func.isRequired,
};

export default connect(stateToProps, dispatchToProps)(BridesmaidsLengthSelect);