import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/* eslint-disable react/prefer-stateless-function */
class SizeGuideTableCell extends PureComponent {
  render() {
    const {
      contents,
      hoverIndex,
      myIndex,
    } = this.props;

    const cellClasses = classnames(
      'SizeGuideTable__cell',
      {
        'SizeGuideTable__cell--active': myIndex === hoverIndex,
      },
    );

    return (
      <div className={cellClasses}>
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
  hoverIndex: PropTypes.number,
  // should be required, temporarily not
  myIndex: PropTypes.number,
};

SizeGuideTableCell.defaultProps = {
  contents: '',
  // temp. obv. non-index value assigned
  hoverIndex: -1,
  myIndex: null,
};

export default SizeGuideTableCell;
