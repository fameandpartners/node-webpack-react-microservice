import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { assign } from 'lodash';
// import classnames from 'classnames';

// Constants
import {
  // DRAWERS,
  // CM_TO_INCHES,
  US_SIZES,
  AU_SIZES,
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
import Button from '../generic/Button';

// CSS
import '../../../css/components/ProductCustomizationSize.scss';

function mapStateToProps(state) {
  return {
    isUSSiteVersion: state.$$appState.get('siteVersion') === 'us',
    productCustomizationDrawer: state.$$customizationState.get('productCustomizationDrawer'),
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

  updateHeightSelection(newHeight) {
    console.log('newHeight', newHeight);
    // const { height, errors } = this.props.customize;
    // this.props.actions.customizeDress({
    //   errors: assign({}, errors, { height: false }),
    //   height: assign({}, height, newHeight),
    // });
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

  handleDrawerSelection(productCustomizationDrawer) {
    console.log('productCustomizationDrawer', productCustomizationDrawer);
    this.props.changeCustomizationDrawer({ productCustomizationDrawer });
  }

  /**
   * Handles for changes of INCH metric
   * @param  {Object} {option} - Select dropdown's option chosen
   */
  handleInchChange({ option }) {
    const selection = INCH_SIZES[option.id];

    if (selection) {
      const inches = (selection.ft * 12) + selection.inch;
      console.log('inches', inches);
      // this.updateHeightSelection({
      //   temporaryHeightId: option.id,
      //   temporaryHeightValue: inches,
      //   temporaryHeightUnit: UNITS.INCH,
      // });
    } else {
      // this.updateHeightSelection({
      //   temporaryHeightId: null,
      //   temporaryHeightValue: null,
      //   temporaryHeightUnit: UNITS.INCH,
      // });
    }
  }

  /**
   * Handles the toggling of a metric switch
   * @param  {String} {value} (CM|INCH)
   */
  handleMetricSwitch({ value }) {
    this.updateHeightSelection({ temporaryHeightUnit: value });
    this.handleUnitConversionUpdate(value);
  }

  /**
   * Converts unit values on the fly
   * @param  {String} value (CM|INCH)
   */
  handleUnitConversionUpdate() { // value
    // const { height } = this.props.customize;
    // const { temporaryHeightValue } = height;
    // if (value === UNITS.CM && temporaryHeightValue) { // CM selected
    //   const newVal = Math.round(temporaryHeightValue * CM_TO_INCHES);
    //   this.handleCMChange({ value: newVal });
    // } else if (value === UNITS.INCH && temporaryHeightValue) { // INCH selected
    //   const totalInches = Math.round(temporaryHeightValue / CM_TO_INCHES);
    //   const option = find(INCH_SIZES, { totalInches });
    //   this.handleInchChange({
    //     option: {
    //       id: option ? option.id : null,
    //     },
    //   });
    // }
  }

  handleDressSizeSelection(s) {
    return () => {
      console.log('s', s);
    };
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

  render() {
    const {
      productCustomizationDrawer,
      isUSSiteVersion,
    } = this.props;
    const SIZES = isUSSiteVersion ? US_SIZES : AU_SIZES;

    return (
      <ProductCustomization
        hasNavItems
        handleDrawerSelection={this.handleDrawerSelection}
        productCustomizationDrawer={productCustomizationDrawer}
      >
        <div className="ProductCustomizationSize__layout-container typography">
          <div className="App--mb-big">
            <h3 className="h3">
                Let’s make it fit.
              </h3>
            <p>
                Just tell us your height and size, and we&apos;ll take care of the tailoring.
              </p>
          </div>

          <div className="ProductCustomizationSize__height App--mb-normal">
            <p className="textAlign--left">How tall are you?</p>
            <div className="grid">
              <div className="col-8">
                { true ?
                  <Select
                    id="height-option-in"
                    className="sort-options"
                    options={this.generateInchesOptions()}
                    onChange={this.handleInchChange}
                  /> :
                  <Input
                    id="height-option-cm"
                    type="number"
                    onChange={this.handleCMChange}
                  />
                }
              </div>

              <div className="col">
                <RadioToggle
                  id="metric"
                  value="cm"
                  options={[
                      { value: 'inch' },
                      { label: 'cm', value: 'cm' },
                  ]}
                  onChange={this.handleMetricSwitch}
                />
              </div>
            </div>

          </div>

          <div>
            <p className="textAlign--left">What's your size?</p>
            <div className="ProductCustomizationSize__size grid-12">
              { SIZES.map(s => (
                <div key={s.id} className="col-3">
                  <Button
                    tertiary
                    square
                    text={s}
                    onClick={this.handleDressSizeSelection(s)}
                  />
                </div>
              ))}
              <span className="link link--static">View Size Guide</span>
            </div>
          </div>
        </div>
      </ProductCustomization>
    );
  }
}

ProductCustomizationStyle.propTypes = {
  // Redux Props
  productCustomizationDrawer: PropTypes.string.isRequired,
  isUSSiteVersion: PropTypes.bool.isRequired,
  // Redux Actions
  changeCustomizationDrawer: PropTypes.func.isRequired,
};

ProductCustomizationStyle.defaultProps = {
  hasNavItems: true,
  selectedColorId: '',
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductCustomizationStyle);
