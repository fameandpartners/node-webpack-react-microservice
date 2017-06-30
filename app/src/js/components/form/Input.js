// *****
// ** Input is a purely functional dumb/stateless component
// *****
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from '../../libs/noop';

// CSS
import '../../../css/components/Input.scss';

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
      error,
      label,
      inlineMeta,
      placeholder,
      type,
      wrapperClassName,
    } = this.props;

    return (
      <div
        className={classNames(
          'Input--wrapper',
          wrapperClassName,
          {
            'Input--wrapper__error': error,
          },
        )}
      >
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
        {inlineMeta
          ? <span className="Input-label">{inlineMeta}</span>
          : null
        }
      </div>
    );
  }
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  error: PropTypes.bool,
  focusOnMount: PropTypes.bool,
  inlineMeta: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.instanceOf(null),
  ]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  wrapperClassName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  defaultValue: '',
  error: false,
  focusOnMount: false,
  inlineMeta: null,
  label: null,
  placeholder: '',
  type: 'input',
  wrapperClassName: '',
  onChange: noop,
};

export default Input;
