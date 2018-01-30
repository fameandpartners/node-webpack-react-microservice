import React, { PureComponent } from 'react';
import autobind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import noop from '../../../libs/noop';

// Actions
import ModalActions from '../../../actions/ModalActions';
import BridesmaidsFilterActions from '../../../actions/BridesmaidsFilterActions';

// UI Components
import BridesmaidsColorSwatches from '../BridesmaidsColorSwatches';

// CSS
import '../../../../css/components/BridesmaidsModalColorSelection.scss';

function stateToProps({ $$bridesmaidsFilterState }) {
  const temporaryColor = $$bridesmaidsFilterState.get('temporaryColor');

  return {
    temporaryColorId: temporaryColor ? temporaryColor.get('id') : null,
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


  handleColorSelection(temporaryColor) {
    const {
      selectFilterColor,
    } = this.props;

    selectFilterColor({ temporaryColor });
    // this.props.handleSelection({ selectedColor });
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
      <div className="BridesmaidsModalColorSelection">
        <BridesmaidsColorSwatches
          gridClass="grid-12"
          colClass="col-4_md-2_sm-4"
          productDefaultColors={filterColors}
          selectedColorId={temporaryColorId}
          handleColorSelection={this.handleColorSelection}
        />
      </div>
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
  selectFilterColor: PropTypes.func.isRequired,
  // setExpressMakingStatus: PropTypes.func,
  // handleSelection: PropTypes.func.isRequired,
};

BridesmaidsColorSelect.defaultProps = {
  temporaryColorId: null,
  setExpressMakingStatus: noop,
};


export default connect(stateToProps, dispatchToProps)(BridesmaidsColorSelect);
