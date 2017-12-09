import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import WizardActions from '../../actions/WizardActions';

// Constants
// import WizardConstants from '../../constants/WizardConstants';

// Components
// import Button from '../generic/Button';
import WizardStep from '../wizard/WizardStep';

function stateToProps() {
  return {};
}

function dispatchToProps(dispatch) {
  const { jumpToStep } = bindActionCreators(WizardActions, dispatch);
  return { jumpToStep };
}

class CompletedFitID extends Component {
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
        <div className="CompletedFitID">
          <h3 className="WizardStep__title u-mb-normal u-mt-big">
            All done son!
          </h3>
        </div>
      </WizardStep>
    );
  }
}

CompletedFitID.propTypes = {
  jumpToStep: PropTypes.func.isRequired,
};

CompletedFitID.defaultProps = {
};

export default connect(stateToProps, dispatchToProps)(CompletedFitID);
