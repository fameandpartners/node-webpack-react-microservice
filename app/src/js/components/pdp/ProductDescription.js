import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import objnoop from '../../libs/objnoop';
// import { bindActionCreators } from 'redux';

// Breakpoint Decoration
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';
// Actions
// import * as AppActions from '../../actions/AppActions';

// CSS
import '../../../css/components/ProductDescription.scss';


function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return {
    productDescription: state.$$productState.get('productDescription'),
    modelDescription: state.$$productState.get('modelDescription'),
    deliveryCopy: state.$$productState.get('deliveryCopy'),
    expressMakingSelected: state.$$customizationState.get('expressMakingSelected'),
  };
}


class ProductDescription extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  generateDeliveryCopy() {
    const { deliveryCopy, expressMakingSelected } = this.props;
    return expressMakingSelected ? '4-6 business days' : deliveryCopy;
  }

  render() {
    const { productDescription, modelDescription, deliveryCopy, breakpoint } = this.props;
    return (
      <div className="u-center">
        <p className="ProductCharity__message">
          $5 of each sale is donated to UN Women and Plan International&nbsp;
          <a
            className="link link--static"
            href="/iequalchange"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        </p>
        {
          deliveryCopy && (breakpoint === 'mobile' || breakpoint === 'tablet')
            ? <p className="u-mt-small ProductDescription__shippingEstimate">
                Shipping and returns are free. Estimated <br />
              delivery {this.generateDeliveryCopy()}. &nbsp;
                <a
                  href="/faqs#collapse-what-express-making"
                  target="_blank"
                  className="link link--static"
                  rel="noopener noreferrer"
                >Learn more</a>
            </p>
            : null
        }
        <div className="ProductDescription u-center">
          <p dangerouslySetInnerHTML={{ __html: productDescription }} />
          <p>-</p>
          <p dangerouslySetInnerHTML={{ __html: modelDescription }} />
        </div>
      </div>
    );
  }
}

ProductDescription.propTypes = {
  productDescription: PropTypes.string.isRequired,
  modelDescription: PropTypes.string.isRequired,
  deliveryCopy: PropTypes.string,
  expressMakingSelected: PropTypes.bool,
  breakpoint: PropTypes.string,
};

ProductDescription.defaultProps = {
  deliveryCopy: null,
  expressMakingSelected: false,
  breakpoint: '',
};

export default Resize(PDPBreakpoints)(connect(stateToProps, objnoop)(ProductDescription));
