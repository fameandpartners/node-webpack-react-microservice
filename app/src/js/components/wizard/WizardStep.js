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
      headline,
      modalClassName,
      modalContentClassName,
      modalWrapperClassName,
      onMouseMove,
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
            {
              'WizardStep__header--headline': !!headline,
            },
          )}
        >
          <div
            className={classnames(
              'BackArrow__wrapper',
            )}
          >
            <BackArrow onClick={handleCloseWizard} />
          </div>

          <div
            className={classnames(
             'CancelOut__wrapper',
            )}
          >
            <CancelOut onClick={handleCloseWizard} />
          </div>

          <h3 className="h6">{headline}</h3>
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
  headline: PropTypes.string,
  modalClassName: PropTypes.string,
  modalContentClassName: PropTypes.string,
  modalWrapperClassName: PropTypes.string,
  onMouseMove: PropTypes.func,
};

WizardStep.defaultProps = {
  headline: null,
  handleCloseWizard: noop,
  modalClassName: '',
  modalContentClassName: '',
  modalWrapperClassName: '',
  onMouseMove: noop,
};

export default WizardStep;
