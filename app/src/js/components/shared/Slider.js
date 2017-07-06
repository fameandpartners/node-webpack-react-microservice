import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { lory } from 'lory.js';

// CSS
import '../../../css/components/Slider.scss';

class Slider extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    lory(this.slider, {
      infinite: 1,
    });
  }

  render() {
    const { children } = this.props;

    return (
      <div
        ref={c => this.slider = c}
        className="Slider u-full-width"
      >
        <div className="Slider__view">
          <div className="Slider__frame">
            <ul className="Slider__slides">
              { children }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
};

export default Slider;
