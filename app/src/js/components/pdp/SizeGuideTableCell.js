import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/* eslint-disable react/prefer-stateless-function */
class SizeGuideTableCell extends PureComponent {
  render() {
    /* eslint-disable no-unused-vars */
    const {
      contents,
      hoverIndex,
      columnIndex,
      rowIndex,
    } = this.props;

    const cellClasses = classnames(
      'SizeGuideTable__cell',
      {
        /* eslint-disable max-len */
        // TO-DO: clean-up (and better names, e.g. active == onCrossPath && current == currentlyHovered)
        'SizeGuideTable__cell--active': (hoverIndex === columnIndex) || (hoverIndex === rowIndex),
        'SizeGuideTable__cell--current': (hoverIndex === columnIndex) && (hoverIndex === rowIndex),
      },
    );

    return (
      <div
        className={cellClasses}
        onMouseOver={() => console.log(`Row: ${rowIndex}, Column: ${columnIndex}`)}
      >
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
  columnIndex: PropTypes.number,
  rowIndex: PropTypes.number,
};

SizeGuideTableCell.defaultProps = {
  contents: '',
  // temp. obv. non-index value assigned
  hoverIndex: -1,
  columnIndex: null,
  rowIndex: -2,
};

export default SizeGuideTableCell;
