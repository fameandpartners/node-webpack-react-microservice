/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import ModalContainer from '../../modal/ModalContainer';
import Modal from '../../modal/Modal';
import ButtonLedge from '../../generic/ButtonLedge';
import BridesmaidsModalColorSelection from './BridesmaidsModalColorSelection';
import BridesmaidsModalSilhouetteSelect from './BridesmaidsModalSilhouetteSelect';
import BridesmaidsModalLengthSelect from './BridesmaidsModalLengthSelect';
import BridesmaidsModalTopDetailSelect from './BridesmaidsModalTopDetailSelect';

// Constants
import BDModalConstants from '../../../constants/BDModalConstants';

// CSS
import '../../../../css/components/BridesmaidsFilterModal.scss';

function stateToProps({ $$bridesmaidsFilterState }) {
  const selectedColor = $$bridesmaidsFilterState.get('selectedColor');
  const selectedSilhoutte = $$bridesmaidsFilterState.get('selectedSilhoutte');
  const selectedLength = $$bridesmaidsFilterState.get('selectedLength');
  const selectedDetails = $$bridesmaidsFilterState.get('selectedDetails');

  return {
    selectedColor: selectedColor ? selectedColor.toJS() : {},
    selectedSilhoutte: selectedSilhoutte ? selectedSilhoutte.toJS() : {},
    selectedLength: selectedLength ? selectedLength.toJS() : {},
    selectedDetails: selectedDetails ? selectedDetails.toJS() : {},
  };
}


function dispatchToProps() {
  return {

  };
}

class BridesmaidsFilterModal extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCloseModal() {
    this.props.activateModal({ shouldAppear: false });
  }

  render() {
    return (
      <ModalContainer
        slideUp
        dimBackground={false}
        modalIds={[BDModalConstants.BD_FILTER_MODAL]}
      >
        <Modal
          headline="Filters"
          handleCloseModal={this.handleCloseModal}
          modalClassName="u-flex u-flex--1 u-overflow-y--scroll"
          modalContentClassName="u-width--full"
          modalWrapperClassName="u-flex--col"
        >
          <div className="BridesmaidsFilterModal__layout-container">
            <h3 className="BridesmaidsFilterModal__heading h4 u-text-align--left u-text-align--left">
              Color
            </h3>

            <BridesmaidsModalColorSelection />

          </div>

          <div className="BridesmaidsFilterModal__layout-container">
            <h3 className="BridesmaidsFilterModal__heading h4 u-text-align--left">
              Silhouettes
            </h3>

            <BridesmaidsModalSilhouetteSelect />

          </div>

          <div className="BridesmaidsFilterModal__layout-container">
            <h3 className="BridesmaidsFilterModal__heading h4 u-text-align--left">
              Lengths
            </h3>

            <BridesmaidsModalLengthSelect />

          </div>

          <div className="BridesmaidsFilterModal__layout-container u-mb--huge">
            <h3 className="BridesmaidsFilterModal__heading h4 u-text-align--left">
              Top Styles
            </h3>

            <BridesmaidsModalTopDetailSelect />

          </div>

          <div className="BridesmaidsFilterModal__button u-position--fixed">
            <ButtonLedge
              handleLeftButtonClick={() => {}}
              handleRightButtonClick={() => {}}
              rightText="Apply"
            />
          </div>
        </Modal>
      </ModalContainer>
    );
  }
}

BridesmaidsFilterModal.propTypes = {
  // Redux Props
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
};

BridesmaidsFilterModal.defaultProps = {
  activeModalId: null,
};


export default connect(stateToProps, dispatchToProps)(BridesmaidsFilterModal);
