import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import classnames from 'classnames';

// Utilities
import noop from '../../libs/noop';

// Breakpoint Decoration
import Resize from '../../decorators/Resize';
import PDPBreakpoints from '../../libs/PDPBreakpoints';

// UI
import Button from '../generic/Button';

// CSS
import '../../../css/components/SizeProfileButton.scss';

function stateToProps() {
  return {};
}

function dispatchToProps() {
  return {};
}


class SizeProfileButton extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  generateText() {
    return 'Size Profile';
  }

  render() {
    return (
      <Button
        tall
        uppercase={false}
        text={this.generateText()}
        handleClick={this.props.handleClick}
        className={classnames(
          'SizeProfile__button',
        )}
      />
    );
  }
}

/*  eslint-disable react/forbid-prop-types */
SizeProfileButton.propTypes = {
  // Passed Props
  handleClick: PropTypes.func,
};

SizeProfileButton.defaultProps = {
  handleClick: noop,
};

export default Resize(PDPBreakpoints)(connect(stateToProps, dispatchToProps)(SizeProfileButton));
