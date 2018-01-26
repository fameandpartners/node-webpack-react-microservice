import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import classnames from 'classnames';
// import { bindActionCreators } from 'redux';

// Decorators
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

import BuyFabricSwatch from './BuyFabricSwatch';

// Actions
// import * as AppActions from '../../actions/AppActions';

// CSS
import '../../../css/components/App.scss';
import '../../../css/components/BuyFabricSwatch.scss';

function stateToProps() {
  // Which part of the Redux global state does our component want to receive as props?
  return {};
}

function dispatchToProps() {
  return {};
}

class SwatchAppMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    autoBind(this);
  }

  render() {
    const { breakpoint } = this.props;
    const isMobileDisplay = breakpoint === 'mobile' || breakpoint === 'tablet';

    return (
      <div
        className={classnames(
          {
            mobile: isMobileDisplay,
          },
        )}
      >
        <BuyFabricSwatch
          isMobileDisplay={isMobileDisplay}
        />
      </div>
    );
  }
}

SwatchAppMain.propTypes = {
  breakpoint: PropTypes.string.isRequired,
};

SwatchAppMain.defaultProps = {
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(SwatchAppMain));
