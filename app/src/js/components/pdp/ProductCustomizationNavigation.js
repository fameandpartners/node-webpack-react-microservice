import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Constants
import {
  COLOR_CUSTOMIZE,
  STYLE_CUSTOMIZE,
  SIZE_CUSTOMIZE,
  COLOR_HEADLINE,
  STYLE_HEADLINE,
  SIZE_HEADLINE,
} from '../../constants/CustomizationConstants';

// CSS
import '../../../css/components/ProductCustomizationNavigation.scss';

class ProductCustomizationNavigation extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleDrawerSelection(drawerName) {
    return () => {
      this.props.handleDrawerSelection(drawerName);
    };
  }

  render() {
    const { colorHeadline, productCustomizationDrawer } = this.props;
    return (
      <div className="ProductCustomizationNavigation__nav">
        <div className="grid-middle u-height--full u-position--absolute">
          <ul className="ProductCustomizationNavigation__nav-list u-uppercase u-text-align-right">
            <li
              onClick={this.handleDrawerSelection(COLOR_CUSTOMIZE)}
              className="ProductCustomizationNavigation__nav-item u-cursor--pointer u-mb--big"
            >
              <span
                className={classnames(
                  'ProductCustomizationNavigation__nav-item-text',
                { 'ProductCustomizationNavigation__nav-item-text--active': productCustomizationDrawer === COLOR_CUSTOMIZE },
              )}
                dangerouslySetInnerHTML={{ __html: colorHeadline }}
              />
            </li>
            <li
              onClick={this.handleDrawerSelection(STYLE_CUSTOMIZE)}
              className="ProductCustomizationNavigation__nav-item u-cursor--pointer u-mb--big"
            >
              <span
                className={classnames(
                'ProductCustomizationNavigation__nav-item-text',
                { 'ProductCustomizationNavigation__nav-item-text--active': productCustomizationDrawer === STYLE_CUSTOMIZE },
              )}
              >{STYLE_HEADLINE}</span>
            </li>
            <li
              onClick={this.handleDrawerSelection(SIZE_CUSTOMIZE)}
              className="ProductCustomizationNavigation__nav-item u-cursor--pointer u-mb--big"
            >
              <span
                className={classnames(
                'ProductCustomizationNavigation__nav-item-text',
                { 'ProductCustomizationNavigation__nav-item-text--active': productCustomizationDrawer === SIZE_CUSTOMIZE },
              )}
              >{SIZE_HEADLINE}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

ProductCustomizationNavigation.propTypes = {
  colorHeadline: PropTypes.string,
  productCustomizationDrawer: PropTypes.string.isRequired,
  handleDrawerSelection: PropTypes.func.isRequired,
};

ProductCustomizationNavigation.defaultProps = {
  colorHeadline: COLOR_HEADLINE,
};


export default ProductCustomizationNavigation;
