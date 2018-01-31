import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import classnames from 'classnames';

// CSS
import '../../../css/components/FadeIn.scss';

class FadeIn extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      fadeIn: false,
    };
  }

  /* eslint-disable react/no-did-mount-set-state */
  componentDidMount() {
    setTimeout(() => {
      this.setState({ fadeIn: true });
    });
  }

  render() {
    const { className } = this.props;
    return (
      <div
        className={classnames(
          'FadeIn',
          className,
          { 'FadeIn--fade-in': this.state.fadeIn },
        )}
      >
        {this.props.children}
      </div>
    );
  }
}

FadeIn.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

FadeIn.defaultProps = {
  className: '',
};

export default FadeIn;
