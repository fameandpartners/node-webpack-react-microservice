import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

// Constants
import {
  FIT_ISSUES,
} from '../../constants/ProductConstants';

// Actions
import SizeProfileActions from '../../actions/SizeProfileActions';

// UI Components
import Select from '../form/Select';

// CSS
import '../../../css/components/StandardSizeForm.scss';

function stateToProps(state) {
  return {
    temporaryBustValue: state.$$sizeProfileState.get('temporaryBustValue'),
    temporaryWaistValue: state.$$sizeProfileState.get('temporaryWaistValue'),
    temporaryHipValue: state.$$sizeProfileState.get('temporaryHipValue'),
  };
}

function dispatchToProps(dispatch) {
  const {
    updateBustSelection,
    updateWaistSelection,
    updateHipSelection,
  } = bindActionCreators(SizeProfileActions, dispatch);

  return {
    updateBustSelection,
    updateWaistSelection,
    updateHipSelection,
  };
}

class CurrentDressFitForm extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  /**
   * Generates the fit issue options for the Select dropdown
   * @return {Object} options
   */
  generateFitIssueOptions(selected) {
    return FIT_ISSUES.map(i => ({
      id: i,
      name: i,
      meta: i,
      active: i === selected,
    }));
  }

  handleBustChange(value) {
    this.props.updateBustSelection({ temporaryBustValue: value.option.id });
  }

  handleWaistChange(value) {
    this.props.updateWaistSelection({ temporaryWaistValue: value.option.id });
  }

  handleHipChange(value) {
    this.props.updateHipSelection({ temporaryHipValue: value.option.id });
  }

  render() {
    const {
      containerClassNames,
      temporaryBustValue,
      temporaryWaistValue,
      temporaryHipValue,
    } = this.props;

    return (
      <div
        className={classnames(
          'CurrentDressFitForm__layout-container',
          containerClassNames,
        )}
      >
        <p className="h6 u-text-align-left u-mb-xs">
          How do fitted dresses in <strong>your size</strong> tend to fit?
        </p>
        <div className="CurrentDressFitForm__height u-mb-normal">
          <p
            className={classnames(
              'h6 u-mb-xs u-text-align--left',
              {
                'u-color-red': null,
              },
            )}
          >
            Your BUST?
          </p>
          <div className="grid-noGutter">
            <div className="col-10">
              <Select
                id="bust-fit-issue"
                className="sort-options"
                label="Select"
                options={this.generateFitIssueOptions(temporaryBustValue)}
                onChange={this.handleBustChange}
              />
            </div>
          </div>
        </div>

        <div className="CurrentDressFitForm__height u-mb-normal">
          <p
            className={classnames(
              'h6 u-mb-xs u-text-align--left',
              {
                'u-color-red': null,
              },
            )}
          >
            Your Waist?
          </p>
          <div className="grid-noGutter">
            <div className="col-10">
              <Select
                id="bust-fit-issue"
                className="sort-options"
                label="Select"
                options={this.generateFitIssueOptions(temporaryWaistValue)}
                onChange={this.handleWaistChange}
              />
            </div>
          </div>
        </div>

        <div className="CurrentDressFitForm__height u-mb-normal">
          <p
            className={classnames(
              'h6 u-mb-xs u-text-align--left',
              {
                'u-color-red': null,
              },
            )}
          >
            Your Hips?
          </p>
          <div className="grid-noGutter">
            <div className="col-10">
              <Select
                id="bust-fit-issue"
                className="sort-options"
                label="Select"
                options={this.generateFitIssueOptions(temporaryHipValue)}
                onChange={this.handleHipChange}
              />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

CurrentDressFitForm.propTypes = {
  // Passed Props
  containerClassNames: PropTypes.string,
  // Redux Props
  temporaryBustValue: PropTypes.string,
  temporaryWaistValue: PropTypes.string,
  temporaryHipValue: PropTypes.string,
  // Redux Actions
  updateBustSelection: PropTypes.func.isRequired,
  updateWaistSelection: PropTypes.func.isRequired,
  updateHipSelection: PropTypes.func.isRequired,
};

CurrentDressFitForm.defaultProps = {
  containerClassNames: 'u-mt-normal u-mb-huge',
  temporaryBustValue: null,
  temporaryWaistValue: null,
  temporaryHipValue: null,
};


export default connect(stateToProps, dispatchToProps)(CurrentDressFitForm);
