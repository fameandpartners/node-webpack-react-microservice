import React, { PropTypes } from 'react';
import '../../../css/components/Hamburger.scss';

const Hamburger = ({ isOpen, handleClick }) => (
  <div
    role="menu"
    className={`Hamburger ${isOpen ? 'Hamburger--is-open' : ''}`}
    onClick={handleClick}
  >
    <span />
    <span />
    <span />
    <span />
  </div>
  );

Hamburger.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};
Hamburger.defaultProps = {
  isOpen: false,
};
export default Hamburger;
