import React, { Component } from 'react';
import autoBind from 'react-autobind';

class CreateFitID extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    autoBind(this);
  }

  render() {
    return (
      <h1>CreateFitID</h1>
    );
  }
}

// CreateFitID.propTypes = {

// }

// CreateFitID.defaultProps = {

// }

export default CreateFitID;
