import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookies from 'universal-cookie';
import win from '../../polyfills/windowPolyfill';


// Actions
import * as CustomizationActions from '../../actions/CustomizationActions';
import ModalActions from '../../actions/ModalActions';

// CSS REMOVE
import '../../../css/components/ShoppingSpree.scss';


function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?

  return state;
}


function dispatchToProps(dispatch) {
  const { activateCustomizationDrawer } = bindActionCreators(CustomizationActions, dispatch);
  const actions = bindActionCreators(ModalActions, dispatch);

  return {
    activateCustomizationDrawer,
    activateModal: actions.activateModal,
  };
}

class CliqueCallout extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    const cookies = new Cookies();

    this.state = {
      inShoppingSpree: cookies.get('shopping_spree_id') != null,
    };
  }

  handleStartCliqueToBuy() {
    if (win.startShoppingSpree) {
      win.startShoppingSpree();
    }
  }

  generateCliqueCallout(isCliqueActive) {
    if (!isCliqueActive || this.state.inShoppingSpree) return null;
    return (
      <div className="grid-center-spaceAround CliqueCallout__content">
        <div className="col-10 u-text-align-left u-paddingBottom--small">
          <p className="CliqueCallout__content--headline u-mb-small">
            Want up to 25% off?
          </p>
          <p className="CliqueCallout__content--subHeadline">
            Invite your friends to group shop with you. The more you buy, the more you save.&nbsp;
            <span
              role="button"
              onClick={this.handleStartCliqueToBuy}
              className="link"
            >
              Enter Clique to&nbsp;Buy
            </span>
          </p>
        </div>
      </div>
    );
  }

  render() {
    const CLIQUE_ACTIVE = true;

    return (
      <div className="CliqueCallout u-mb-small">
        { this.generateCliqueCallout(CLIQUE_ACTIVE) }
      </div>
    );
  }
}

CliqueCallout.propTypes = {};
CliqueCallout.defaultProps = {};

export default connect(stateToProps, dispatchToProps)(CliqueCallout);
