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
      // works (e.g. set to 2, now the fun part...)
      hoverIndex: null,
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
            myIndex={0}
          />
          <SizeGuideTableCell
            contents="AU"
            hoverIndex={hoverIndex}
            myIndex={1}
          />
          <SizeGuideTableCell
            contents="Bust"
            hoverIndex={hoverIndex}
            myIndex={2}
          />
          <SizeGuideTableCell
            contents="Underbust"
            hoverIndex={hoverIndex}
            myIndex={3}
          />
          <SizeGuideTableCell
            contents="Waist"
            hoverIndex={hoverIndex}
            myIndex={4}
          />
          <SizeGuideTableCell
            contents="Hip"
            hoverIndex={hoverIndex}
            myIndex={5}
          />
        </div>
        {sizeChart.map(
          (item, key) =>
            <div key={`replace-with-actual-key-${key}`}>
              <div className="SizeGuideTable__column">
                <SizeGuideTableCell
                  contents={item['Size US']}
                />
                <SizeGuideTableCell
                  contents={item['Size Aus/UK']}
                />
                <SizeGuideTableCell
                  contents={centimeters ? item['Bust cm'] : item['Bust Inches']}
                />
                <SizeGuideTableCell
                  contents={centimeters ? item['Underbust cm'] : item['Underbust Inches']}
                />
                <SizeGuideTableCell
                  contents={centimeters ? item['Waist cm'] : item['Waist Inches']}
                />
                <SizeGuideTableCell
                  contents={centimeters ? item['Hip cm'] : item['Hip Inches']}
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
