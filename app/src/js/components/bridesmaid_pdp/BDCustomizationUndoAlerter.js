/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Polyfills
import win from '../../polyfills/windowPolyfill';

// Components
import AlertIcon from '../../../svg/i-alert.svg';

import '../../../css/components/BDCustomizationUndoAlerter.scss';

let fadeoutTimeoutId = null;
class BDCustomizationUndoAlerter extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isActive: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lastUndoTemporaryCustomizationDetails !== nextProps.lastUndoTemporaryCustomizationDetails) {
      console.log('there was a change');
      win.clearTimeout(fadeoutTimeoutId);
      this.setState({
        isActive: true,
      });
      fadeoutTimeoutId = win.setTimeout(() => {
        this.setState({
          isActive: false,
        });
      }, 5000);
    }
  }

  render() {
    const {
      className,
    } = this.props;

    const {
      isActive,
    } = this.state;

    return (
      <div
        className={
        classnames(
          'BDCustomizationUndoAlerter',
          className,
          { 'BDCustomizationUndoAlerter--active': isActive },
        )
      }
      >
        <AlertIcon
          width="20px"
          height="20px"
        />
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
BDCustomizationUndoAlerter.propTypes = {
  className: PropTypes.string,
  lastUndoTemporaryCustomizationDetails: PropTypes.array,
};

BDCustomizationUndoAlerter.defaultProps = {
  className: '',
  lastUndoTemporaryCustomizationDetails: [],
};


export default BDCustomizationUndoAlerter;
