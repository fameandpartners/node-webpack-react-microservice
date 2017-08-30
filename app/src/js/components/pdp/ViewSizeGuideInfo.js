import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';

// CSS
import '../../../css/components/ViewSizeGuideInfo.scss';

/* eslint-disable react/prefer-stateless-function */
class ViewSizeGuideInfo extends PureComponent {
  render() {
    const {
      // className,
      sizeChart,
      centimeters,
    } = this.props;

    return (
      <table className="ViewSizeGuideInfo__table">
        <tbody>
          <tr>
            <td>US</td>
            {sizeChart.map(
              (item, key) =>
                <td key={`add-a-real-key-plz-${key}`}>
                  {item['Size US']}
                </td>,
            )}
          </tr>
          <tr>
            <td>AUS</td>
            {sizeChart.map(
              (item, key) =>
                <td key={`add-a-real-key-plz-${key}`}>
                  {item['Size Aus/UK']}
                </td>,
            )}
          </tr>
          <tr>
            <td>Bust</td>
            {sizeChart.map(
              (item, key) =>
                <td key={`add-a-real-key-plz-${key}`}>
                  {centimeters ? item['Bust cm'] : item['Bust Inches']}
                </td>,
            )}
          </tr>
          <tr>
            <td>Underbust</td>
            {sizeChart.map(
              (item, key) =>
                <td key={`add-a-real-key-plz-${key}`}>
                  {centimeters ? item['Underbust cm'] : item['Underbust Inches']}
                </td>,
            )}
          </tr>
          <tr>
            <td>Waist</td>
            {sizeChart.map(
              (item, key) =>
                <td key={`add-a-real-key-plz-${key}`}>
                  {centimeters ? item['Waist cm'] : item['Waist Inches']}
                </td>,
            )}
          </tr>
          <tr>
            <td>Hip</td>
            {sizeChart.map(
              (item, key) =>
                <td key={`add-a-real-key-plz-${key}`}>
                  {centimeters ? item['Hip cm'] : item['Hip Inches']}
                </td>,
            )}
          </tr>
          {/* sizeChart.map(
            (item, key) =>
              <tr key={`something-${key}`}>
                <td>US: {item['Size US']}</td>
                <td>AUS: {item['Size Aus/UK']}</td>
                <td>Bust: {item['Bust Inches']}</td>
                <td>Underbust: {item['Underbust Inches']}</td>
                <td>Waist: {item['Waist Inches']}</td>
                <td>Hip: {item['Hip Inches']}</td>
              </tr>,
          ) */}
        </tbody>
      </table>
    );
  }
}

ViewSizeGuideInfo.propTypes = {
  // className: PropTypes.string,
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
  // className: '',
  centimeters: false,
};

export default ViewSizeGuideInfo;
