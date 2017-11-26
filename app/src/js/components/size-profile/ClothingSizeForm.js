import React, { PureComponent } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { find } from 'lodash';
import classnames from 'classnames';

// Actions
// import CustomizationActions from '../../actions/CustomizationActions';

// UI Components
import Input from '../form/Input';

// CSS
import '../../../css/components/StandardSizeForm.scss';

function stateToProps() {
  return {
  };
}

function dispatchToProps() {
  return {
  };
}

class ClothingSizeForm extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const {
      containerClassNames,
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
                type="number"
                inlineMeta=""
                onChange={this.handleCMChange}
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
            What's your jeans waist size (inches)
          </p>
          <div className="grid-noGutter">
            <div className="col-10">
              <Input
                id="height-option-cm"
                type="number"
                inlineMeta=""
                onChange={this.handleCMChange}
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
};

ClothingSizeForm.defaultProps = {
  containerClassNames: 'u-mt-normal u-mb-huge',
};


export default connect(stateToProps, dispatchToProps)(ClothingSizeForm);
