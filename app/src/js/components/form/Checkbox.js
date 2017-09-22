import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// CSS
import '../../../css/components/Checkbox.scss';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { onChange, id } = this.props;
    onChange({ id, value: e.target.value });
  }

  render() {
    const {
      id,
      label,
      wrapperClassName,
      disabled,
      showChecked,
    } = this.props;
    return (
      <div
        className={classnames(
          'Checkbox__wrapper',
          wrapperClassName,
        )}
      >
        <input
          className="Checkbox"
          id={id}
          type="checkbox"
          checked={!disabled && showChecked}
          onChange={this.handleChange}
          disabled={disabled}
          defaultChecked={showChecked}
        />
        <label htmlFor={id}>
          {
            label
            ? <span className="u-vertical-align-middle">{label}</span>
            : null
          }
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  wrapperClassName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  showChecked: PropTypes.bool,
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  label: null,
  wrapperClassName: '',
  showChecked: false,
  disabled: false,
};

export default Checkbox;
