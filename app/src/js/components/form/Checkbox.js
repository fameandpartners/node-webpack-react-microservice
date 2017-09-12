import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from '../../libs/noop';

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
          onChange={this.handleChange}
          className="Checkbox"
          id={id}
          type="checkbox"
          defaultChecked={showChecked}
        />
        <label htmlFor={id}>
          <span className="u-vertical-align-middle">{label || ''}</span>
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  wrapperClassName: PropTypes.string,
  onChange: PropTypes.func,
  showChecked: PropTypes.bool,
};

Checkbox.defaultProps = {
  label: null,
  wrapperClassName: '',
  showChecked: false,
  onChange: noop,
};

export default Checkbox;
