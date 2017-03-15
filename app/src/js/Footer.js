import React from 'react';

const Footer = (props) => {
  return (
    <footer>
      <link rel="stylesheet" href={props.css} />
      <script async defer src={props.js} />
    </footer>
  );
}

export default Footer;
