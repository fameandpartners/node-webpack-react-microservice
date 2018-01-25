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
      </div>
    );
  }
}

SuperCollectionAppMain.propTypes = {
  breakpoint: PropTypes.string.isRequired,
  orderedSections: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    sections: PropTypes.arrayOf(PropTypes.shape({
      img: PropTypes.string,
    })),
  })).isRequired,
};

SuperCollectionAppMain.defaultProps = {
  orderedSections: [],
};

export default Resize(PDPBreakpoints)(
  connect(stateToProps, dispatchToProps)(SuperCollectionAppMain),
);
