/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findIndex } from 'lodash';
import classnames from 'classnames';

// Actions
import BridesmaidsFilterActions from '../../actions/BridesmaidsFilterActions';

// CSS
import '../../../css/components/BridesmaidsTopDetailSelect.scss';

function stateToProps({ $$bridesmaidsFilterState }) {
  return {
    temporaryTopDetails: $$bridesmaidsFilterState.get('temporaryTopDetails').toJS(),
  };
}

function dispatchToProps(dispatch) {
  const {
    updateFilterTopDetails,
  } = bindActionCreators(BridesmaidsFilterActions, dispatch);

  return {
    updateFilterTopDetails,
  };
}

class BridesmaidsTopDetailSelect extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  hasDetailSelected(id) {
    const {
      temporaryTopDetails,
    } = this.props;

    return temporaryTopDetails.filter(item => item.id == id).length;
  }

  handleDetailClick(item) {
    const {
      temporaryTopDetails,
      updateFilterTopDetails,
    } = this.props;

    let updatedTopDetails = [...temporaryTopDetails];

    if ((temporaryTopDetails.length > 2) && !this.hasDetailSelected(item.id)) {
      return console.log('ERR: Cannot select more than 3 TOP DETAILS!');
    }

    if (this.hasDetailSelected(item.id)) {
      let indexToRemove = findIndex(updatedTopDetails, { id: item.id });
      updatedTopDetails.splice(indexToRemove, 1);
      updateFilterTopDetails({ temporaryTopDetails: updatedTopDetails });
    }

    if (!this.hasDetailSelected(item.id)) {
      updatedTopDetails.push(item);
      updateFilterTopDetails({ temporaryTopDetails: updatedTopDetails });
    }
  }

  getFilterTopDetails() {
    const {
      filterTopDetails,
    } = this.props;

    return filterTopDetails
      .map((item, index) => (
        <div className="col-3" key={item.image + index}>
          <div
            onClick={() => this.handleDetailClick(item)}
            className={classnames(
              'brick u-cursor--pointer',
              {
                'DressFilterTopDetail--selected': this.hasDetailSelected(item.id)
              }
            )}
          >
            <img className="u-width--full" alt={item.name} src={item.image} />
            <p>{item.name}</p>
          </div>
        </div>
      ));
  }

  componentDidMount() {
    console.log(this.props.temporaryTopDetails);
  }

  render() {
    return (
      <div className="ProductGrid">
        <div className="App__photo-montage masonry grid-12">
          {this.getFilterTopDetails()}
        </div>
      </div>
    );
  }
}

BridesmaidsTopDetailSelect.propTypes = {
  filterTopDetails: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
  updateFilterTopDetails: PropTypes.func.isRequired,
};

export default connect(stateToProps, dispatchToProps)(BridesmaidsTopDetailSelect);
