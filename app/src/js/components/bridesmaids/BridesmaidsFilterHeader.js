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
import BridesmaidsSilhouetteSelect from '../../components/bridesmaids/BridesmaidsSilhouetteSelect';
import BridesmaidsLengthSelect from '../../components/bridesmaids/BridesmaidsLengthSelect';
import BridesmaidsTopDetailSelect from '../../components/bridesmaids/BridesmaidsTopDetailSelect';


// Utilities
import { isExtremeLightLuminance } from '../../utilities/color';

// Actions
import BridesmaidsFilterActions from '../../actions/BridesmaidsFilterActions';

// Constants
import BridesmaidsHeaderFilterConstants from '../../constants/BridesmaidsFilterHeaderConstants';

function stateToProps({ $$bridesmaidsFilterState }) {
  const $$selectedTopDetails = $$bridesmaidsFilterState.get('selectedTopDetails');
  const $$selectedColor = $$bridesmaidsFilterState.get('selectedColor');
  const $$selectedSilhouette = $$bridesmaidsFilterState.get('selectedSilhouette');
  const $$selectedLength = $$bridesmaidsFilterState.get('selectedLength');

  return {
    selectedColor: $$selectedColor ? $$selectedColor.toJS() : { presentation: '' },
    selectedSilhouette: $$selectedSilhouette ? $$selectedSilhouette.toJS() : { name: '' },
    selectedLength: $$selectedLength ? $$selectedLength.toJS() : { name: '' },
    selectedTopDetails: $$selectedTopDetails ? $$selectedTopDetails.toJS() : [],
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

  handleColorSelection() {
    console.log('Doin the magic');
  }

  handleLengthSelection() {
    console.log('Doin the magic');
  }

  handleSilhouetteSelection() {
    console.log('Doin the magic');
  }

  generateTopStyleText() {
    const { selectedTopDetails } = this.props;
    if (selectedTopDetails.length === 1) {
      return `Top Style: ${selectedTopDetails.name}`;
    }

    return `Top Style: ${selectedTopDetails.length} Filters`;
  }

  render() {
    const {
      selectedColor,
      selectedSilhouette,
      selectedLength,
    } = this.props;
    const isLight = isExtremeLightLuminance({ hexValue: selectedColor.hexValue });

    return (
      <div
        className={classnames(
          'BridesmaidsFilterHeader__wrapper',
          { 'BridesmaidsFilterHeader__wrapper--light': isLight },

        )}
        style={{
          backgroundColor: selectedColor.hexValue,
        }}
      >
        <ReactHoverObserver hoverOffDelayInMs={100}>
          <BridesmaidsTabs
            filters={[
              {
                id: BridesmaidsHeaderFilterConstants.SELECTED_COLOR,
                heading: `Color: ${selectedColor.presentation}`,
                content: (
                  <BridesmaidsColorSelect
                    handleSelection={this.handleColorSelection}
                  />
                ),
              },
              {
                id: BridesmaidsHeaderFilterConstants.SELECTED_SILHOUETTE,
                heading: `Silhouette: ${selectedSilhouette.name}`,
                content: (
                  <BridesmaidsSilhouetteSelect
                    handleSelection={this.handleSilhouetteSelection}
                  />
                ),
              },
              {
                id: BridesmaidsHeaderFilterConstants.SELECTED_LENGTH,
                heading: `Length: ${selectedLength.name}`,
                content: (
                  <BridesmaidsLengthSelect
                    handleSelection={this.handleLengthSelection}
                  />
                ),
              },
              {
                id: BridesmaidsHeaderFilterConstants.SELECTED_TOP_DETAILS,
                heading: this.generateTopStyleText(),
                content: (
                  <BridesmaidsTopDetailSelect />
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
