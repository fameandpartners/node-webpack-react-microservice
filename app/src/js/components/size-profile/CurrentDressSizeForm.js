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
import CustomizationActions from '../../actions/CustomizationActions';

// UI Components
import Button from '../generic/Button';

// CSS
// import '../../../css/components/SelectFittedDressSizeForm.scss';

function stateToProps(state) {
  return {
    temporaryDressSize: state.$$customizationState.get('temporaryDressSize'),
    sizeError: state.$$customizationState.get('sizeError'),
  };
}

function dispatchToProps(dispatch) {
  const {
    setSizeProfileError,
    updateDressSizeSelection,
  } = bindActionCreators(CustomizationActions, dispatch);

  return {
    setSizeProfileError,
    updateDressSizeSelection,
  };
}

class CurrentDressSizeForm extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleDressSizeSelection(s) {
    return () => {
      this.props.updateDressSizeSelection({ temporaryDressSize: s });
    };
  }

  render() {
    const {
      temporaryDressSize,
      sizeError,
      containerClassNames,
    } = this.props;

    return (
      <div
        className={classnames(
          'SelectFittedDressSizeForm__layout-container',
          containerClassNames,
        )}
      >
        <div>
          <p className="h6 u-text-align-left u-mb-xs">What&apos;s your size?</p>
          <div className="CurrentDressSizeForm__size grid-12-spaceBetween">
            { US_SIZES.map(s => (
              <div key={s} className="col-3">
                <Button
                  tertiary
                  tall
                  selected={s === temporaryDressSize}
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
  temporaryDressSize: PropTypes.number,
  sizeError: PropTypes.bool,
  // Redux Actions
  updateDressSizeSelection: PropTypes.func.isRequired,
};

CurrentDressSizeForm.defaultProps = {
  containerClassNames: 'u-mt-normal u-mb-huge',
  temporaryDressSize: null,
  sizeError: false,
};


export default connect(stateToProps, dispatchToProps)(CurrentDressSizeForm);
