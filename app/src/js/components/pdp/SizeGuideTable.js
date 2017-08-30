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
      hoverIndex: 4,
    };
  }

  render() {
    const {
      sizeChart,
      centimeters,
    } = this.props;

    const {
      hoverIndex,
    } = this.state;

    return (
      <div className="SizeGuideTable">
        <div className="SizeGuideTable__column">
          <SizeGuideTableCell
            contents="US"
            hoverIndex={hoverIndex}
            columnIndex={0}
            rowIndex={0}
          />
          <SizeGuideTableCell
            contents="AU"
            hoverIndex={hoverIndex}
            columnIndex={0}
            rowIndex={1}
          />
          <SizeGuideTableCell
            contents="Bust"
            hoverIndex={hoverIndex}
            columnIndex={0}
            rowIndex={2}
          />
          <SizeGuideTableCell
            contents="Underbust"
            hoverIndex={hoverIndex}
            columnIndex={0}
            rowIndex={3}
          />
          <SizeGuideTableCell
            contents="Waist"
            hoverIndex={hoverIndex}
            columnIndex={0}
            rowIndex={4}
          />
          <SizeGuideTableCell
            contents="Hip"
            hoverIndex={hoverIndex}
            columnIndex={0}
            rowIndex={5}
          />
        </div>
        {sizeChart.map(
          (item, key) =>
            <div key={`replace-with-actual-key-${key}`}>
              <div className="SizeGuideTable__column">
                <SizeGuideTableCell
                  contents={item['Size US']}
                  hoverIndex={hoverIndex}
                  columnIndex={key}
                  rowIndex={0}
                />
                <SizeGuideTableCell
                  contents={item['Size Aus/UK']}
                  hoverIndex={hoverIndex}
                  columnIndex={key}
                  rowIndex={1}
                />
                <SizeGuideTableCell
                  contents={centimeters ? item['Bust cm'] : item['Bust Inches']}
                  hoverIndex={hoverIndex}
                  columnIndex={key}
                  rowIndex={2}
                />
                <SizeGuideTableCell
                  contents={centimeters ? item['Underbust cm'] : item['Underbust Inches']}
                  hoverIndex={hoverIndex}
                  columnIndex={key}
                  rowIndex={3}
                />
                <SizeGuideTableCell
                  contents={centimeters ? item['Waist cm'] : item['Waist Inches']}
                  hoverIndex={hoverIndex}
                  columnIndex={key}
                  rowIndex={4}
                />
                <SizeGuideTableCell
                  contents={centimeters ? item['Hip cm'] : item['Hip Inches']}
                  hoverIndex={hoverIndex}
                  columnIndex={key}
                  rowIndex={5}
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
