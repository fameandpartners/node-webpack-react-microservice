import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import classnames from 'classnames';
import { find } from 'lodash';
// import ReactHoverObserver from 'react-hover-observer';

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

  handleTabChange(clickedTab) {
    this.setState({
      selectedTabId: clickedTab,
    });
  }

  componentWillMount() {
    this.setState({
      // set initial tab on load
      selectedTabId: this.props.filters[0].id,
    });
  }

  generateHeaderNavigationContents() {
    const { selectedTabId } = this.state;
    const { filters } = this.props;

    return find(filters, { id: selectedTabId });
  }

  render() {
    const {
      filters,
      headingClasses,
      // contentClasses,
    } = this.props;

    const {
      selectedTabId,
    } = this.state;

    // const selectedTabObj = filters.filter(item => item.id === selectedTabId)[0];

    return (
      <div className="Tabs u-position--relative">
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
  // contentClasses: PropTypes.string,
};

BridesmaidsTabs.defaultProps = {
  headingClasses: '',
  contentClasses: '',
};

export default BridesmaidsTabs;
