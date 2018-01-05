import React, { PureComponent } from 'react';
import autobind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import noop from '../../libs/noop';

// Actions
import ModalActions from '../../actions/ModalActions';
import CustomizationActions from '../../actions/CustomizationActions';

// UI Components
import BridesmaidsColorSwatches from './BridesmaidsColorSwatches';

function stateToProps() {
  return {
    temporaryColorId: 77,
  };
}

function dispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  const {
    selectProductColor,
  } = bindActionCreators(CustomizationActions, dispatch);

  return {
    activateModal,
    selectProductColor,
  };
}

class BridesmaidsColorSelect extends PureComponent {
  constructor(props) {
    super(props);
    autobind(this);
  }


  handleColorSelection(temporaryColor) {
    const {
      selectProductColor,
      filterColors,
      setExpressMakingStatus,
    } = this.props;
    if (!this.isExpressEligible(temporaryColor.id, filterColors)) {
      setExpressMakingStatus(false);
    }
    selectProductColor({ temporaryColor });
  }

  isExpressEligible(colorId, defaultColors) {
    return defaultColors.filter(color => color.id === colorId).length > 0;
  }

  render() {
    const {
      filterColors,
      temporaryColorId,
    } = this.props;

    return (
      <BridesmaidsColorSwatches
        productDefaultColors={filterColors}
        temporaryColorId={temporaryColorId}
        handleColorSelection={this.handleColorSelection}
      />
    );
  }
}

BridesmaidsColorSelect.propTypes = {
  // Redux Props
  filterColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  temporaryColorId: PropTypes.number,
  // Redux Actions
  selectProductColor: PropTypes.func.isRequired,
  setExpressMakingStatus: PropTypes.func,
};

BridesmaidsColorSelect.defaultProps = {
  temporaryColorId: '',
  setExpressMakingStatus: noop,
};


export default connect(stateToProps, dispatchToProps)(BridesmaidsColorSelect);
