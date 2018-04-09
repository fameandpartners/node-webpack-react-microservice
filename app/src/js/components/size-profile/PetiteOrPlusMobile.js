import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

// Actions
import WizardActions from '../../actions/WizardActions';
import SizeProfileActions from '../../actions/SizeProfileActions';

// Constants
import WizardConstants from '../../constants/WizardConstants';

// Components
import Button from '../generic/Button';
import WizardStep from '../wizard/WizardStep';

function stateToProps(state) {
  return {
    temporaryWeightValue: state.$$sizeProfileState.get('temporaryWeightValue'),
    temporaryBuysStandardSizing: state.$$sizeProfileState.get('temporaryBuysStandardSizing'),
  };
}

function dispatchToProps(dispatch) {
  const { jumpToStep } = bindActionCreators(WizardActions, dispatch);
  const { updateBuysStandardSizing } = bindActionCreators(SizeProfileActions, dispatch);

  return {
    jumpToStep,
    updateBuysStandardSizing,
  };
}

class PetiteOrPlusMobile extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCloseWizard() {
    this.props.jumpToStep({ shouldAppear: false });
  }

  handlePreviousStep() {
    this.props.jumpToStep({ activeStepId: WizardConstants.OVERALL_FIT_STEP });
  }

  handleYesSelection() {
    this.props.updateBuysStandardSizing({ temporaryBuysStandardSizing: false });
  }

  handleNoSelection() {
    this.props.updateBuysStandardSizing({ temporaryBuysStandardSizing: true });
  }

  handleNextSelection() {
    if (this.props.temporaryBuysStandardSizing !== null) {
      this.props.jumpToStep({ activeStepId: WizardConstants.CURRENT_DRESS_FIT_COMBINED_STEP });
    }
  }

  render() {
    const {
      temporaryWeightValue,
      temporaryBuysStandardSizing,
    } = this.props;

    let isPlus = false;
    if (temporaryWeightValue) {
      isPlus = temporaryWeightValue >= 150;
    }

    return (
      <div>
        <WizardStep
          handleCloseWizard={this.handleCloseWizard}
          handlePreviousStep={this.handlePreviousStep}
          currentStep={3}
          totalSteps={5}
          modalClassName="full-padding-small u-flex u-flex--1"
          modalContentClassName="u-width--full"
          modalWrapperClassName=""
        >
          <div className="u-mb--big u-mt--big">
            <h4 className="WizardStep__title">
              Do you ever buy clothing in {isPlus ? 'Plus' : 'Petite'} sizes? (This can be on rare occasions)
            </h4>
          </div>

          <div className="grid-noGutter">
            <div className="col">
              <Button
                text="Yes"
                handleClick={this.handleYesSelection}
                className={classnames(
                  'Survey__button u-mr--small',
                  {
                    'button__value-selected': temporaryBuysStandardSizing === false,
                  },
                )}
              />
              <Button
                text="No"
                handleClick={this.handleNoSelection}
                className={classnames(
                  'Survey__button',
                  {
                    'button__value-selected': temporaryBuysStandardSizing === true,
                  },
                )}
              />
            </div>
          </div>
        </WizardStep>

        <div className="u-position--fixed u-width--full u-bottom">
          <Button
            className="SelectSizeProfile__button button-height--big"
            text="Next"
            handleClick={this.handleNextSelection}
          />
        </div>
      </div>
    );
  }
}

PetiteOrPlusMobile.propTypes = {
  jumpToStep: PropTypes.func.isRequired,
  updateBuysStandardSizing: PropTypes.func.isRequired,
  // Redux Props
  temporaryWeightValue: PropTypes.number,
  temporaryBuysStandardSizing: PropTypes.bool,
};

PetiteOrPlusMobile.defaultProps = {
  temporaryWeightValue: null,
  temporaryBuysStandardSizing: null,
};

export default connect(stateToProps, dispatchToProps)(PetiteOrPlusMobile);
