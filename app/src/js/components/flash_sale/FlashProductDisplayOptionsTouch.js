/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Utilities
import {
  isDarkLuminance,
  isExtremeLightLuminance,
} from '../../utilities/color';

// Components
import FlashProductDescription from './FlashProductDescription';
import FlashProductImageSlider from './FlashProductImageSlider';

// Actions
import * as ModalActions from '../../actions/ModalActions';

// CSS
import '../../../css/components/FlashProductDisplayOptionsTouch.scss';


function stateToProps(state) {
  const lineItem = state.$$flashSaleState.get('$$lineItem').toJS();
  // Which part of the Redux global state does our component want to receive as props?
  return {
    lineItem,
  };
}

function dispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  return { activateModal };
}

class FlashProductDisplayOptionsTouch extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  hasPatternImage(value) {
    return value.indexOf('.') > -1;
  }

  generateFlashColorSwatch() {
    const { lineItem } = this.props;
    const value = lineItem.color_value;

    if (this.hasPatternImage(value)) {
      return {
        backgroundImage: `url(${value})`,
      };
    }

    return {
      background: value,
    };
  }

  determineDarkLuminance() {
    const { lineItem } = this.props;
    const value = lineItem.color_value;
    if (!this.hasPatternImage(value)) {
      return isDarkLuminance({ hexValue: value });
    }

    return true;
  }

  determineLightLuminance() {
    const { lineItem } = this.props;
    const value = lineItem.color_value;
    if (!this.hasPatternImage(value)) {
      return isExtremeLightLuminance({ hexValue: value });
    }

    return false;
  }

  render() {
    const { lineItem } = this.props;
    return (
      <div className="FlashProductDisplayOptionsTouch layout-container">

        <FlashProductImageSlider />

        <div className="FlashProductDisplayOptionsTouch__options u-mb--normal u-mt--normal" />

        <div className="u-mb--huge">
          <FlashProductDescription lineItem={lineItem} />
        </div>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
FlashProductDisplayOptionsTouch.propTypes = {
  // Redux Properties
  lineItem: PropTypes.shape({
    color_value: PropTypes.string,
    color_presentation: PropTypes.string,
  }).isRequired,
};
FlashProductDisplayOptionsTouch.defaultProps = {
  selectedStyleCustomizations: [],
  colorCentsTotal: 0,
};

export default connect(stateToProps, dispatchToProps)(FlashProductDisplayOptionsTouch);
