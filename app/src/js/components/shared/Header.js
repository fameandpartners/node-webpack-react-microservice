import React from 'react';
import logo from '../../../img/fame-logo.svg';
import '../../../css/components/Header.css';

const Header = (props) => {
  return (
    <header className="Header">
      <object className='Header-logo' data={logo} type="image/svg+xml">
        { /* <img src="yourfallback.jpg" /> */}
      </object>
      <nav>
        <ul>
          <li><a href="#">Shoe All</a></li>
          <li><a href="#">The Wedding Shop</a></li>
          <li><a href="#">The Evening Shop</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
