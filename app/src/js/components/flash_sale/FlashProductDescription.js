import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Constants
import ModalConstants from '../../constants/ModalConstants';

// Actions
import * as ModalActions from '../../actions/ModalActions';

// Breakpoint Decoration
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// Utilities
import { formatCents } from '../../utilities/accounting';
import { formatSizePresentationUS } from '../../utilities/helpers';

// CSS
import '../../../css/components/FlashProductDescription.scss';

function stateToProps() {

}

function dispatchToProps(dispatch) {
  const { activateModal } = bindActionCreators(ModalActions, dispatch);
  return {
    activateModal,
  };
}

class FlashProductDescription extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      customizations: [],
    };
  }

  calculateInstallment(divisor, currencySymbol) {
    return currencySymbol + (Number(this.calculateSubTotal('')) / divisor).toFixed(2);
  }

  generateFlashColorSwatch() {
    const { lineItem } = this.props;
    const value = lineItem.color_value;
    const hasPatternImage = value ? value.indexOf('.') > -1 : false;

    if (hasPatternImage) {
      return {
        backgroundImage: `url(${value})`,
      };
    }

    return {
      background: value,
    };
  }

  handleViewSizeGuideClick() {
    this.props.activateModal({ modalId: ModalConstants.SIZE_GUIDE_MODAL });
  }

  setCustomizations() {
    const { lineItem } = this.props;

    if (lineItem.customisations.length) {
      this.setState({
        customizations: lineItem.customisations,
      });
    }
  }

  componentWillMount() {
    this.setCustomizations();
  }

  render() {
    const { breakpoint, lineItem } = this.props;
    const presentation = lineItem.color_presentation;
    const { customizations } = this.state;

    return (
      <div className="FlashProductDescription typography u-center">
        <div className="grid-12 FlashProductDescription__title-section u-text-align--left">
          <h2 className="col-8_sm-12 FlashProductDescription__title u-display--inline-block">
            {lineItem.name}
            <br />
            {presentation}, Size {formatSizePresentationUS(lineItem.size)}
          </h2>

          <div
            className={classnames(
              'col-4_sm-12 FlashProductDescription__price u-display--inline-block',
              {
                'u-text-align--right': !(breakpoint === 'mobile' || breakpoint === 'tablet'),
                'u-text-align--left': (breakpoint === 'mobile' || breakpoint === 'tablet'),
              },
            )}
          >
            <span className="FlashProductDescription__old-price u-text-decoration--line-through">
              {formatCents(lineItem.original_price * 100, 0)}
            </span>
            <span className="FlashProductDescription__current-price">
              {formatCents(lineItem.current_price * 100, 0)}
            </span>
          </div>
        </div>

        <p className="FlashProductDescription__description u-mt-normal">
          {lineItem.description}
        </p>

        <div className="FlashProductDescription__customization-details u-mt-normal">
          { customizations.length ?
            (
              <div className="FlashProductDescription__addons-details">
                <h5 className="FlashProductDescription__addons-header">
                  Customizations (Not featured):
                </h5>
                <ul className="FlashProductDescription__addons-list">
                  {customizations.map((c, i) => <li key={`cust-${i}`}>{c}</li>)}
                </ul>
              </div>
            ) : null
          }
          <p>Size: {formatSizePresentationUS(lineItem.size)}&nbsp;
            <span
              className="link"
              onClick={this.handleViewSizeGuideClick}
            >
              Size Guide
            </span>
          </p>
          <p>Height: {lineItem.height}</p>
          <p>Color: {presentation}</p>
          <div
            style={this.generateFlashColorSwatch()}
            className="FlashProductDescription__color-swatch"
          />
        </div>
      </div>
    );
  }
}

FlashProductDescription.propTypes = {
  breakpoint: PropTypes.string.isRequired,
  // eslint-disable-next-line
  lineItem: PropTypes.object.isRequired,
  // Redux Actions
  activateModal: PropTypes.func.isRequired,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(FlashProductDescription));
