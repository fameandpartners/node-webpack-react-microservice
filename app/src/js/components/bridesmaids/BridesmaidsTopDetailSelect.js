/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';


function stateToProps(state) {
  return {
    lineItemImages: [],
  };
}

class BridesmaidsTopDetailSelect extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  getFilterTopDetails() {
    const {
      filterTopDetails,
    } = this.props;

    return filterTopDetails
      .map((item, index) => (
        <div className="col-3" key={item.image + index}>
          <div className="brick u-cursor--pointer">
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
};

export default connect(stateToProps, null)(BridesmaidsTopDetailSelect);
