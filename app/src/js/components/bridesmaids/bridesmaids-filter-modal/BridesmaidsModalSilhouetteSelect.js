/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';
import classnames from 'classnames';

// Actions
import BridesmaidsFilterActions from '../../../actions/BridesmaidsFilterActions';

// CSS
import '../../../../css/components/BridesmaidsSilhouetteSelect.scss';

function stateToProps({ $$bridesmaidsFilterState }) {
  const temporarySilhouette = $$bridesmaidsFilterState.get('temporarySilhouette');
  const bridesmaidsFilterSilhouttes = $$bridesmaidsFilterState.get('$$bridesmaidsFilterSilhouettes').toJS();

  return {
    bridesmaidsFilterSilhouettes: bridesmaidsFilterSilhouttes || [],
    temporarySilhouetteId: temporarySilhouette ? temporarySilhouette.get('id') : null,
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
      bridesmaidsFilterSilhouettes,
      temporarySilhouetteId,
    } = this.props;

    return bridesmaidsFilterSilhouettes
      .map((item, index) => (
        <div className="grid-12 col" key={item.image + index}>
          <div
            className="col-5"
            onClick={() => this.handleSilhouetteClick(item)}
            className={classnames([
              'BridesmaidsSilhouetteSelect--image-wrapper u-cursor--pointer u-center',
              {
                'BridesmaidsSilhouetteSelect--selected': item.id == temporarySilhouetteId
              }
            ])}
          >
            <img className="u-width--full u-height--full" alt={item.name} src={item.image} />
          </div>
          <div className="col-7">
            <h4 className="h4">{item.name}</h4>
            <p>{item.description}</p>
          </div>
        </div>
      ));
  }


  render() {
    return (
      <div className="BridesmaidsModalSilhouetteSelect">
        <div className="BridesmaidsModalSilhouetteSelect__contents typography">
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
  temporarySilhouetteId: PropTypes.number,
  // selectFilterSilhouette: PropTypes.func.isRequired,
};

BridesmaidsSilhouetteSelect.defaultProps = {
  temporarySilhouetteId: null,
};

export default connect(stateToProps, dispatchToProps)(BridesmaidsSilhouetteSelect);
