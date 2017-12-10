import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

// Constants
import {
  US_SIZES,
} from '../../constants/ProductConstants';

// Actions
import SizeProfileActions from '../../actions/SizeProfileActions';

// UI Components
import Button from '../generic/Button';

// CSS
import '../../../css/components/CurrentDressSizeForm.scss';

function stateToProps(state) {
  return {
    temporaryFittedDressSize: state.$$sizeProfileState.get('temporaryFittedDressSize'),
    sizeError: state.$$sizeProfileState.get('sizeError'),
  };
}

function dispatchToProps(dispatch) {
  const {
    setSizeProfileError,
    updateFittedDressSizeSelection,
  } = bindActionCreators(SizeProfileActions, dispatch);

  return {
    setSizeProfileError,
    updateFittedDressSizeSelection,
  };
}

class CurrentDressSizeForm extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleDressSizeSelection(s) {
    return () => {
      this.props.updateFittedDressSizeSelection({ temporaryFittedDressSize: s });
    };
  }

  render() {
    const {
      temporaryFittedDressSize,
      sizeError,
      containerClassNames,
    } = this.props;

    return (
      <div
        className={classnames(
          'CurrentDressSizeForm__layout-container',
          containerClassNames,
        )}
      >
        <div>
          <p className="h6 u-text-align-left u-mb-xs">
            In <strong>US sizes</strong>, what fitted dress size do you typically wear?
          </p>
          <div className="CurrentDressSizeForm__size grid-12-spaceBetween">
            { US_SIZES.map(s => (
              <div key={s} className="col-3">
                <Button
                  tertiary
                  tall
                  selected={s === temporaryFittedDressSize}
                  text={s}
                  handleClick={this.handleDressSizeSelection(s)}
                />
              </div>
            ))}
          </div>
          { sizeError ?
            <div className="CurrentDressSizeForm__size-error-text">
              <p className="p u-color-red u-text-align-left u-mb-small u-mt-small">
                Please select a size
              </p>
            </div>
            : null
          }
        </div>
      </div>
    );
  }
}

CurrentDressSizeForm.propTypes = {
  // Passed Props
  containerClassNames: PropTypes.string,
  // Redux Props
  temporaryFittedDressSize: PropTypes.number,
  sizeError: PropTypes.bool,
  // Redux Actions
  updateFittedDressSizeSelection: PropTypes.func.isRequired,
};

CurrentDressSizeForm.defaultProps = {
  containerClassNames: 'u-mt-normal u-mb-huge',
  temporaryFittedDressSize: null,
  sizeError: false,
};


export default connect(stateToProps, dispatchToProps)(CurrentDressSizeForm);
