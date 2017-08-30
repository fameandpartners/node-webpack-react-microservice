import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Components
import SizeGuideTableCell from './SizeGuideTableCell';

// CSS
import '../../../css/components/SizeGuideTable.scss';

/* eslint-disable react/prefer-stateless-function */
class SizeGuideTable extends PureComponent {
  render() {
    const {
      sizeChart,
      centimeters,
    } = this.props;

    return (
      <div className="SizeGuideTable">
        <div className="SizeGuideTable__column">
          <SizeGuideTableCell
            contents="US"
          />
          <SizeGuideTableCell
            contents="AU"
          />
          <SizeGuideTableCell
            contents="Bust"
          />
          <SizeGuideTableCell
            contents="Underbust"
          />
          <SizeGuideTableCell
            contents="Waist"
          />
          <SizeGuideTableCell
            contents="Hip"
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
