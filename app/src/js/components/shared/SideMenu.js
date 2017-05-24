import React, { PropTypes } from 'react';

// Components
import Hamburger from './Hamburger';

// CSS
import '../../../css/components/SideMenu.scss';

const SideMenu = ({ sideMenuOpen, handleCloseMenu }) => (
  <div className={`SideMenu ${sideMenuOpen ? 'SideMenu--open' : ''}`}>
    <Hamburger
      className="SideMenu__menu-btn position--absolute"
      isOpen
      handleClick={handleCloseMenu}
    />
    <div className="SideMenu__body position--relative">
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
      </ul>
    </div>
  </div>
  );

SideMenu.propTypes = {
  sideMenuOpen: PropTypes.bool,
  handleCloseMenu: PropTypes.func.isRequired,
};
SideMenu.defaultProps = {
  sideMenuOpen: false,
};
export default SideMenu;
