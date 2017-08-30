import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import classnames from 'classnames';

// CSS
import '../../../../css/components/WhoWeAreNavigation.scss';

// Constants
import { NAVIGATION_LINKS } from '../../../constants/AppConstants';

// Components
import NavLinkCol from './NavLinkCol';

class WhoWeAreNavigation extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      fadeIn: false,
    };
  }

  splitLinks(remainder) {
    return NAVIGATION_LINKS.WHO_WE_ARE.filter((l, i) => i % 2 === remainder);
  }

  /* eslint-disable react/no-did-mount-set-state */
  componentDidMount() {
    this.setState({ fadeIn: true });
  }

  render() {
    return (
      <div
        ref={this.props.childRef}
        className={classnames(
          'WhoWeAreNavigation u-width--full layout-container',
          { 'WhoWeAreNavigation--fade-in': this.state.fadeIn },
        )}
      >
        <div className="WhoWeAreNavigation__link-container u-center grid">
          <NavLinkCol
            links={this.splitLinks(1)}
          />
          <NavLinkCol
            links={this.splitLinks(0)}
          />
        </div>
      </div>
    );
  }
}

WhoWeAreNavigation.propTypes = {
  childRef: PropTypes.func.isRequired,
};

export default WhoWeAreNavigation;
