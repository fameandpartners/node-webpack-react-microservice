import React from 'react';
import PropTypes from 'prop-types';
import '../../../css/components/Hamburger.scss';

const Hamburger = ({ className, isOpen, handleClick }) => (
  <div
    role="menu"
    className={`Hamburger ${className} ${isOpen ? 'Hamburger--is-open' : ''}`}
    onClick={handleClick}
  >
    <span />
    <span />
    <span />
    <span />
  </div>
  );

Hamburger.propTypes = {
  className: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};
Hamburger.defaultProps = {
  className: '',
  isOpen: false,
};
export default Hamburger;
