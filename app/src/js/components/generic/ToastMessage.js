import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../css/components/ToastMessage.scss';

class ToastMessage extends Component {
  constructor() {
    super();
    this.state = {
      toastVisible: true,
    };
  }
  componentDidMount() {
    const { closeTimeoutMS } = this.props;
    setTimeout(() => this.setState({ toastVisible: false }), closeTimeoutMS);
  }
  render() {
    const { message } = this.props;
    const { toastVisible } = this.state;
    return (
      <div className={toastVisible ? 'ToastMessage-triangle' : 'display--none '}>
        {message}
      </div>
    );
  }
}

export default ToastMessage;

ToastMessage.propTypes = {
  message: PropTypes.string,
  closeTimeoutMS: PropTypes.number,
};

ToastMessage.defaultProps = {
  message: '',
  closeTimeoutMS: 3000,
};
