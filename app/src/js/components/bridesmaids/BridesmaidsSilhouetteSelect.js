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
              'brick u-cursor--pointer',
              {
                'DressFilterSilhouette--selected': item.id == selectedSilhouetteId
              }
            ])}
          >
            <img className="u-width--full" alt={item.name} src={item.image} />
            <p>{item.name}</p>
            <p>{item.description}</p>
          </div>
        </div>
      ));
  }


  render() {
    return (
      <div className="ProductGrid">
        <div className="App__photo-montage masonry grid-12">
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
