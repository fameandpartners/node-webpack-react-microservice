import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import classnames from 'classnames';
import { find } from 'lodash';

// Components
import HeaderNavigation from '../shared/header/HeaderNavigation';

// CSS
import '../../../css/components/Tabs.scss';

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

    // const selectedTabObj = filters.filter(item => item.id === selectedTabId)[0];

    return (
      <div className="Tabs u-position--relative u-width--full">
        <div
          className={classnames(
            headingClasses,
          )}
        >
          <ul className="Tabs__list">
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
                  {item.heading}
                </li>,
            )}
          </ul>
        </div>
        <HeaderNavigation
          isActive={isHovering && selectedTabId}
          openNavItem={selectedTabId}
          handleAnimationEnd={this.handleAnimationEnd}
          generateHeaderNavigationContents={this.generateHeaderNavigationContents}
        />
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
