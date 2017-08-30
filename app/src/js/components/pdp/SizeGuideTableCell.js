import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/* eslint-disable react/prefer-stateless-function */
class SizeGuideTableCell extends PureComponent {
  render() {
    /* eslint-disable no-unused-vars */
    const {
      contents,
      hoverCoordinates,
      columnIndex,
      rowIndex,
    } = this.props;

    const cellClasses = classnames(
      'SizeGuideTable__cell',
      {
        /* eslint-disable max-len */
        // TO-DO: clean-up (and better names, e.g. active == onCrossPath && current == currentlyHovered)
        'SizeGuideTable__cell--active': (hoverCoordinates.hoverCol === columnIndex) || (hoverCoordinates.hoverRow === rowIndex),
        'SizeGuideTable__cell--current': (hoverCoordinates.hoverCol === columnIndex) && (hoverCoordinates.hoverRow === rowIndex),
      },
    );

    return (
      <div
        className={cellClasses}
        onMouseOver={() => console.log(`Column: ${columnIndex}, Row: ${rowIndex}`)}
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
  hoverCoordinates: PropTypes.shape({
    hoverCol: PropTypes.number,
    hoverRow: PropTypes.number,
  }),
  // should be required, temporarily not
  columnIndex: PropTypes.number,
  rowIndex: PropTypes.number,
};

SizeGuideTableCell.defaultProps = {
  contents: '',
  // temp. obv. non-index value assigned
  hoverCoordinates: {
    hoverCol: -1,
    hoverRow: -1,
  },
  columnIndex: null,
  rowIndex: -2,
};

export default SizeGuideTableCell;
