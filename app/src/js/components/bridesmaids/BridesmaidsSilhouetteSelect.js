/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';
import classnames from 'classnames';

// Actions
import BridesmaidsFilterActions from '../../actions/BridesmaidsFilterActions';

// CSS
import '../../../css/components/BridesmaidsSilhouetteSelect.scss';

function stateToProps({ $$bridesmaidsFilterState }) {
  const selectedSilhouette = $$bridesmaidsFilterState.get('selectedSilhouette');
  const bridesmaidsFilterSilhouttes = $$bridesmaidsFilterState.get('$$bridesmaidsFilterSilhouettes').toJS();

  return {
    bridesmaidsFilterSilhouettes: bridesmaidsFilterSilhouttes || [],
    selectedSilhouetteId: selectedSilhouette ? selectedSilhouette.get('id') : null,
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
      bridesmaidsFilterSilhouettes,
      selectedSilhouetteId,
    } = this.props;

    return bridesmaidsFilterSilhouettes
      .map((item, index) => (
        <div className="col-4" key={item.image + index}>
          <div
            onClick={() => this.handleSilhouetteClick(item)}
            className={classnames([
              'BridesmaidsSilhoutteSelect--image-wrapper u-cursor--pointer u-center',
              {
                'DressFilterSilhouette--selected': item.id == selectedSilhouetteId
              }
            ])}
          >
            <img className="u-width--full u-height--full" alt={item.name} src={item.image} />
          </div>
          <p>{item.name}</p>
          <p>{item.description}</p>
        </div>
      ));
  }


  render() {
    return (
      <div className="BridesmaidsSilhoutteSelect">
        <div className="BridesmaidsSilhoutteSelect__contents grid-12 u-center">
          {this.getFilterSilhouettes()}
        </div>
      </div>
    );
  }
}

BridesmaidsSilhouetteSelect.propTypes = {
  bridesmaidsFilterSilhouettes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
  selectedSilhouetteId: PropTypes.number,
  selectFilterSilhouette: PropTypes.func.isRequired,
};

BridesmaidsSilhouetteSelect.defaultProps = {
  selectedSilhouetteId: null,
};

export default connect(stateToProps, dispatchToProps)(BridesmaidsSilhouetteSelect);
