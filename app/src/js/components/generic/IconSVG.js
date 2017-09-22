import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function stateToProps(state) {
  return {
    svgSpritePath: state.$$appState.get('svgSpritePath'),
  };
}

/* eslint-disable react/prefer-stateless-function */
class IconSVG extends PureComponent {
  generateXLinkHref() {
    const {
      svgPath,
      svgSpritePath,
      svgId,
    } = this.props;

    if (svgSpritePath) {
      return `${svgSpritePath}#${svgId}`;
    }

    return svgPath;
  }

  render() {
    const {
      className,
      width,
      height,
    } = this.props;

    return (
      <svg
        style={{ width, height }}
        className={className}
      >
        <use xlinkHref={this.generateXLinkHref()} />
      </svg>
    );
  }
}

IconSVG.propTypes = {
  svgId: PropTypes.string,
  svgPath: PropTypes.string,
  svgSpritePath: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

IconSVG.defaultProps = {
  svgId: '',
  svgPath: '',
  className: '',
  width: '40px',
  height: '40px',
};

export default connect(stateToProps)(IconSVG);
