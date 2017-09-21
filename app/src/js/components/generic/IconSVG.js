import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function stateToProps(state) {
  return {
    svgSpriteDirectory: state.$$appState.get('svgSpriteDirectory'),
  };
}

/* eslint-disable react/prefer-stateless-function */
class IconSVG extends PureComponent {
  render() {
    const {
      svgPath,
      svgSpriteDirectory,
      className,
      width,
      height,
    } = this.props;

    return (
      <svg
        style={{ width, height }}
        className={className}
      >
        <use xlinkHref={`${svgSpriteDirectory}${svgPath}`} />
      </svg>
    );
  }
}

IconSVG.propTypes = {
  svgPath: PropTypes.string,
  svgSpriteDirectory: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

IconSVG.defaultProps = {
  svgPath: '',
  className: '',
  width: '40px',
  height: '40px',
};

export default connect(stateToProps)(IconSVG);
