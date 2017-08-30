import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import ModalContainer from '../modal/ModalContainer';
import Modal from '../modal/Modal';
import Tabs from '../generic/Tabs';
import SizeGuideTable from './SizeGuideTable';

import Button from '../generic/Button';

// Actions
import ModalActions from '../../actions/ModalActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';
import SizeGuideModalTabConstants from '../../constants/SizeGuideModalTabConstants';

function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    sizeChart: state.$$productState.get('sizeChart').toJS(),
  };
}

function dispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  return { activateModal };
}

class SizeGuideModal extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      centimeters: false,
    };
  }

  handleCloseModal() {
    this.props.activateModal({ shouldAppear: false });
  }

  render() {
    const {
      sizeChart,
    } = this.props;

    const {
      centimeters,
    } = this.state;

    return (
      <ModalContainer
        slideLeft
        dimBackground={false}
        modalIds={[ModalConstants.SIZE_GUIDE_MODAL]}
      >
        <Modal
          handleCloseModal={this.handleCloseModal}
          modalClassName="grid-middle u-flex--1"
          modalContentClassName="u-width--full"
          modalWrapperClassName="u-flex--col"
        >
          <div className="SizeGuideModal u-text-align--center grid-middle">
            <div className="Modal__content--med-margin-bottom">
              <h1 style={{ fontSize: '3em' }}>ViewSizeGuide Modal [DESKTOP]</h1>
              <br />
              <Tabs
                content={[
                  {
                    id: SizeGuideModalTabConstants.SIZE_GUIDE,
                    heading: 'Size Guide',
                    content: (<SizeGuideTable
                      sizeChart={sizeChart}
                      centimeters={centimeters}
                    />),
                  },
                  {
                    id: SizeGuideModalTabConstants.MEASURING_TIPS,
                    heading: 'Measuring Tips',
                    content: <div>Measuring Tips Content</div>,
                  },
                ]}
              />
              <Button
                text="Toggle Inches / CM"
                handleClick={() => this.setState({ centimeters: !centimeters })}
              />
            </div>
          </div>
        </Modal>
      </ModalContainer>
    );
  }
}

SizeGuideModal.propTypes = {
  // Redux Properties
  sizeChart: PropTypes.arrayOf(PropTypes.shape({
    'Size Aus/UK': PropTypes.number,
    'Size US': PropTypes.number,
    'Bust cm': PropTypes.string,
    'Bust Inches': PropTypes.string,
    'Underbust cm': PropTypes.number,
    'Underbust Inches': PropTypes.string,
    'Waist cm': PropTypes.string,
    'Waist Inches': PropTypes.string,
    'Hip cm': PropTypes.string,
    'Hip Inches': PropTypes.string,
  })).isRequired,
  activateModal: PropTypes.func.isRequired,
};

SizeGuideModal.defaultProps = {
  // Redux
  activeModalId: null,
};

export default connect(stateToProps, dispatchToProps)(SizeGuideModal);
