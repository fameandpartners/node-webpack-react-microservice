import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

// CSS
import '../../../css/components/BDProductCustomization.scss';

// UI Components
// import BDProductCustomizationNavigation from './ProductCustomizationNavigation';

class BDProductCustomization extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const {
      children,
      // hasNavItems,
    } = this.props;

    return (
      <div className="BDProductCustomization u-height--full u-flex u-flex--col">

        <div className="grid-center u-flex u-flex--1">
          <a href="https://placeholder.com">
            <img className="u-height--full" src="http://via.placeholder.com/600x600" alt="stupid" />
          </a>
        </div>

        <div className="BDProductCustomization__wrapper u-text-align--center">
          <div className="BDProductCustomization__content u-height--full u-width--full">
            { children }
          </div>
        </div>
        <div className="ButtonLedge--height __fake__" />
      </div>
    );
  }
}

BDProductCustomization.propTypes = {
  // Normal Props
  children: PropTypes.node.isRequired,
  // hasNavItems: PropTypes.bool,
  // productCustomizationDrawer: PropTypes.string,
  // handleDrawerSelection: PropTypes.func.isRequired,
};

BDProductCustomization.defaultProps = {
  hasNavItems: true,
  // productCustomizationDrawer: null,
};


export default BDProductCustomization;

// <div className="BDProductCustomization__header">
//   { hasNavItems
//     ? (
//       <div className="grid-12">
//         <div className="col-1">
//           BDProductCustomizationNavigation
//         </div>
//       </div>
//     )
//     : null
//   }
// </div>
