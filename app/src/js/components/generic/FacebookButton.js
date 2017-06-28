/* eslint-disable react/prefer-stateless-function */
// Component:Presentational
import React, { Component } from 'react';
import { string } from 'prop-types';
import autoBind from 'react-autobind';

// Utilities
import { reassignProps } from '../../utilities/props';

// Components
import Button from './Button';

class FacebookButton extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleClick() {
    console.log('handling facebook click');
  }

  render() {
    const props = reassignProps(
      this.props,
      {
        className: `Button--facebook ${this.props.className}`,
        handleClick: this.handleClick,
      },
    );


    return (
      <div
        className="FacebookButton"
      >
        <Button
          text="Sign up with Facebook"
          {...props}
        />
      </div>
    );
  }
}

FacebookButton.propTypes = {
  className: string,
};

FacebookButton.defaultProps = {
  className: '',
};


export default FacebookButton;
