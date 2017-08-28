import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import '../../../css/components/Slider.scss';

import { lory } from '../../libs/lory';

let loryInstance = null;
// CSS
class Slider extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    loryInstance = lory(this.slider, {
      infinite: 1,
      classNameFrame: 'Slider__frame',
      classNameSlideContainer: 'Slider__slides',
    });
  }

  componentDidUpdate(lastProps) {
    if ((lastProps.winWidth !== this.props.winWidth)
  || (lastProps.winHeight !== this.props.winHeight)) {
      console.log('resetting');
      loryInstance.reset();
    }
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
            <ul className="Slider__slides u-height-full">
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
  winHeight: PropTypes.number,
  winWidth: PropTypes.number,
};

Slider.defaultProps = {
  winHeight: null,
  winWidth: null,
};

export default Slider;
