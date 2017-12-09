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

class CurrentDressFitForm extends PureComponent {
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
          'CurrentDressFitForm__layout-container',
          containerClassNames,
        )}
      >
        <p className="h6 u-text-align-left u-mb-xs">
          How do fitted dresses in <strong>your size</strong> tend to fit?
        </p>
        <div className="CurrentDressFitForm__height u-mb-normal">
          <p
            className={classnames(
              'h6 u-mb-xs u-text-align--left',
              {
                'u-color-red': null,
              },
            )}
          >
            Your BUST?
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

        <div className="CurrentDressFitForm__height u-mb-normal">
          <p
            className={classnames(
              'h6 u-mb-xs u-text-align--left',
              {
                'u-color-red': null,
              },
            )}
          >
            Your Waist?
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

        <div className="CurrentDressFitForm__height u-mb-normal">
          <p
            className={classnames(
              'h6 u-mb-xs u-text-align--left',
              {
                'u-color-red': null,
              },
            )}
          >
            Your Hips?
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

CurrentDressFitForm.propTypes = {
  // Passed Props
  containerClassNames: PropTypes.string,
};

CurrentDressFitForm.defaultProps = {
  containerClassNames: 'u-mt-normal u-mb-huge',
};


export default connect(stateToProps, dispatchToProps)(CurrentDressFitForm);
