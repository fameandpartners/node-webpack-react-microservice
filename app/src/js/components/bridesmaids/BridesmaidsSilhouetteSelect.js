import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

// Actions
import BridesmaidsFilterActions from '../../actions/BridesmaidsFilterActions';

// CSS
import '../../../css/components/BridesmaidsSilhouetteSelect.scss';

function stateToProps({ $$bridesmaidsFilterState }) {
  const selectedSilhouette = $$bridesmaidsFilterState.get('selectedSilhouette');
  const bridesmaidsFilterSilhouettes = $$bridesmaidsFilterState.get('$$bridesmaidsFilterSilhouettes').toJS();
  const selectedLength = $$bridesmaidsFilterState.get('selectedLength');
  return {
    bridesmaidsFilterSilhouettes: bridesmaidsFilterSilhouettes || [],
    selectedSilhouetteId: selectedSilhouette ? selectedSilhouette.get('id') : null,
    selectedLengthLowerCase: (selectedLength && selectedLength.size > 0)
      ? selectedLength.get('name').toLowerCase().split('-')[0]
      : 'maxi',
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

class BridesmaidsSilhouetteSelect extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  handleSilhouetteClick(selectedSilhouette) {
    const {
      selectFilterSilhouette,
    } = this.props;

    selectFilterSilhouette({ selectedSilhouette });
    this.props.handleSelection();
  }

  getFilterSilhouettes() {
    const {
      breakpoint,
      bridesmaidsFilterSilhouettes,
      needsMinHeight,
      selectedSilhouetteId,
      selectedLengthLowerCase,
    } = this.props;
    return bridesmaidsFilterSilhouettes
      .map((item, index) => (

        <div className="col-4" key={item.image + index}>
          <div
            onClick={() => this.handleSilhouetteClick(item)}
            className={classnames([
              'BridesmaidsSilhouetteSelect--image-wrapper u-cursor--pointer u-center',
              {
                'BridesmaidsSilhouetteSelect--min-height-img': needsMinHeight,
                'BridesmaidsSilhouetteSelect--selected': item.id === selectedSilhouetteId,
              },
            ])}
          >
            <img
              className="u-width--full u-height--full"
              alt={item.name}
              src={`/images/bridesmaids_builder/length_${item.name.toLowerCase().replace('-', '').split(' ')[0]}_${selectedLengthLowerCase}_148.jpg`}
            />
          </div>
          <p>{item.name}</p>
          {
            breakpoint === 'mobile' ? null : (
              <p className="u-mt--xs">{item.description}</p>
            )
          }

        </div>
      ));
  }


  render() {
    return (
      <div className="BridesmaidsSilhouetteSelect">
        <div className="BridesmaidsSilhouetteSelect__contents grid-12 u-center">
          {this.getFilterSilhouettes()}
        </div>
      </div>
    );
  }
}

BridesmaidsSilhouetteSelect.propTypes = {
  // Passed Props
  breakpoint: PropTypes.string,
  needsMinHeight: PropTypes.bool,
  // Redux Props
  bridesmaidsFilterSilhouettes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
  selectedSilhouetteId: PropTypes.number,
  selectedLengthLowerCase: PropTypes.string.isRequired,
  // Funcs
  handleSelection: PropTypes.func.isRequired,
  selectFilterSilhouette: PropTypes.func.isRequired,
};

BridesmaidsSilhouetteSelect.defaultProps = {
  breakpoint: null,
  needsMinHeight: false,
  selectedSilhouetteId: null,
};

export default connect(stateToProps, dispatchToProps)(BridesmaidsSilhouetteSelect);
