import React from 'react';

// CSS
import '../../../css/components/Footer.scss';


const Footer = () => (
  <footer className="Footer">
    <div className="layout-container grid-12">
      <div className="col-12">
        <h2>Sign up to always enjoy free returns</h2>
        <form>
          <input placeholder="Email Address" />
          <button>Sign up</button>
        </form>
      </div>
      <ul className="col-6">
        <li className="Footer__category-title">About</li>
        <li><a href="##">Why shop with us</a></li>
        <li><a href="##">About us</a></li>
        <li><a href="##">Fame Society</a></li>
        <li><a href="##">From our CEO</a></li>
        <li><a href="##">Privacy Policy</a></li>
        <li><a href="##">Terms</a></li>
      </ul>
      <ul className="col-6">
        <li
          className="Footer__category-title"
        >
          Help
        </li>
        <li><a href="##">Shipping Info</a></li>
        <li><a href="##">Returns Policy</a></li>
        <li><a href="##">Fame Contact Us</a></li>
        <li><a href="##">FAQs</a></li>
        <li><a href="##">Size Guide</a></li>
        <li><a href="##">Track My Order</a></li>
      </ul>
    </div>
  </footer>
);

export default Footer;
