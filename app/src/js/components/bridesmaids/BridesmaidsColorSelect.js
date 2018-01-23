import React, { PureComponent } from 'react';
import autobind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import noop from '../../libs/noop';

// Actions
import ModalActions from '../../actions/ModalActions';
import BridesmaidsFilterActions from '../../actions/BridesmaidsFilterActions';

// UI Components
import BridesmaidsColorSwatches from './BridesmaidsColorSwatches';

function stateToProps({ $$bridesmaidsFilterState }) {
  const selectedColor = $$bridesmaidsFilterState.get('selectedColor');

  return {
    selectedColorId: selectedColor ? selectedColor.get('id') : null,
    filterColors: $$bridesmaidsFilterState.get('$$bridesmaidsFilterColors').toJS(),
  };
}

function dispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  const {
    selectFilterColor,
  } = bindActionCreators(BridesmaidsFilterActions, dispatch);

  return {
    activateModal,
    selectFilterColor,
  };
}

class BridesmaidsColorSelect extends PureComponent {
  constructor(props) {
    super(props);
    autobind(this);
  }


  handleColorSelection(selectedColor) {
    const {
      selectFilterColor,
      filterColors,
      setExpressMakingStatus,
    } = this.props;
    if (!this.isExpressEligible(selectedColor.id, filterColors)) {
      setExpressMakingStatus(false);
    }
    selectFilterColor({ selectedColor });
    this.props.handleSelection();
  }

  isExpressEligible(colorId, defaultColors) {
    return defaultColors.filter(color => color.id === colorId).length > 0;
  }

  render() {
    const {
      filterColors,
      selectedColorId,
    } = this.props;

    return (
      <BridesmaidsColorSwatches
        productDefaultColors={filterColors}
        selectedColorId={selectedColorId}
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
  selectedColorId: PropTypes.number,
  // Redux Actions
  selectFilterColor: PropTypes.func.isRequired,
  setExpressMakingStatus: PropTypes.func,
  handleSelection: PropTypes.func.isRequired,
};

BridesmaidsColorSelect.defaultProps = {
  selectedColorId: null,
  setExpressMakingStatus: noop,
};


export default connect(stateToProps, dispatchToProps)(BridesmaidsColorSelect);
