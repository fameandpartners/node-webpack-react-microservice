import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import IconSVG from '../generic/IconSVG';
import '../../../css/components/Slider.scss';
import Carat from '../../../svg/carat.svg';
import { lory } from '../../libs/lory';

let loryInstance = null;
class Slider extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  previousSlide() {
    loryInstance.prev();
  }
  nextSlide() {
    loryInstance.next();
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
      loryInstance.reset();
    }
  }

  render() {
    const {
      children,
      sliderHeight,
      showButtons } = this.props;

    return (
      <div
        ref={c => this.slider = c}
        className="Slider u-height--full"
        style={{ height: sliderHeight }}
      >
        <div className="Slider__view u-height--full">
          <div className="Slider__frame u-height--full">
            {
              showButtons ?
                <div>
                  <div
                    onClick={this.previousSlide}
                    className="Slider__button Slider__button--left"
                  >
                    <IconSVG
                      svgPath={Carat.url}
                      width="40px"
                      height="40px"
                    />
                  </div>

                  <div
                    className="Slider__button Slider__button--right"
                    onClick={this.nextSlide}
                  >
                    <IconSVG
                      svgPath={Carat.url}
                      width="40px"
                      height="40px"
                    />
                  </div>
                </div>
                : null
            }
            <ul className="Slider__slides u-height--full">
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
  sliderHeight: PropTypes.string.isRequired,
  winHeight: PropTypes.number,
  winWidth: PropTypes.number,
  showButtons: PropTypes.boolean,
};

Slider.defaultProps = {
  winHeight: null,
  winWidth: null,
  showButtons: false,
};

export default Slider;
