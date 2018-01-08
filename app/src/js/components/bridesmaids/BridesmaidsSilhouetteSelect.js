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
  return {
    temporarySilhouetteId: $$bridesmaidsFilterState.get('temporarySilhouette').get('id'),
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

  handleSilhouetteClick(temporarySilhouette) {
    const {
      selectFilterSilhouette,
    } = this.props;

    selectFilterSilhouette({ temporarySilhouette });
  }

  getFilterSilhouettes() {
    const {
      filterSilhouettes,
      temporarySilhouetteId,
    } = this.props;

    return filterSilhouettes
      .map((item, index) => (
        <div className="col-4" key={item.image + index}>
          <div
            onClick={() => this.handleSilhouetteClick(item)}
            className={classnames([
              'brick u-cursor--pointer',
              {
                'DressFilterSilhouette--selected': item.id == temporarySilhouetteId
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
  filterSilhouettes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
  temporarySilhouetteId: PropTypes.number,
  selectFilterSilhouette: PropTypes.func.isRequired,
};

BridesmaidsSilhouetteSelect.defaultProps = {
  temporarySilhouetteId: '',
};

export default connect(stateToProps, dispatchToProps)(BridesmaidsSilhouetteSelect);
