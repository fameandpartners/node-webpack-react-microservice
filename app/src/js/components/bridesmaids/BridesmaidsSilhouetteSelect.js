/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';
import classnames from 'classnames';

// CSS
import '../../../css/components/BridesmaidsSilhouetteSelect.scss';

function stateToProps({ $$bridesmaidsFilterState }) {
  return {
    temporarySilhouetteId: $$bridesmaidsFilterState.get('temporarySilhouette').get('id'),
  };
}

class BridesmaidsSilhouetteSelect extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  getFilterSilhouettes() {
    const {
      filterSilhouettes,
      temporarySilhouetteId,
    } = this.props;

    return filterSilhouettes
      .map((item, index) => (
        <div className="col-4" key={item.image + index}>
          <div className={classnames([
              'brick u-cursor--pointer',
              {
                'Silhouette--selected': temporarySilhouetteId == item.id
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
};

BridesmaidsSilhouetteSelect.defaultProps = {
  temporarySilhouetteId: '',
};

export default connect(stateToProps, null)(BridesmaidsSilhouetteSelect);
