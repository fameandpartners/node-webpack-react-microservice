import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import autobind from 'react-autobind';

/* eslint-disable react/prefer-stateless-function */
class SizeGuideTableCell extends PureComponent {
  constructor(props) {
    super(props);
    autobind(this);
  }

  updateCoordinates() {
    console.log(`Column: ${this.props.columnIndex}, Row: ${this.props.rowIndex}`);
    this.props.hovered(this.props.columnIndex, this.props.rowIndex);
  }

  render() {
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
        'SizeGuideTable__cell--active': (hoverCoordinates.hoverColumn === columnIndex) || (hoverCoordinates.hoverRow === rowIndex),
        'SizeGuideTable__cell--current': (hoverCoordinates.hoverColumn === columnIndex) && (hoverCoordinates.hoverRow === rowIndex),
      },
    );

    return (
      <div
        className={cellClasses}
        onMouseOver={this.updateCoordinates}
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
    hoverColumn: PropTypes.number,
    hoverRow: PropTypes.number,
  }),
  // should be required, temporarily not
  columnIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  hovered: PropTypes.func,
};

SizeGuideTableCell.defaultProps = {
  contents: '',
  // temp. obv. non-index value assigned
  hoverCoordinates: {
    hoverColumn: -1,
    hoverRow: -1,
  },
  columnIndex: null,
  rowIndex: -2,
  hovered: null,
};

export default SizeGuideTableCell;
