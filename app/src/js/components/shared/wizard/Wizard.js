import React, { Component } from 'react';
import autoBind from 'react-autobind';

class Wizard extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <h1>Wizard</h1>
    );
  }
}

export default Wizard;
