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
// import WizardStep from '../wizard/WizardStep';

function stateToProps() {
  return {};
}

function dispatchToProps(dispatch) {
  const { jumpToStep } = bindActionCreators(WizardActions, dispatch);
  return { jumpToStep };
}

class CalculateFitID extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCloseWizard() {
    this.props.jumpToStep({ shouldAppear: false });
  }

  render() {
    return (
      <div className="CalculateFitID">
        <h3 className="Calc__title u-mb-normal u-mt-big">
          Calculating your personalized fit I.D.
        </h3>
        <ul className="Calc__list">
          <li>
            <div className="checkmark" />
            <span className="Calc__label">Bust</span>
          </li>
          <li>
            <div className="checkmark" />
            <span className="Calc__label">Waist</span>
          </li>
          <li className="waiting">
            <div className="checkmark" />
            <span className="Calc__label">Hips</span>
          </li>
        </ul>
      </div>
    );
  }
}

CalculateFitID.propTypes = {
  jumpToStep: PropTypes.func.isRequired,
};

CalculateFitID.defaultProps = {
};

export default connect(stateToProps, dispatchToProps)(CalculateFitID);
