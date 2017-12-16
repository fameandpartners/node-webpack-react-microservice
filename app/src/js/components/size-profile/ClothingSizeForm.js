import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

// Constants
import {
  JEAN_SIZES,
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
  };
}

function dispatchToProps(dispatch) {
  const {
    updateJeanSelection,
    updateBraSelection,
  } = bindActionCreators(SizeProfileActions, dispatch);

  return {
    updateJeanSelection,
    updateBraSelection,
  };
}

class ClothingSizeForm extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
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
  }

  handleBraChange({ value }) {
    this.props.updateBraSelection({ temporaryBraSize: String(value) });
  }

  render() {
    const {
      containerClassNames,
      temporaryJeanSize,
      temporaryBraSize,
    } = this.props;

    return (
      <div
        className={classnames(
          'ClothingSizeForm__layout-container',
          containerClassNames,
        )}
      >
        <div className="ClothingSizeForm__height u-mb-normal">
          <p
            className={classnames(
              'h6 u-mb-xs u-text-align--left',
              {
                'u-color-red': null,
              },
            )}
          >
            What's your current everyday bra size?
          </p>
          <div className="grid-noGutter">
            <div className="col-10">
              <Input
                id="height-option-cm"
                type="text"
                defaultValue={temporaryBraSize}
                inlineMeta=""
                onChange={this.handleBraChange}
              />
            </div>
          </div>
        </div>

        <div className="ClothingSizeForm__height u-mb-normal">
          <p
            className={classnames(
              'h6 u-mb-xs u-text-align--left',
              {
                'u-color-red': null,
              },
            )}
          >
            What&rsquo;s your jeans waist size (inches)
          </p>
          <div className="grid-noGutter">
            <div className="col-10">
              <Select
                id="jean-option-in"
                className="sort-options"
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
  // Redux Props
  temporaryJeanSize: PropTypes.number,
  temporaryBraSize: PropTypes.string,
  // Redux Actions
  updateJeanSelection: PropTypes.func.isRequired,
  updateBraSelection: PropTypes.func.isRequired,
};

ClothingSizeForm.defaultProps = {
  containerClassNames: 'u-mt-normal u-mb-huge',
  temporaryJeanSize: null,
  temporaryBraSize: null,
};


export default connect(stateToProps, dispatchToProps)(ClothingSizeForm);
