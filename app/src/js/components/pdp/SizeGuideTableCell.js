import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
class SizeGuideTableCell extends PureComponent {
  render() {
    const {
      contents,
    } = this.props;

    return (
      <div className="SizeGuideTable__cell">
        {contents}
      </div>
    );
  }
}

SizeGuideTableCell.propTypes = {
  contents: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

SizeGuideTableCell.defaultProps = {
  contents: '',
};

export default SizeGuideTableCell;
