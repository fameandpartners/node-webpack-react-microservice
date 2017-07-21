import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { TransitionMotion } from 'react-motion';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// UI Components
import ColorSwatches from './ColorSwatches';

// Actions
import ModalActions from '../../actions/ModalActions';
import ProductActions from '../../actions/ProductActions';

// Constants
import * as modalAnimations from '../../utilities/modal-animation';

// CSS
import '../../../css/components/ColorSelection.scss';

function mapStateToProps(state) {
  return {
    productColorDrawerOpen: state.$$productState.get('productColorDrawerOpen'),
    productDefaultColors: state.$$productState.get('productDefaultColors').toJS(),
    productSecondaryColors: state.$$productState.get('productSecondaryColors').toJS(),
    productSecondaryColorCentsPrice: state.$$productState.get('productSecondaryColorCentsPrice'),
  };
}

function mapDispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  const { selectProductColor } = bindActionCreators(ProductActions, dispatch);
  return { activateModal, selectProductColor };
}

class ColorSelectionDrawer extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCloseColorDrawer() {
    console.log('handle close color drawer');
  }

  handleColorSelection(color) {
    this.props.selectProductColor({ color });
  }

  willEnter() {
    return modalAnimations.SLIDE_OVER_WILL_ENTER;
  }

  willLeave() {
    return modalAnimations.SLIDE_OVER_WILL_LEAVE;
  }

  render() {
    const {
      productColorDrawerOpen,
      productDefaultColors,
      productSecondaryColors,
      productSecondaryColorCentsPrice,
    } = this.props;

    return (
      <TransitionMotion
        styles={productColorDrawerOpen ? [modalAnimations.SLIDE_OVER_DEFAULT_STYLES] : []}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {(items) => {
          if (items.length) {
            return (
              /* eslint-disable */
              <div
                key={items[0].key}
                className="ColorSelectionDrawer height--full u-overflow-y--scroll textAlign--center"
                style={{
                  transform: `translate3d(${items[0].style.x}%, 0, 0)`,
                }}
              >
                <div className="ColorSelectionDrawer__content">
                  <ColorSwatches
                    productDefaultColors={productDefaultColors}
                    productSecondaryColors={productSecondaryColors}
                    productSecondaryColorCentsPrice={productSecondaryColorCentsPrice}
                    handleColorSelection={this.handleColorSelection}
                  />
                </div>
              </div>
            );

          }
          return null;
        }}
      </TransitionMotion>
    );
  }
}

ColorSelectionDrawer.propTypes = {
  // Redux Props
  productColorDrawerOpen: PropTypes.bool.isRequired,
  productDefaultColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  // Redux Props
  productSecondaryColorCentsPrice: PropTypes.number.isRequired,
  productSecondaryColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    hexValue: PropTypes.string,
    patternUrl: PropTypes.string,
  })).isRequired,
  // Redux Actions
  selectProductColor: PropTypes.func.isRequired,
};

ColorSelectionDrawer.defaultProps = {
  // Redux
  activeModalId: null,
};


export default connect(mapStateToProps, mapDispatchToProps)(ColorSelectionDrawer);
