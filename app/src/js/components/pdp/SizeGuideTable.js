import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

// Components
import SizeGuideTableCell from './SizeGuideTableCell';

// CSS
import '../../../css/components/SizeGuideTable.scss';

/* eslint-disable react/prefer-stateless-function */
class SizeGuideTable extends PureComponent {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      hoverCoordinates: {
        hoverColumn: 5,
        hoverRow: 4,
      },
    };
  }

  handleHover(x, y) {
    this.setState({
      hoverCoordinates: {
        hoverColumn: x,
        hoverRow: y,
      },
    });
  }

  render() {
    const {
      sizeChart,
      centimeters,
    } = this.props;

    const {
      hoverCoordinates,
    } = this.state;

    return (
      <div className="SizeGuideTable">
        <div className="SizeGuideTable__column">
          <SizeGuideTableCell
            contents="US"
            hoverCoordinates={hoverCoordinates}
            columnIndex={0}
            rowIndex={0}
            hovered={this.handleHover}
          />
          <SizeGuideTableCell
            contents="AU"
            hoverCoordinates={hoverCoordinates}
            columnIndex={0}
            rowIndex={1}
            hovered={this.handleHover}
          />
          <SizeGuideTableCell
            contents="Bust"
            hoverCoordinates={hoverCoordinates}
            columnIndex={0}
            rowIndex={2}
            hovered={this.handleHover}
          />
          <SizeGuideTableCell
            contents="Underbust"
            hoverCoordinates={hoverCoordinates}
            columnIndex={0}
            rowIndex={3}
            hovered={this.handleHover}
          />
          <SizeGuideTableCell
            contents="Waist"
            hoverCoordinates={hoverCoordinates}
            columnIndex={0}
            rowIndex={4}
            hovered={this.handleHover}
          />
          <SizeGuideTableCell
            contents="Hip"
            hoverCoordinates={hoverCoordinates}
            columnIndex={0}
            rowIndex={5}
            hovered={this.handleHover}
          />
        </div>
        {sizeChart.map(
          (item, key) =>
            <div key={`replace-with-actual-key-${key}`}>
              <div className="SizeGuideTable__column">
                <SizeGuideTableCell
                  contents={item['Size US']}
                  hoverCoordinates={hoverCoordinates}
                  columnIndex={key + 1}
                  rowIndex={0}
                  hovered={this.handleHover}
                />
                <SizeGuideTableCell
                  contents={item['Size Aus/UK']}
                  hoverCoordinates={hoverCoordinates}
                  columnIndex={key + 1}
                  rowIndex={1}
                  hovered={this.handleHover}
                />
                <SizeGuideTableCell
                  contents={centimeters ? item['Bust cm'] : item['Bust Inches']}
                  hoverCoordinates={hoverCoordinates}
                  columnIndex={key + 1}
                  rowIndex={2}
                  hovered={this.handleHover}
                />
                <SizeGuideTableCell
                  contents={centimeters ? item['Underbust cm'] : item['Underbust Inches']}
                  hoverCoordinates={hoverCoordinates}
                  columnIndex={key + 1}
                  rowIndex={3}
                  hovered={this.handleHover}
                />
                <SizeGuideTableCell
                  contents={centimeters ? item['Waist cm'] : item['Waist Inches']}
                  hoverCoordinates={hoverCoordinates}
                  columnIndex={key + 1}
                  rowIndex={4}
                  hovered={this.handleHover}
                />
                <SizeGuideTableCell
                  contents={centimeters ? item['Hip cm'] : item['Hip Inches']}
                  hoverCoordinates={hoverCoordinates}
                  columnIndex={key + 1}
                  rowIndex={5}
                  hovered={this.handleHover}
                />
              </div>
            </div>,
        )}
      </div>
    );
  }
}

SizeGuideTable.propTypes = {
  centimeters: PropTypes.bool,
  // Redux Properties
  sizeChart: PropTypes.arrayOf(PropTypes.shape({
    'Size Aus/UK': PropTypes.number,
    'Size US': PropTypes.number,
    'Bust cm': PropTypes.string,
    'Bust Inches': PropTypes.string,
    'Underbust cm': PropTypes.number,
    'Underbust Inches': PropTypes.string,
    'Waist cm': PropTypes.string,
    'Waist Inches': PropTypes.string,
    'Hip cm': PropTypes.string,
    'Hip Inches': PropTypes.string,
  })).isRequired,
};

SizeGuideTable.defaultProps = {
  centimeters: false,
};

export default SizeGuideTable;
