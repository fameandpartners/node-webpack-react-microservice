/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findIndex } from 'lodash';
import classnames from 'classnames';

// Actions
import BridesmaidsFilterActions from '../../../actions/BridesmaidsFilterActions';

// CSS
import '../../../../css/components/BridesmaidsTopDetailSelect.scss';


function stateToProps({ $$bridesmaidsFilterState }) {
  const temporaryTopDetails = $$bridesmaidsFilterState.get('temporaryTopDetails');
  const $$bridesmaidsFilterTopDetails = $$bridesmaidsFilterState.get('$$bridesmaidsFilterTopDetails');

  return {
    temporaryTopDetails: temporaryTopDetails ? temporaryTopDetails.toJS() : null,
    bridesmaidsFilterTopDetails: $$bridesmaidsFilterTopDetails
      ? $$bridesmaidsFilterTopDetails.toJS()
      : [],
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

class BridesmaidsModalTopDetailSelect extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  hasDetailSelected(id) {
    const {
      temporaryTopDetails,
    } = this.props;

    return temporaryTopDetails.filter(item => item.id === id).length;
  }

  handleDetailClick(item) {
    const {
      temporaryTopDetails,
      updateFilterTopDetails,
    } = this.props;

    const updatedTopDetails = [...temporaryTopDetails];

    if ((temporaryTopDetails.length > 2) && !this.hasDetailSelected(item.id)) {
      return console.log('ERR: Cannot select more than 3 TOP DETAILS!');
    }

    if (this.hasDetailSelected(item.id)) {
      const indexToRemove = findIndex(updatedTopDetails, { id: item.id });
      updatedTopDetails.splice(indexToRemove, 1);
      updateFilterTopDetails({ temporaryTopDetails: updatedTopDetails });
    }

    if (!this.hasDetailSelected(item.id)) {
      updatedTopDetails.push(item);
      updateFilterTopDetails({ temporaryTopDetails: updatedTopDetails });
    }

    return null;
  }

  generateTopDetailImage(item) {
    return `/images/bridesmaids_builder/top_${item.name.replace(' ', '').toLowerCase()}_200.jpg`;
  }

  getFilterTopDetails() {
    const {
      bridesmaidsFilterTopDetails,
    } = this.props;


    return bridesmaidsFilterTopDetails
      .map((item, index) => (
        <div className="col-6_sm-6_md-4" key={item.image + index}>
          <div
            onClick={() => this.handleDetailClick(item)}
            className={classnames(
              'DressFilterTopDetail',
              'brick u-cursor--pointer',
              {
                'DressFilterTopDetail--selected': this.hasDetailSelected(item.id),
              },
            )}
          >
            <img className="u-width--full" alt={item.name} src={this.generateTopDetailImage(item)} />
          </div>
          <p className="u-mt--normal">{item.name}</p>
        </div>
      ));
  }

  render() {
    const { bridesmaidsFilterTopDetails } = this.props;
    const gridLength = bridesmaidsFilterTopDetails.length;

    return (
      <div className="BridesmaidsModalTopDetailSelect">
        <div
          className={classnames(
            'BridesmaidsTopDetailSelect__content u-center grid-12-center',
            `grid-${gridLength}`,
          )}
        >
          {this.getFilterTopDetails()}
        </div>
      </div>
    );
  }
}

BridesmaidsModalTopDetailSelect.propTypes = {
  bridesmaidsFilterTopDetails: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
  temporaryTopDetails: PropTypes.array,
  // Redux Funcs
  updateFilterTopDetails: PropTypes.func.isRequired,
};

BridesmaidsModalTopDetailSelect.defaultProps = {
  temporaryTopDetails: [],
};

export default connect(stateToProps, dispatchToProps)(BridesmaidsModalTopDetailSelect);
