import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import WizardActions from '../../actions/WizardActions';

// Constants
import WizardConstants from '../../constants/WizardConstants';

// Components

function stateToProps() {
  return {};
}

function dispatchToProps(dispatch) {
  const { jumpToStep } = bindActionCreators(WizardActions, dispatch);
  return { jumpToStep };
}

let intervalId = null;
let secondsElapsed = 0;
class CalculateFitID extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    secondsElapsed = 0;
    intervalId = setInterval(this.calculating, 1000);
  }

  componentWillUnmount() {
    clearInterval(intervalId);
    secondsElapsed = 0;
  }

  calculating() {
    switch (secondsElapsed) {
      case 0:
        this.firstCheck.classList.remove('waiting');
        break;
      case 1:
        this.secondCheck.classList.remove('waiting');
        break;
      case 2:
        this.thirdCheck.classList.remove('waiting');
        break;
      default:
        this.props.jumpToStep({ activeStepId: WizardConstants.COMPLETED_FIT_ID_STEP });
        break;
    }
    secondsElapsed += 1;
  }

  handleCloseWizard() {
    this.props.jumpToStep({ shouldAppear: false });
  }

  render() {
    return (
      <div className="CalculateFitID">
        <h3 className="Calc__title u-mb--normal u-mt--big">
          Calculating your personalized fit I.D.
        </h3>
        <ul className="Calc__list">
          <li ref={c => this.firstCheck = c} className="waiting">
            <div className="checkmark" />
            <span className="Calc__label">Bust</span>
          </li>
          <li ref={c => this.secondCheck = c} className="waiting">
            <div className="checkmark" />
            <span className="Calc__label">Waist</span>
          </li>
          <li ref={c => this.thirdCheck = c} className="waiting">
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
