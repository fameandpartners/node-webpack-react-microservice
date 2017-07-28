import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

// Actions
// import ModalActions from '../../actions/ModalActions';
import ProductActions from '../../actions/ProductActions';

// UI Components
import ProductCustomizationNavigation from './ProductCustomizationNavigation';

// CSS
// import '../../../css/components/ProductCustomizationStyle.scss';

function mapStateToProps(state) {
  return {
    productCustomizationDrawer: state.$$productState.get('productCustomizationDrawer'),
    // productCustomizationDrawerOpen: state.$$productState.get('productCustomizationDrawerOpen'),
    // productDefaultColors: state.$$productState.get('productDefaultColors').toJS(),
    // productSecondaryColors: state.$$productState.get('productSecondaryColors').toJS(),
    // productSecondaryColorCentsPrice: state.$$productState.get('productSecondaryColorCentsPrice'),
    // selectedColorId: state.$$productState.get('selectedColor').get('id'),
  };
}

function mapDispatchToProps(dispatch) {
  const { changeCustomizationDrawer } = bindActionCreators(ProductActions, dispatch);
  return { changeCustomizationDrawer };
}


class ProductCustomizationStyle extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleDrawerSelection(productCustomizationDrawer) {
    console.log('productCustomizationDrawer', productCustomizationDrawer);
    this.props.changeCustomizationDrawer({ productCustomizationDrawer });
  }

  // handleColorSelection(color) {
  //   const {
  //     activateColorDrawer,
  //     selectProductColor,
  //   } = this.props;
  //
  //   if (productCustomizationDrawerOpen) {
  //     selectProductColor({ color });
  //     activateColorDrawer({ isActive: false });
  //   }
  // }

  render() {
    const { productCustomizationDrawer } = this.props;

    return (
      <div className="ProductCustomizationStyle height--full u-flex--col">
        <div className="ProductCustomizationStyle__header">
          <div className="grid-12">
            <div className="col-3">
              <ProductCustomizationNavigation
                handleDrawerSelection={this.handleDrawerSelection}
                productCustomizationDrawer={productCustomizationDrawer}
              />
            </div>
          </div>
        </div>
        <div
          className={classnames(
            [
              'ProductCustomizationStyle__wrapper',
              'height--full u-overflow-y--scroll textAlign--center',
            ],
        )}
        >

          <div className="grid-center-noGutter">
            <div
              className={classnames(
                'ProductCustomizationStyle__content col-6',
                // { 'col-6': !noCol },
              )}
            >
              Put style stuff here
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductCustomizationStyle.propTypes = {
  // Redux Props
  productCustomizationDrawer: PropTypes.string.isRequired,
  // Redux Actions
  changeCustomizationDrawer: PropTypes.func.isRequired,
};

ProductCustomizationStyle.defaultProps = {
  hasNavItems: true,
  selectedColorId: '',
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductCustomizationStyle);
