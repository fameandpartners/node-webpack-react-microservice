/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';


const SizeButton = props => (
  <div onClick={() => this.props.selectionCallback(this.props.size)} className={`size-box${this.props.selectedSize === this.props.size ? ' selected' : ''}`}>
    <div className="size-inner">{this.props.size}</div>
  </div>
  );

SizeButton.propTypes = {
  size: React.PropTypes.string.isRequired,
  selectedSize: React.PropTypes.string,
  selectionCallback: React.PropTypes.func.isRequired,
};


export default SizeButton;
