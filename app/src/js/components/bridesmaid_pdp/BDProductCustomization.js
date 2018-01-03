import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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
      hasNavItems,
    } = this.props;

    return (
      <div className="BDProductCustomization u-height--full u-flex--col">
        <div className="BDProductCustomization__header">
          { hasNavItems
            ? (
              <div className="grid-12">
                <div className="col-1">
                  BDProductCustomizationNavigation
                </div>
              </div>
            )
            : null
          }
        </div>
        <div className="u-flex--1">
          <a href="https://placeholder.com">
            <img src="http://via.placeholder.com/600x600" alt="stupid" />
          </a>
        </div>
        <div
          className={classnames(
            [
              'BDProductCustomization__wrapper',
              'u-text-align--center u-flex--1',
            ],
        )}
        >

          <div className="grid-center-noGutter">
            <div
              className={classnames(
                'BDProductCustomization__content',
              )}
            >
              { children }
            </div>
          </div>
        </div>
        <div className="ButtonLedge--height">
          Fake Bottom
        </div>
      </div>
    );
  }
}

BDProductCustomization.propTypes = {
  // Normal Props
  children: PropTypes.node.isRequired,
  hasNavItems: PropTypes.bool,
  // productCustomizationDrawer: PropTypes.string,
  // handleDrawerSelection: PropTypes.func.isRequired,
};

BDProductCustomization.defaultProps = {
  hasNavItems: true,
  // productCustomizationDrawer: null,
};


export default BDProductCustomization;
