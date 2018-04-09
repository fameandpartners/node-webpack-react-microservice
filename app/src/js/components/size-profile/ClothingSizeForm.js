import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

// Constants
import {
  JEAN_SIZES,
  BRA_CUP_SIZES,
  BRA_BUST_SIZES,
} from '../../constants/ProductConstants';

// Actions
import SizeProfileActions from '../../actions/SizeProfileActions';

// UI Components
import Input from '../form/Input';
import Select from '../form/Select';

// CSS
import '../../../css/components/StandardSizeForm.scss';

function stateToProps(state) {
  return {
    temporaryJeanSize: state.$$sizeProfileState.get('temporaryJeanSize'),
    temporaryBraSize: state.$$sizeProfileState.get('temporaryBraSize'),
    jeanSizeError: state.$$sizeProfileState.get('jeanSizeError'),
    braSizeError: state.$$sizeProfileState.get('braSizeError'),
  };
}

function dispatchToProps(dispatch) {
  const {
    setClothingSizeError,
    updateJeanSelection,
    updateBraSelection,
  } = bindActionCreators(SizeProfileActions, dispatch);

  return {
    setClothingSizeError,
    updateJeanSelection,
    updateBraSelection,
  };
}

class ClothingSizeForm extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.validationHandler(this);
  }

  componentWillUnmount() {
    this.props.validationHandler(undefined);
  }

  generateJeanOptions(selected) {
    return JEAN_SIZES.map(i => ({
      id: i,
      name: i,
      meta: i,
      active: i === selected,
    }));
  }

  handleJeanChange(value) {
    this.props.updateJeanSelection({ temporaryJeanSize: value.option.id });
    this.props.setClothingSizeError({
      jeanSizeError: false,
      braSizeError: this.props.braSizeError,
    });
  }

  handleBraChange({ value }) {
    this.props.updateBraSelection({ temporaryBraSize: String(value) });
    this.props.setClothingSizeError({
      braSizeError: false,
      jeanSizeError: this.props.jeanSizeError,
    });
  }

  isValid() {
    const { setClothingSizeError, temporaryBraSize, temporaryJeanSize } = this.props;
    const errors = { braSizeError: false, jeanSizeError: false };
    let isValid = true;
    if (!temporaryBraSize) {
      isValid = false;
      errors.braSizeError = true;
    } else {
      const regex = /^(\d+)(\w+)$/gi;
      const match = regex.exec(temporaryBraSize.replace(/ /g, ''));
      const bust = parseInt(match[1], 10);
      const cup = String((match[2] || '').toUpperCase());
      if (!BRA_BUST_SIZES.includes(bust) || !BRA_CUP_SIZES.includes(cup)) {
        isValid = false;
        errors.braSizeError = true;
      }
    }
    if (!temporaryJeanSize) {
      isValid = false;
      errors.jeanSizeError = true;
    }
    setClothingSizeError(errors);
    return isValid;
  }

  render() {
    const {
      containerClassNames,
      temporaryJeanSize,
      temporaryBraSize,
      braSizeError,
      jeanSizeError,
      isMobile,
    } = this.props;

    return (
      <div
        className={classnames(
          'ClothingSizeForm__layout-container',
          containerClassNames,
        )}
      >
        <div className="ClothingSizeForm__height u-mb--normal">
          <p
            className={classnames(
              'h6 u-mb--xs u-text-align--left',
              {
                'u-color-red': braSizeError,
              },
            )}
          >
            What's your current everyday bra size?
          </p>
          <div className="grid-noGutter">
            <div
              className={classnames({
                'col-12': isMobile,
                'col-10': !isMobile,
              })}
            >
              <Input
                id="height-option-cm"
                type="text"
                defaultValue={temporaryBraSize}
                error={braSizeError}
                inlineMeta={braSizeError ? 'Please enter a valid bra size' : null}
                onChange={this.handleBraChange}
              />
            </div>
          </div>
        </div>

        <div className="ClothingSizeForm__height u-mb--normal">
          <p
            className={classnames(
              'h6 u-mb--xs u-text-align--left',
              {
                'u-color-red': jeanSizeError,
              },
            )}
          >
            What&rsquo;s your jeans waist size (inches)
          </p>
          <div className="grid-noGutter">
            <div
              className={classnames({
                'col-12': isMobile,
                'col-10': !isMobile,
              })}
            >
              <Select
                id="jean-option-in"
                className="sort-options"
                error={jeanSizeError}
                inlineMeta={jeanSizeError ? 'Please select your jean size' : null}
                options={this.generateJeanOptions(temporaryJeanSize)}
                onChange={this.handleJeanChange}
              />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

ClothingSizeForm.propTypes = {
  // Passed Props
  containerClassNames: PropTypes.string,
  validationHandler: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  // Redux Props
  temporaryJeanSize: PropTypes.number,
  temporaryBraSize: PropTypes.string,
  braSizeError: PropTypes.bool,
  jeanSizeError: PropTypes.bool,
  // Redux Actions
  setClothingSizeError: PropTypes.func.isRequired,
  updateJeanSelection: PropTypes.func.isRequired,
  updateBraSelection: PropTypes.func.isRequired,
};

ClothingSizeForm.defaultProps = {
  containerClassNames: 'u-mt--normal u-mb--huge',
  temporaryJeanSize: null,
  temporaryBraSize: null,
  braSizeError: false,
  jeanSizeError: false,
  isMobile: false,
};


export default connect(stateToProps, dispatchToProps)(ClothingSizeForm);
