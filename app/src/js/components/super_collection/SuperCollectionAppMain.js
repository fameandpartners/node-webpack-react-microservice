/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import classnames from 'classnames';
// import { bindActionCreators } from 'redux';

// Decorators
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// Components
import Header from './Header';
import BodySection from './BodySection';
import Footer from './Footer';

// Actions
// import * as AppActions from '../../actions/AppActions';

// CSS
import '../../../css/components/App.scss';
import '../../../css/components/SuperCollection.scss';

function stateToProps(state) {
  const orderedSections = state.$$superCollectionState.get('$$orderedSections');
  return { orderedSections };
}

function dispatchToProps() {
  return {};
}

class SuperCollectionAppMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    autoBind(this);
  }

  render() {
    const { breakpoint, orderedSections } = this.props;
    const isMobileDisplay = breakpoint === 'mobile' || breakpoint === 'tablet';

    return (
      <div
        className={classnames(
          {
            mobile: isMobileDisplay,
          },
        )}
      >
        <Header />
        {orderedSections.map(
          (item, key) => (
            <BodySection
              key={key}
              data={item}
            />
          ),
        )}
        <Footer />
      </div>
    );
  }
}

SuperCollectionAppMain.propTypes = {
  breakpoint: PropTypes.string.isRequired,
  orderedSections: PropTypes.object.isRequired,
};

export default Resize(PDPBreakpoints)(
  connect(stateToProps, dispatchToProps)(SuperCollectionAppMain),
);
