import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import classnames from 'classnames';
import { find } from 'lodash';

// Components
import HeaderNavigation from '../shared/header/HeaderNavigation';
import Caret from '../generic/Caret';

// CSS
import '../../../css/components/BridesmaidsTabs.scss';

/* eslint-disable react/prefer-stateless-function */
class BridesmaidsTabs extends PureComponent {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      selectedTabId: null,
    };
  }

  handleAnimationEnd() {
    this.setState({
      selectedTabId: null,
    });
  }

  handleTabChange(clickedTab) {
    this.setState({
      selectedTabId: clickedTab,
    });
  }

  generateHeaderNavigationContents() {
    const { selectedTabId } = this.state;
    const { filters } = this.props;

    const activeFilter = find(filters, { id: selectedTabId });
    return activeFilter ? activeFilter.content : null;
  }

  render() {
    const {
      filters,
      headingClasses,
      isHovering,
      // contentClasses,
    } = this.props;

    const {
      selectedTabId,
    } = this.state;

    return (
      <div className="Tabs layout-container u-position--relative u-width--full">
        <div
          className={classnames(
            headingClasses,
          )}
        >
          <ul className="Tabs__list grid-middle">
            {filters.map(
              item =>
                <li
                  key={item.id}
                  onClick={() => this.handleTabChange(item.id)}
                  className={classnames(
                    'Tabs__link',
                    {
                      'Tabs__link--active': item.id === selectedTabId,
                    },
                  )}
                >
                  <span className="u-mr--small">{item.heading}</span>
                  <span className="BridesmaidsTabs__caret-wrapper">
                    <Caret height="20px" width="12px" />
                  </span>
                </li>,
            )}
          </ul>
        </div>

        <div className="BridesmaidsTabs__navigation-container u-position--absolute u-mb--normal">
          <HeaderNavigation
            isActive={(isHovering && selectedTabId)}
            openNavItem={selectedTabId}
            handleAnimationEnd={this.handleAnimationEnd}
            generateHeaderNavigationContents={this.generateHeaderNavigationContents}
          />
        </div>
      </div>
    );
  }
}

BridesmaidsTabs.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    heading: PropTypes.string,
    content: PropTypes.shape({

    }),
  })).isRequired,
  headingClasses: PropTypes.string,
  isHovering: PropTypes.bool.isRequired,
  // contentClasses: PropTypes.string,
};

BridesmaidsTabs.defaultProps = {
  headingClasses: '',
  contentClasses: '',
};

export default BridesmaidsTabs;
