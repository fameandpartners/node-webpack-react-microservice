import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Decorators
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// Components
import Modal from '../modal/Modal';
import Tabs from '../generic/Tabs';
import SizeGuideTable from './SizeGuideTable';
import MeasuringTipsPanel from './MeasuringTipsPanel';

// Actions
import ModalActions from '../../actions/ModalActions';

// Constants
import ModalConstants from '../../constants/ModalConstants';
import SizeGuideModalTabConstants from '../../constants/SizeGuideModalTabConstants';

// CSS
import '../../../css/components/SizeGuideModal.scss';

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
  }

  handleCloseModal() {
    this.props.activateModal({ shouldAppear: false });
  }

  handleSwitchModal(modalId) {
    return () => this.props.activateModal({ modalId });
  }

  render() {
    const {
      sizeChart,
      breakpoint,
    } = this.props;

    return (
      <Modal
        handleCloseModal={
          breakpoint === 'mobile' || breakpoint === 'tablet'
          ?
            this.handleSwitchModal(ModalConstants.SIZE_SELECTION_MODAL)
          :
            this.handleCloseModal
        }
        modalClassName="u-flex u-flex--1"
        modalContentClassName="u-width--full u-overflow-y--scroll"
        modalWrapperClassName="u-flex--col"
      >
        <Tabs
          content={[
            {
              id: SizeGuideModalTabConstants.SIZE_GUIDE,
              heading: 'Size Guide',
              content: (
                <SizeGuideTable
                  sizeChart={sizeChart}
                />
              ),
            },
            {
              id: SizeGuideModalTabConstants.MEASURING_TIPS,
              heading: 'Measuring Tips',
              content: <MeasuringTipsPanel />,
            },
          ]}
          headingClasses="SizeGuideTabs__heading"
          contentClasses="SizeGuideTabs__content"
        />
      </Modal>
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

  // Decorator Props
  breakpoint: PropTypes.string.isRequired,
};

SizeGuideModal.defaultProps = {
  // Redux
  activeModalId: null,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(SizeGuideModal));
