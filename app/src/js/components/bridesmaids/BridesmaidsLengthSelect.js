/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';
import classnames from 'classnames';

// CSS
import '../../../css/components/BridesmaidsLengthSelect.scss';

// Actions
import BridesmaidsFilterActions from '../../actions/BridesmaidsFilterActions';

function stateToProps({ $$bridesmaidsFilterState }) {
  return {
    temporaryLengthId: $$bridesmaidsFilterState.get('temporaryLength').get('id'),
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

class BridesmaidsLengthSelect extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  handleLengthClick(temporaryLength) {
    const {
      selectFilterLength,
    } = this.props;

    selectFilterLength({ temporaryLength });
  }

  getFilterLengths() {
    const {
      filterLengths,
      temporaryLengthId,
    } = this.props;

    return filterLengths
      .map((item, index) => (
        <div className="col-2" key={item.image + index}>
          <div
            onClick={() => this.handleLengthClick(item)}
            className={classnames(
              'brick u-cursor--pointer',
              {
                'DressFilterLength--selected': item.id == temporaryLengthId
              }
            )}
          >
            <img className="u-width--full" alt={item.name} src={item.image} />
            <p>{item.name}</p>
          </div>
        </div>
      ));
  }


  render() {
    return (
      <div className="ProductGrid">
        <div className="App__photo-montage masonry grid-12">
          {this.getFilterLengths()}
        </div>
      </div>
    );
  }
}

BridesmaidsLengthSelect.propTypes = {
  filterLengths: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
  selectFilterLength: PropTypes.func.isRequired,
};

export default connect(stateToProps, dispatchToProps)(BridesmaidsLengthSelect);
