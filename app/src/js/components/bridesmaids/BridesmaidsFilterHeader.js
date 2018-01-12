import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { find } from 'lodash';
import classnames from 'classnames';

// CSS
import '../../../css/components/BridesmaidsFilterHeader.scss';

// Components
import BridesmaidsTabs from './BridesmaidsTabs';
// import BridesmaidsColorSelect from '../../components/bridesmaids/BridesmaidsColorSelect';
// import BridesmaidsSilhouette from '../../components/bridesmaids/BridesmaidsSilhouette';
// import BridesmaidsLengthSelect from '../../components/bridesmaids/BridesmaidsLengthSelect';
// import BridesmaidsTopDetailSelect from '../../components/bridesmaids/BridesmaidsTopDetailSelect';

// Actions
import BridesmaidsFilterActions from '../../actions/BridesmaidsFilterActions';

// Constants
import BridesmaidsHeaderFilterConstants from '../../constants/BridesmaidsFilterHeaderConstants';

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

    return (
      <div
        className={classnames(
          'BridesmaidsFilterHeader__wrapper grid-12',
          {
            [`BridesmaidsFilterHeader__wrapperColor--${this.formatSelectedColor()}`]: true,
          },
        )}
      >
        <BridesmaidsTabs
          filters={[
            {
              id: BridesmaidsHeaderFilterConstants.SELECTED_COLOR,
              heading: `Color: ${selectedColor}`,
              content: (
                <h1>SELECTED COLOR FILTER HERE</h1>
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
          headingClasses="SizeGuideTabs__heading"
          contentClasses="SizeGuideTabs__content layout-container"
        />
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
