/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { find } from 'lodash';

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
      isOpen: false,
    };
  }

  handleAlertClick() {
    this.setState({
      isOpen: true,
    });
    win.clearTimeout(fadeoutTimeoutId);
  }

  translateCustomziationCode(detailCode) {
    const { addonOptions } = this.props;
    const foundCustomization = find(addonOptions, { id: detailCode });

    return foundCustomization.description;
  }

  generateCustomizationMessages() {
    const { $$lastUndoTemporaryCustomizationDetails } = this.props;
    return $$lastUndoTemporaryCustomizationDetails.map(detailCode => (
      <p className="BDCustomizationUndoAlerter__undo-item">
        {this.translateCustomziationCode(detailCode)}
      </p>
    ));
  }

  removeAlert() {
    this.setState({
      isActive: false,
      isOpen: false,
    });
    win.clearTimeout(fadeoutTimeoutId);
  }

  handleUndoClick() {
    this.removeAlert();
    this.props.onUndoClick();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.$$lastUndoTemporaryCustomizationDetails.count() > 0 &&
      this.props.$$lastUndoTemporaryCustomizationDetails !== nextProps.$$lastUndoTemporaryCustomizationDetails
    ) {
      win.clearTimeout(fadeoutTimeoutId);
      this.setState({
        isActive: true,
      });
      fadeoutTimeoutId = win.setTimeout(() => {
        this.setState({
          isActive: false,
          isOpen: false,
        });
      }, 3000);
    } else if (nextProps.$$lastUndoTemporaryCustomizationDetails.count() === 0) {
      this.removeAlert();
    }
  }

  render() {
    const {
      className,
    } = this.props;

    const {
      isActive,
      isOpen,
    } = this.state;

    return (
      <div
        className={
          classnames(
            'BDCustomizationUndoAlerter',
            className,
          )
        }
      >
        {isOpen
          ? (
            <div className="BDCustomizationUndoAlerter__message-wrapper">
              <div className="BDCustomizationUndoAlerter__message u-text-align--left">
                <div className="BDCustomizationUndoAlerter__message-alert">
                  <AlertIcon
                    className="u-vertical-align--bottom"
                    width="20px"
                    height="20px"
                  />
                  <span className="u-bold u-uppercase u-ml--small u-mb--small">Removed</span>
                </div>
                <div className="BDCustomizationUndoAlerter__message-container">
                  {this.generateCustomizationMessages()}
                  <span
                    className="link u-mt--small"
                    onClick={this.handleUndoClick}
                  >
                    Undo
                  </span>
                </div>
              </div>
            </div>
          ) : null
        }
        <div
          className={
            classnames(
              'BDCustomizationUndoAlerter__icon-wrapper',
              {
                'BDCustomizationUndoAlerter__icon-wrapper--active': isActive,
              },
            )
          }
        >
          <AlertIcon
            className="u-vertical-align--bottom"
            onClick={this.handleAlertClick}
            width="20px"
            height="20px"
          />
          <span
            className="link u-display--inline-block u-ml--small"
            onClick={this.handleUndoClick}
          >
            Undo
          </span>
        </div>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
BDCustomizationUndoAlerter.propTypes = {
  addonOptions: PropTypes.array.isRequired,
  className: PropTypes.string,
  $$lastUndoTemporaryCustomizationDetails: PropTypes.array,
  // Funcs
  onUndoClick: PropTypes.func.isRequired,
};

BDCustomizationUndoAlerter.defaultProps = {
  className: '',
  $$lastUndoTemporaryCustomizationDetails: [],
};


export default BDCustomizationUndoAlerter;
