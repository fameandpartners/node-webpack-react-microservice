import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import WizardActions from '../../actions/WizardActions';

// Constants
import StandardSizeForm from './StandardSizeForm';
// import ModalConstants from '../../constants/ModalConstants';

// Components
import WizardStep from '../wizard/WizardStep';

function stateToProps() {
  return {};
}

function dispatchToProps(dispatch) {
  const { jumpToStep } = bindActionCreators(WizardActions, dispatch);
  return {
    jumpToStep,
  };
}

class StandardSizing extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCloseWizard() {
    this.props.jumpToStep({ shouldAppear: false });
  }

  render() {
    return (
      <WizardStep
        handleCloseWizard={this.handleCloseWizard}
        modalClassName="full-padding-big u-flex u-flex--1"
        modalContentClassName="u-width--full u-overflow-y--scroll"
        modalWrapperClassName="u-flex--col"
      >
        <StandardSizeForm
          displaySaveButton
          containerClassNames="u-mt-normal u-mb-big"
        />
      </WizardStep>
    );
  }
}

StandardSizing.propTypes = {
  jumpToStep: PropTypes.func.isRequired,
};

StandardSizing.defaultProps = {
};

export default connect(stateToProps, dispatchToProps)(StandardSizing);
