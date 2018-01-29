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
import SubmitButton from '../../../js/components/generic/Button';


function stateToProps({ $$bridesmaidsFilterState }) {
  const selectedTopDetails = $$bridesmaidsFilterState.get('selectedTopDetails');
  const $$bridesmaidsFilterTopDetails = $$bridesmaidsFilterState.get('$$bridesmaidsFilterTopDetails');

  return {
    selectedTopDetails: selectedTopDetails ? selectedTopDetails.toJS() : null,
    bridesmaidsFilterTopDetails: $$bridesmaidsFilterTopDetails ? $$bridesmaidsFilterTopDetails.toJS() : [],
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
      selectedTopDetails,
    } = this.props;

    return selectedTopDetails.filter(item => item.id == id).length;
  }

  handleDetailClick(item) {
    const {
      selectedTopDetails,
      updateFilterTopDetails,
    } = this.props;

    let updatedTopDetails = [...selectedTopDetails];

    if ((selectedTopDetails.length > 2) && !this.hasDetailSelected(item.id)) {
      return console.log('ERR: Cannot select more than 3 TOP DETAILS!');
    }

    if (this.hasDetailSelected(item.id)) {
      let indexToRemove = findIndex(updatedTopDetails, { id: item.id });
      updatedTopDetails.splice(indexToRemove, 1);
      updateFilterTopDetails({ selectedTopDetails: updatedTopDetails });
    }

    if (!this.hasDetailSelected(item.id)) {
      updatedTopDetails.push(item);
      updateFilterTopDetails({ selectedTopDetails: updatedTopDetails });
    }
  }

   handleSubmitClick() {
    this.props.handleSelection();
  }

  getFilterTopDetails() {
    const {
      bridesmaidsFilterTopDetails,
    } = this.props;

    return bridesmaidsFilterTopDetails
      .map((item, index) => (
        <div
          className="col"
          className={classnames(
            "col",
            {"u-mb--big": (index === 0)}
          )}
          key={item.image + index}
        >
          <div
            onClick={() => this.handleDetailClick(item)}
            className={classnames(
              'DressFilterTopDetail',
              'brick u-cursor--pointer',
              {
                'DressFilterTopDetail--selected': this.hasDetailSelected(item.id)
              }
            )}
          >
            <img className="u-width--full" alt={item.name} src={`/images/bridesmaids_builder/top_${item.name.replace(' ','').toLowerCase()}_200.jpg`} />
          </div>
          <p className="u-mt--normal">{item.name}</p>
        </div>
      ));
  }

  componentDidMount() {
    console.log(this.props.selectedTopDetails);
  }

  render() {
    const { bridesmaidsFilterTopDetails, gridLength } = this.props;
    const grid = gridLength || bridesmaidsFilterTopDetails.length;

    return (
      <div className="BridesmaidsTopDetailSelect u-center">
        <div
          className={classnames(
            'BridesmaidsTopDetailSelect__content',
            `grid-${grid}`
          )}
        >
          {this.getFilterTopDetails()}

          {this.props.handleSelection ? (
            <SubmitButton
              className="float--right bottom-right-tiny"
              handleClick={this.handleSubmitClick}
              text={'Apply'}
            />
          ) : null
        }
        </div>
      </div>
    );
  }
}

BridesmaidsTopDetailSelect.propTypes = {
  bridesmaidsFilterTopDetails: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
  updateFilterTopDetails: PropTypes.func.isRequired,
  selectedTopDetails: PropTypes.array,
};

BridesmaidsTopDetailSelect.defaultProps = {
  selectedTopDetails: [],
};

export default connect(stateToProps, dispatchToProps)(BridesmaidsTopDetailSelect);
