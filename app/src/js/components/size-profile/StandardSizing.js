import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import ModalActions from '../../actions/ModalActions';

// Constants
import ProductCustomizationSize from '../pdp/ProductCustomizationSize';
import * as CustomizationActions from '../../actions/CustomizationActions';
// import ModalConstants from '../../constants/ModalConstants';

// Components
// import Button from '../generic/Button';
import WizardStep from '../wizard/WizardStep';

function stateToProps() {
  return {};
}

function dispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  const { productCustomizationDrawer } = bindActionCreators(CustomizationActions, dispatch);

  return {
    activateModal,
    productCustomizationDrawer,
  };
}

class StandardSizing extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCloseModal() {
    this.props.activateModal({ shouldAppear: false });
  }

  render() {
    return (
      <WizardStep
        handleCloseModal={this.handleCloseModal}
        modalClassName="full-padding-big u-flex u-flex--1"
        modalContentClassName="u-width--full u-overflow-y--scroll"
        modalWrapperClassName="u-flex--col"
      >
        <ProductCustomizationSize
          hasNavItems={false}
          displaySaveButton
          containerClassNames="u-mt-normal u-mb-big"
        />
      </WizardStep>
    );
  }
}

StandardSizing.propTypes = {
  activateModal: PropTypes.func.isRequired,
};

StandardSizing.defaultProps = {
};

export default connect(stateToProps, dispatchToProps)(StandardSizing);
