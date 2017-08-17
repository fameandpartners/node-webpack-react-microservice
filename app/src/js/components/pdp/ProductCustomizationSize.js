import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import classnames from 'classnames';

// Constants
import {
  // DRAWERS,
  AU_SIZES,
  US_SIZES,
  INCH_SIZES,
  UNITS,
  // MIN_CM,
  // MAX_CM,
} from '../../constants/PDPConstants';


// Actions
// import ModalActions from '../../actions/ModalActions';
import ProductActions from '../../actions/ProductActions';

// UI Components
import ProductCustomization from './ProductCustomization';
import Select from '../form/Select';
import Input from '../form/Input';
import RadioToggle from '../form/RadioToggle';

// CSS
import '../../../css/components/ProductCustomizationSize.scss';

function mapStateToProps(state) {
  return {
    isSiteVersionUS: state.$$appState.get('siteVersion') === 'us',
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

  /**
   * Helper method to generate normal option for Select
   * @param  {Number} i
   * @param  {Nunber} ft
   * @param  {Number} inch
   * @return {Node} defaultOption
   */
  defaultInchOption(i, ft, inch) {
    return (
      <div>
        <span className="amt">{ft}</span>
        <span className="metric">ft</span>
        <span className="amt amt--last">{inch}</span>
        <span className="metric">in</span>
      </div>
    );
  }

  /**
   * Generates a description of height and dress size solection
   * @return {Node} profileSummary
   */
  generateSizeProfileSummary() {
    // const { customize } = this.props;
    // const { height, size } = customize;
    // const hasErrors = (customize.errors.height || customize.errors.size);
    return (
      <div>
        <a className="c-card-customize__content__left">Size Profile</a>
      </div>
    );
  }

  /**
   * Generates the inches options for the Select dropdown
   * @return {Object} options
   */
  generateInchesOptions() {
    return INCH_SIZES.map(({ ft, inch, totalInches }, i) => ({
      id: i,
      name: this.defaultInchOption(i, ft, inch),
      meta: totalInches,
    }));
  }

  /**
   * Handler for changes of CM metric
   */
  handleCMChange({ value }) {
    const numVal = parseInt(value, 10);

    if (typeof numVal === 'number') {
      this.updateHeightSelection({
        temporaryHeightValue: numVal,
        temporaryHeightUnit: UNITS.CM,
      });
    }
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
    const {
      productCustomizationDrawer,
      isSiteVersionUS,
    } = this.props;
    const SIZES = isSiteVersionUS ? US_SIZES : AU_SIZES;

    return (
      <ProductCustomization
        hasNavItems
        handleDrawerSelection={this.handleDrawerSelection}
        productCustomizationDrawer={productCustomizationDrawer}
      >
        <div className="ProductCustomizationSize__layout-container typography">
          <div>
            <h3 className="h3">
              Let’s make it fit.
            </h3>
            <p>
              Just tell us your height and size, and we’ll take care of the tailoring.
            </p>

            <div className="ProductCustomizationSize__height">
              <p className="textAlign--left">What's your height?</p>
              <div className="grid-12">
                <div className="col-6">
                  { true ?
                    <Select
                      id="height-option-in"
                      onChange={this.handleInchChange}
                      className="sort-options"
                      options={this.generateInchesOptions()}
                    /> :
                    <Input
                      id="height-option-cm"
                      type="number"
                      onChange={this.handleCMChange}
                    />
                }
                </div>

                <div className="col-6">
                  <RadioToggle
                    id="metric"
                    value="cm"
                    options={[
                      { label: 'inches', value: 'inch' },
                      { value: 'cm' },
                    ]}
                    onChange={this.handleMetricSwitch}
                  />
                </div>
              </div>

            </div>

            <div className="ProductCustomizationSize__size">
              <p className="textAlign--left">What's your size?</p>
              <div className="ProductCustomizationSize__options grid-12">
                { SIZES.map(s => (
                  <div className="ProductCustomizationSize__option col-3">
                    <div className="ProductCustomizationSize__option-size">
                      {s}
                    </div>
                  </div>
                ))}
                <div className="link link--static">Size Guide</div>
              </div>
            </div>
          </div>
        </div>
      </ProductCustomization>
    );
  }
}

ProductCustomizationStyle.propTypes = {
  // Redux Props
  isSiteVersionUS: PropTypes.bool.isRequired,
  productCustomizationDrawer: PropTypes.string.isRequired,
  // Redux Actions
  changeCustomizationDrawer: PropTypes.func.isRequired,
};

ProductCustomizationStyle.defaultProps = {
  hasNavItems: true,
  selectedColorId: '',
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductCustomizationStyle);
