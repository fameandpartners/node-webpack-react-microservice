/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Libraries
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// Actions
import ProductActions from '../../actions/ProductActions';

// Utilities
import { formatCents } from '../../utilities/accounting';
import {
  generateBackgroundValueFromColor,
} from '../../utilities/color';

// CSS
import '../../../css/components/ColorSwatches.scss';
import '../../../css/components/FabricColorSwatches.scss';

function stateToProps({ $$productState }) {
  return {
    hasFabrics: $$productState.get('hasFabrics'),
    productDefaultFabrics: $$productState.get('productDefaultFabrics').toJS(),
    productSecondaryFabrics: $$productState.get('productSecondaryFabrics').toJS(),
    fabricColorGroupSelections: $$productState.get('fabricColorGroupSelections').toJS(),
    fabricGroupSelections: $$productState.get('fabricGroupSelections').toJS(),
  };
}

function dispatchToProps(dispatch) {
  const {
    selectFabricColorGroup,
    selectFabricGroup,
  } = bindActionCreators(ProductActions, dispatch);

  return {
    selectFabricColorGroup,
    selectFabricGroup,
  };
}

class FabricColorSwatches extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleColorGroupClick(c) {
    return () => {
      this.props.selectFabricColorGroup(c);
    };
  }

  handleGroupClick(productName) {
    return () => {
      this.props.selectFabricGroup(productName);
    };
  }

  handleColorSelection(color) {
    return () => { this.props.handleColorSelection(color); };
  }

  arrayHasIntersectionMembers(array1, array2) {
    const intersectingMembers = array1.filter(n => array2.indexOf(n) !== -1);
    return intersectingMembers.length > 0;
  }

  filterFabrics() {
    const {
      productDefaultFabrics,
      productSecondaryFabrics,
      fabricColorGroupSelections,
      fabricGroupSelections,
    } = this.props;

    const filteredDefaultFabrics = productDefaultFabrics
      .filter(fabric => this.arrayHasIntersectionMembers(fabric.belongsToColorGroups, fabricColorGroupSelections) || fabricColorGroupSelections.length === 0)
      .filter(fabric => fabricGroupSelections.includes(fabric.material) || fabricGroupSelections.length === 0);

    const filteredSecondaryFabrics = productSecondaryFabrics
      .filter(fabric => this.arrayHasIntersectionMembers(fabric.belongsToColorGroups, fabricColorGroupSelections) || fabricColorGroupSelections.length === 0)
      .filter(fabric => fabricGroupSelections.includes(fabric.material) || fabricGroupSelections.length === 0);

    return {
      filteredDefaultFabrics,
      filteredSecondaryFabrics,
    };
  }

  takeFirstWord(str) {
    return str.split(' ')[0];
  }

  generateFabricColorGroupSelections() {
    const {
      breakpoint,
      fabricColorGroupSelections,
      productGroupColors,
    } = this.props;

    return productGroupColors.map(c => (
      <div
        className="col-2_xs-2_sm-2_md-3_lg-2 FabricColorSwatches__color-group-option u-cursor--pointer"
        onClick={this.handleColorGroupClick(c)}
        key={`pgc-${c.id}`}
      >
        <span
          className={classnames(
            'FabricColorSwatches__mini-swatch',
            `FabricColorSwatches__mini-swatch--${c.name}`,
            { 'FabricColorSwatches__mini-swatch--selected': fabricColorGroupSelections.includes(c.presentation) },
          )}
        />
        { breakpoint === 'mobile' || breakpoint === 'tablet'
          ? null
          : <span className="link link--no-underline">{this.takeFirstWord(c.presentation)}</span>
        }
      </div>
    ));
  }

  generateFabricGroupSelections() {
    const { fabricGroups, fabricGroupSelections } = this.props;
    return fabricGroups.map(fabricName => (
      <span
        className={classnames(
          'FabricColorSwatches__fabric-option u-mr--normal u-cursor--pointer',
          { 'FabricColorSwatches__fabric-option--selected': fabricGroupSelections.includes(fabricName) },
        )}
        onClick={this.handleGroupClick(fabricName)}
      >
        {fabricName}
      </span>
    ));
  }

  generateFabricSwatch(color, price = 0) {
    const { hasFabrics, temporaryColorId } = this.props;
    const isActive = temporaryColorId === color.id;
    const background = generateBackgroundValueFromColor(color);
    const centsPrice = hasFabrics ? parseInt(color.usdPrice, 10) : price;

    return (
      <div
        key={color.id || color.presentation}
        className="col-4 u-mb--big"
      >
        <div
          onClick={this.handleColorSelection(color)}
          className={classnames([
            'ColorSwatches__wrapper ColorSwatches__wrapper--extreme-light',
            'col u-cursor--pointer u-height--full u-position--relative',
            {
              'ColorSwatches__wrapper--active': isActive,
            },
          ])}
          style={{ background }}
        >
          <div className="ColorSwatches__transform-wrapper">
            <div
              className={classnames(
              'ColorSwatches__swatch',
                {
                  'ColorSwatches__swatch--pattern': !!color.patternUrl,
                },
            )}
            />
          </div>
          <span
            className={classnames(
              'ColorSwatches__touch-display-text',
              'u-width--full u-left',
            )}
          >
            <h6 className="ColorSwatches__text">
              {color.presentation}
              {centsPrice ? <span>&nbsp;{formatCents(centsPrice, 0)}</span> : null }
            </h6>
          </span>
        </div>
      </div>
    );
  }

  render() {
    const { productSecondaryColorsCentsPrice } = this.props;
    const { filteredDefaultFabrics, filteredSecondaryFabrics } = this.filterFabrics();
    const fabricGroupSelections = this.generateFabricGroupSelections();

    return (
      <div
        className="FabricColorSwatches ColorSwatches u-mt--normal u-text-align-left"
      >
        <div className="grid-12-center FabricColorSwatches__filter-section-wrapper u-width--full">
          <div className="col-6_sm-12_md-6 FabricColorSwatches__filter-section u-center">
            <div className="FabricColorSwatches__filter-color-family u-mt--normal">
              <p className="u-mb--small u-bold">Filter by Color Family:</p>
              <div className="grid-12">
                {this.generateFabricColorGroupSelections()}
              </div>
            </div>
            { fabricGroupSelections.length > 1
              ? (
                <div className="FabricColorSwatches__filter-color-fabric u-mt--normal u-mb--normal">
                  <p className="u-mb--small u-bold">Filter by Fabric:</p>
                  {fabricGroupSelections}
                </div>
              )
              : null
            }

          </div>

        </div>

        <div className="FabricColorSwatches__color-swatch-results">
          { filteredDefaultFabrics.length
            ? (
              <div>
                <p className="u-mb--small textAlign--left u-bold">
                  Recommended Colors
                </p>
                <div className="grid-12">
                  { filteredDefaultFabrics.map(c => this.generateFabricSwatch(c, 0))}
                </div>
              </div>
            ) : null
          }

          { filteredSecondaryFabrics.length
            ? (
              <div>
                <p className="u-mb--small textAlign--left u-bold">
                  Additional Colors
                </p>
                <div className="u-mb--normal grid-12">
                  { filteredSecondaryFabrics.map(c =>
                    this.generateFabricSwatch(c, productSecondaryColorsCentsPrice))
                  }
                </div>
              </div>
            ) : null
          }

        </div>
      </div>
    );
  }
}

FabricColorSwatches.propTypes = {
  // Decorator Props
  breakpoint: PropTypes.string.isRequired,
  // Redux Props
  hasFabrics: PropTypes.bool.isRequired,
  fabricColorGroupSelections: PropTypes.arrayOf(PropTypes.number).isRequired,
  fabricGroupSelections: PropTypes.arrayOf(PropTypes.number).isRequired,
  // Redux Actions
  selectFabricColorGroup: PropTypes.func.isRequired,
  selectFabricGroup: PropTypes.func.isRequired,
  // Passed Props
  fabricGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  productGroupColors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
  productDefaultFabrics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    material: PropTypes.string,
    presentation: PropTypes.string,
    audPrice: PropTypes.string,
    usdPrice: PropTypes.string,
  })).isRequired,
  productSecondaryFabrics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    material: PropTypes.string,
    presentation: PropTypes.string,
    audPrice: PropTypes.string,
    usdPrice: PropTypes.string,
  })).isRequired,
  productSecondaryColorsCentsPrice: PropTypes.number.isRequired,
  temporaryColorId: PropTypes.number.isRequired,
  handleColorSelection: PropTypes.func.isRequired,
};

FabricColorSwatches.defaultProps = {};


export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(FabricColorSwatches));
