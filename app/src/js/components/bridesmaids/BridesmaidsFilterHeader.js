import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { find } from 'lodash';
import classnames from 'classnames';
import ReactHoverObserver from 'react-hover-observer';

// CSS
import '../../../css/components/BridesmaidsFilterHeader.scss';

// Components
import BridesmaidsTabs from './BridesmaidsTabs';
import BridesmaidsColorSelect from '../../components/bridesmaids/BridesmaidsColorSelect';
// import BridesmaidsSilhouette from '../../components/bridesmaids/BridesmaidsSilhouette';
// import BridesmaidsLengthSelect from '../../components/bridesmaids/BridesmaidsLengthSelect';
// import BridesmaidsTopDetailSelect from '../../components/bridesmaids/BridesmaidsTopDetailSelect';


// Utilities
import { isExtremeLightLuminance } from '../../utilities/color';

// Actions
import BridesmaidsFilterActions from '../../actions/BridesmaidsFilterActions';

// Constants
import BridesmaidsHeaderFilterConstants from '../../constants/BridesmaidsFilterHeaderConstants';

function stateToProps({ $$bridesmaidsFilterState }) {
  const selectedTopDetails = $$bridesmaidsFilterState.get('selectedTopDetails');
  const $$selectedColor = $$bridesmaidsFilterState.get('selectedColor');

  return {
    selectedColor: $$selectedColor ? $$selectedColor.toJS() : { presentation: '' },
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
    const { selectedColor } = this.props;

    if (selectedColor) {
      return selectedColor.presentation.split(' ').join('-');
    }

    return '';
  }

  generateTopStyleText() {
    const { selectedTopDetails } = this.props;
    if (selectedTopDetails.length < 2) {
      return `Top Style: ${selectedTopDetails}`;
    }

    return `Top Style: ${selectedTopDetails.length} Filters`;
  }

  render() {
    const {
      selectedColor,
      selectedSilhouette,
      selectedLength,
    } = this.props;
    console.log('--->');

    return (
      <div
        className={classnames(
          'BridesmaidsFilterHeader__wrapper',
          { 'BridesmaidsFilterHeader__wrapper--light': isExtremeLightLuminance({ hexValue: selectedColor.hexValue }) },

        )}
        style={{
          backgroundColor: selectedColor.hexValue,
        }}
      >
        <ReactHoverObserver hoverOffDelayInMs={1000000}>
          <BridesmaidsTabs
            filters={[
              {
                id: BridesmaidsHeaderFilterConstants.SELECTED_COLOR,
                heading: `Color: ${selectedColor.presentation}`,
                content: (
                  <BridesmaidsColorSelect />
                ),
              },
              {
                id: BridesmaidsHeaderFilterConstants.SELECTED_SILHOUETTE,
                heading: `Silhouette: ${selectedSilhouette}`,
                content: (
                  <h1>SELECTED SILHOUETTE FILTER HERE</h1>
                ),
              },
              {
                id: BridesmaidsHeaderFilterConstants.SELECTED_LENGTH,
                heading: `Length: ${selectedLength}`,
                content: (
                  <h1>SELECTED LENGTH FILTER HERE</h1>
                ),
              },
              {
                id: BridesmaidsHeaderFilterConstants.SELECTED_TOP_DETAILS,
                heading: this.generateTopStyleText(),
                content: (
                  <h1>SELECTED LENGTH FILTER HERE</h1>
                ),
              },
            ]}
            headingClasses="Bridesmaids_SizeGuideTabs__heading u-position--relative"
            contentClasses="Bridesmaids_SizeGuideTabs__content layout-container"
          />
        </ReactHoverObserver>
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
