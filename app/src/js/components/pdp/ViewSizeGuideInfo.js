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
      <div className="ViewSizeGuideInfo__table">
        <div className="ViewSizeGuideInfo__table-column">
          <div className="ViewSizeGuideInfo__table-cell">
            US
          </div>
          <div className="ViewSizeGuideInfo__table-cell">
            AU
          </div>
          <div className="ViewSizeGuideInfo__table-cell">
            Bust
          </div>
          <div className="ViewSizeGuideInfo__table-cell">
            Underbust
          </div>
          <div className="ViewSizeGuideInfo__table-cell">
            Waist
          </div>
          <div className="ViewSizeGuideInfo__table-cell">
            Hip
          </div>
        </div>
        {sizeChart.map(
          (item, key) =>
            <div key={`replace-with-actual-key-${key}`}>
              <div className="ViewSizeGuideInfo__table-column">
                <div className="ViewSizeGuideInfo__table-cell">
                  {item['Size US']}
                </div>
                <div className="ViewSizeGuideInfo__table-cell">
                  {item['Size Aus/UK']}
                </div>
                <div className="ViewSizeGuideInfo__table-cell">
                  {centimeters ? item['Bust cm'] : item['Bust Inches']}
                </div>
                <div className="ViewSizeGuideInfo__table-cell">
                  {centimeters ? item['Underbust cm'] : item['Underbust Inches']}
                </div>
                <div className="ViewSizeGuideInfo__table-cell">
                  {centimeters ? item['Waist cm'] : item['Waist Inches']}
                </div>
                <div className="ViewSizeGuideInfo__table-cell">
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
