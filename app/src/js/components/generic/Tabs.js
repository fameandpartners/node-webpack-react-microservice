import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
// import classnames from 'classnames';

// CSS
import '../../../css/components/Tabs.scss';

/* eslint-disable react/prefer-stateless-function */
class Tabs extends PureComponent {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      selectedTab: null,
    };
  }

  handleTabChange(clickedTab) {
    console.log(`Set Active Tab: ${clickedTab}`);

    this.setState({
      selectedTab: clickedTab,
    });
  }

  componentWillMount() {
    const firstTabID = this.props.content[0].id;

    this.setState({
      selectedTab: firstTabID,
    });
  }

  render() {
    const {
      content,
    } = this.props;

    const {
      selectedTab,
    } = this.state;

    return (
      <div className="Tabs">
        <pre>selectedTab: {selectedTab}</pre>
        <ul className="Tabs__headings">
          {content.map(
            (item, key) =>
              <li
                key={`use-a-real-key--${key}`}
                onClick={() => this.handleTabChange(item.id)}
                className={item.id === selectedTab ? 'Tabs__link Tabs__link--active' : 'Tabs__link'}
              >
                {item.heading}
              </li>,
          )}
        </ul>
        <div className="Tabs__contents">
          {content.map(
            (item, key) =>
              <div
                key={`use-a-real-key--${key}`}
                className={item.id === selectedTab ? 'Tabs__panel Tabs__panel--active' : 'Tabs__panel'}
              >
                {item.content}
              </div>,
          )}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Tabs;
