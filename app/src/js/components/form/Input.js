// *****
// ** Input is a purely functional dumb/stateless component
// *****
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from '../../libs/noop';

// CSS
import '../../../css/components/Input.scss';

const propTypes = {
  id: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  error: PropTypes.bool,
  focusOnMount: PropTypes.bool,
  inlineUnit: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(null),
  ]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  defaultValue: '',
  error: false,
  focusOnMount: false,
  inlineUnit: null,
  label: null,
  placeholder: '',
  type: 'input',
  onChange: noop,
};

class Input extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { onChange, id } = this.props;
    onChange({ id, value: e.target.value });
  }

  componentDidMount() {
    if (this.props.focusOnMount) this.input.focus();
  }

  render() {
    const {
      id,
      defaultValue,
      label,
      inlineUnit,
      placeholder,
      type,
      error,
    } = this.props;

    return (
      <div className={`Input--wrapper ${error ? 'Input--wrapper__error' : ''}`}>
        { label
          ? <label htmlFor={id}>{label}</label>
          : null
        }
        <input
          ref={c => this.input = c}
          className="Input"
          id={id}
          onChange={this.handleChange}
          placeholder={placeholder}
          type={type}
          defaultValue={defaultValue}
        />
        {inlineUnit
          ? <span className="Input-label">{inlineUnit}</span>
          : null
        }
      </div>
    );
  }
}


Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
