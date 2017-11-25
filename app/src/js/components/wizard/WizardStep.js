/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';

// Utilities
import noop from '../../libs/noop';

// Components
import CancelOut from '../shared/CancelOut';
import BackArrow from '../shared/BackArrow';
import Container from '../generic/Container';

class WizardStep extends PureComponent {
  render() {
    const {
      children,
      handleCloseWizard,
      handlePreviousStep,
      modalClassName,
      modalContentClassName,
      modalWrapperClassName,
      onMouseMove,
      currentStep,
      totalSteps,
    } = this.props;

    return (
      <div
        className={classnames([
          'WizardStep__wrapper u-height--full',
          modalWrapperClassName,
        ])}
        onMouseMove={onMouseMove}
      >
        <div
          className={classnames(
            'WizardStep__header h4 WizardStep__layout-container',
          )}
        >
          { handlePreviousStep &&
            <div
              className={classnames(
                'BackArrow__wrapper',
              )}
            >
              <BackArrow onClick={handlePreviousStep} />
            </div>
          }
          <div
            className={classnames(
             'CancelOut__wrapper',
            )}
          >
            <CancelOut onClick={handleCloseWizard} />
          </div>
          { currentStep && totalSteps &&
            <h3 className="h6">{`${currentStep} of ${totalSteps}`}</h3>
          }
        </div>

        <div
          className={classnames([
            'WizardStep',
            modalClassName,
          ])}
        >
          <Container
            className={classnames([
              'WizardStep__content',
              modalContentClassName,
            ])}
          >
            {children}
          </Container>
        </div>
      </div>
    );
  }
}

WizardStep.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.node]).isRequired,
  handleCloseWizard: PropTypes.func,
  handlePreviousStep: PropTypes.func,
  modalClassName: PropTypes.string,
  modalContentClassName: PropTypes.string,
  modalWrapperClassName: PropTypes.string,
  onMouseMove: PropTypes.func,
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
};

WizardStep.defaultProps = {
  handleCloseWizard: noop,
  handlePreviousStep: null,
  modalClassName: '',
  modalContentClassName: '',
  modalWrapperClassName: '',
  onMouseMove: noop,
  currentStep: null,
  totalSteps: null,
};

export default WizardStep;
