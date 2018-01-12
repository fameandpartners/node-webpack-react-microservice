import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { find } from 'lodash';
import classnames from 'classnames';

// CSS
import '../../../css/components/BridesmaidsFilterHeader.scss';

// Actions
import BridesmaidsFilterActions from '../../actions/BridesmaidsFilterActions';

function stateToProps({ $$bridesmaidsFilterState }) {
  const selectedTopDetails = $$bridesmaidsFilterState.get('selectedTopDetails');

  return {
    selectedColor: $$bridesmaidsFilterState.get('selectedColor'),
    selectedSilhouette: $$bridesmaidsFilterState.get('selectedSilhouette'),
    selectedLength: $$bridesmaidsFilterState.get('selectedLength'),
    selectedTopDetails: selectedTopDetails ? selectedTopDetails.toJS() : [],
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

class BridesmaidsFilterHeader extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  formatSelectedColor() {
    const {
      selectedColor,
    } = this.props;

    if (selectedColor) {
      return selectedColor.split(' ').join('-');
    }

    return '';
  }

  render() {
    const {
      selectedColor,
      selectedSilhouette,
      selectedLength,
      selectedTopDetails,
    } = this.props;

    // eslint-disable-next-line
    console.log(selectedTopDetails);

    return (
      <div
        className={classnames(
          'BridesmaidsFilterHeader__wrapper grid-12',
          {
            [`BridesmaidsFilterHeader__wrapperColor--${this.formatSelectedColor()}`]: true,
          },
        )}
      >
        <div className="col-3_sm-6">
          <a
            className="u-cursor--pointer"
            onClick={() => console.log('SHOW COLOR FILTER DRAWER')}
          >
            Color: {selectedColor}
          </a>
        </div>
        <div className="col-3_sm-6">
          <a
            className="u-cursor--pointer"
            onClick={() => console.log('SHOW SILHOUETTE FILTER DRAWER')}
          >
            Silhouette: {selectedSilhouette}
          </a>
        </div>
        <div className="col-3_sm-6">
          <a
            className="u-cursor--pointer"
            onClick={() => console.log('SHOW LENGTH FILTER DRAWER')}
          >
            Length: {selectedLength}
          </a>
        </div>
        <div className="col-3_sm-6">
          <a
            className="u-cursor--pointer"
            onClick={() => console.log('SHOW TOP DETAILS FILTER DRAWER')}
          >
            Top Style: {selectedTopDetails.length} Filters
          </a>
        </div>
      </div>
    );
  }
}

BridesmaidsFilterHeader.propTypes = {
  selectedColor: PropTypes.string,
  selectedSilhouette: PropTypes.string,
  selectedLength: PropTypes.string,
  selectedTopDetails: PropTypes.arrayOf(PropTypes.string).isRequired,
};

BridesmaidsFilterHeader.defaultProps = {
  selectedColor: '',
  selectedSilhouette: '',
  selectedLength: '',
};

export default connect(stateToProps, dispatchToProps)(BridesmaidsFilterHeader);
