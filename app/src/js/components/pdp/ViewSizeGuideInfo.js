import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// CSS
import '../../../css/components/ViewSizeGuideInfo.scss';

/* eslint-disable react/prefer-stateless-function */
class ViewSizeGuideInfo extends PureComponent {
  render() {
    const {
      sizeChart,
      centimeters,
    } = this.props;

    return (
      <div className="SizeGuideTable">
        <div className="SizeGuideTable__column">
          <div className="SizeGuideTable__cell">
            US
          </div>
          <div className="SizeGuideTable__cell">
            AU
          </div>
          <div className="SizeGuideTable__cell">
            Bust
          </div>
          <div className="SizeGuideTable__cell">
            Underbust
          </div>
          <div className="SizeGuideTable__cell">
            Waist
          </div>
          <div className="SizeGuideTable__cell">
            Hip
          </div>
        </div>
        {sizeChart.map(
          (item, key) =>
            <div key={`replace-with-actual-key-${key}`}>
              <div className="SizeGuideTable__column">
                <div className="SizeGuideTable__cell">
                  {item['Size US']}
                </div>
                <div className="SizeGuideTable__cell">
                  {item['Size Aus/UK']}
                </div>
                <div className="SizeGuideTable__cell">
                  {centimeters ? item['Bust cm'] : item['Bust Inches']}
                </div>
                <div className="SizeGuideTable__cell">
                  {centimeters ? item['Underbust cm'] : item['Underbust Inches']}
                </div>
                <div className="SizeGuideTable__cell">
                  {centimeters ? item['Waist cm'] : item['Waist Inches']}
                </div>
                <div className="SizeGuideTable__cell">
                  {centimeters ? item['Hip cm'] : item['Hip Inches']}
                </div>
              </div>
            </div>,
        )}
      </div>
    );
  }
}

ViewSizeGuideInfo.propTypes = {
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

ViewSizeGuideInfo.defaultProps = {
  centimeters: false,
};

export default ViewSizeGuideInfo;
