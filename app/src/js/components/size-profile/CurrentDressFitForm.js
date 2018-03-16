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
import '../../../css/components/CurrentDressSizeForm.scss';

function stateToProps(state) {
  return {
    temporaryBustValue: state.$$sizeProfileState.get('temporaryBustValue'),
    temporaryWaistValue: state.$$sizeProfileState.get('temporaryWaistValue'),
    temporaryHipValue: state.$$sizeProfileState.get('temporaryHipValue'),
    bustFitError: state.$$sizeProfileState.get('bustFitError'),
    waistFitError: state.$$sizeProfileState.get('waistFitError'),
    hipsFitError: state.$$sizeProfileState.get('hipsFitError'),
  };
}

function dispatchToProps(dispatch) {
  const {
    updateBustSelection,
    updateWaistSelection,
    updateHipSelection,
    setDressFitError,
  } = bindActionCreators(SizeProfileActions, dispatch);

  return {
    updateBustSelection,
    updateWaistSelection,
    updateHipSelection,
    setDressFitError,
  };
}

class CurrentDressFitForm extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.validationHandler(this);
  }

  componentWillUnmount() {
    this.props.validationHandler(undefined);
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
    this.props.setDressFitError({
      bustFitError: false,
      waistFitError: this.props.waistFitError,
      hipsFitError: this.props.hipsFitError,
    });
  }

  handleWaistChange(value) {
    this.props.updateWaistSelection({ temporaryWaistValue: value.option.id });
    this.props.setDressFitError({
      bustFitError: this.props.bustFitError,
      waistFitError: false,
      hipsFitError: this.props.hipsFitError,
    });
  }

  handleHipChange(value) {
    this.props.updateHipSelection({ temporaryHipValue: value.option.id });
    this.props.setDressFitError({
      bustFitError: this.props.bustFitError,
      waistFitError: this.props.waistFitError,
      hipsFitError: false,
    });
  }

  isValid() {
    const {
      temporaryBustValue,
      temporaryWaistValue,
      temporaryHipValue,
      setDressFitError,
    } = this.props;
    const errors = { bustFitError: false, waistFitError: false, hipsFitError: false };
    let isValid = true;

    if (!temporaryBustValue) {
      isValid = false;
      errors.bustFitError = true;
    }

    if (!temporaryWaistValue) {
      isValid = false;
      errors.waistFitError = true;
    }

    if (!temporaryHipValue) {
      isValid = false;
      errors.hipsFitError = true;
    }
    setDressFitError(errors);
    return isValid;
  }

  render() {
    const {
      containerClassNames,
      temporaryBustValue,
      temporaryWaistValue,
      temporaryHipValue,
      bustFitError,
      waistFitError,
      hipsFitError,
      editSectionId,
    } = this.props;

    return (
      <div
        className={classnames(
          'CurrentDressFitForm__layout-container',
          containerClassNames,
        )}
      >
        <h4 className="u-text-align--left u-mb--normal">
          How do fitted dresses in <br />
          <span className="title__emphasize">your size</span> tend to fit?
        </h4>
        <div
          className={classnames(
            'CurrentDressFitForm__height u-mb--normal',
            {
              'u-display-none': editSectionId && editSectionId !== 'bust',
            },
          )}
        >
          <h4
            className={classnames(
              'u-mb-xs u-text-align--left',
              {
                'u-color-red': bustFitError,
                'u-display-none': editSectionId && editSectionId === 'bust',
              },
            )}
          >
            Your <span className="title__emphasize">Bust</span>
          </h4>
          <div className="grid-noGutter">
            <div className="col-10">
              <Select
                id="bust-fit-issue"
                className="sort-options"
                label="Select"
                error={bustFitError}
                inlineMeta={bustFitError ? 'Please select your bust fit' : null}
                options={this.generateFitIssueOptions(temporaryBustValue)}
                onChange={this.handleBustChange}
              />
            </div>
          </div>
        </div>

        <div
          className={classnames(
            'CurrentDressFitForm__height u-mb--normal',
            {
              'u-display-none': editSectionId && editSectionId !== 'waist',
            },
          )}
        >
          <h4
            className={classnames(
              'u-mb-xs u-text-align--left',
              {
                'u-color-red': waistFitError,
                'u-display-none': editSectionId && editSectionId === 'waist',
              },
            )}
          >
            Your <span className="title__emphasize">Waist</span>
          </h4>
          <div className="grid-noGutter">
            <div className="col-10">
              <Select
                id="bust-fit-issue"
                className="sort-options"
                label="Select"
                error={waistFitError}
                inlineMeta={waistFitError ? 'Please select your waist fit' : null}
                options={this.generateFitIssueOptions(temporaryWaistValue)}
                onChange={this.handleWaistChange}
              />
            </div>
          </div>
        </div>

        <div
          className={classnames(
            'CurrentDressFitForm__height u-mb--normal',
            {
              'u-display-none': editSectionId && editSectionId !== 'hip',
            },
          )}
        >
          <h4
            className={classnames(
              'u-mb-xs u-text-align--left',
              {
                'u-color-red': hipsFitError,
                'u-display-none': editSectionId && editSectionId === 'hip',
              },
            )}
          >
            Your <span className="title__emphasize">Hips</span>
          </h4>
          <div className="grid-noGutter">
            <div className="col-10">
              <Select
                id="bust-fit-issue"
                className="sort-options"
                label="Select"
                error={hipsFitError}
                inlineMeta={hipsFitError ? 'Please select your hips fit' : null}
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
  validationHandler: PropTypes.func.isRequired,
  editSectionId: PropTypes.string,
  // Redux Props
  temporaryBustValue: PropTypes.string,
  temporaryWaistValue: PropTypes.string,
  temporaryHipValue: PropTypes.string,
  bustFitError: PropTypes.bool,
  waistFitError: PropTypes.bool,
  hipsFitError: PropTypes.bool,
  // Redux Actions
  updateBustSelection: PropTypes.func.isRequired,
  updateWaistSelection: PropTypes.func.isRequired,
  updateHipSelection: PropTypes.func.isRequired,
  setDressFitError: PropTypes.func.isRequired,
};

CurrentDressFitForm.defaultProps = {
  containerClassNames: 'u-mt--normal u-mb--huge',
  editSectionId: null,
  temporaryBustValue: null,
  temporaryWaistValue: null,
  temporaryHipValue: null,
  bustFitError: false,
  waistFitError: false,
  hipsFitError: false,
};

export default connect(stateToProps, dispatchToProps)(CurrentDressFitForm);
