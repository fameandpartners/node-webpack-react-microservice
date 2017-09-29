import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import classnames from 'classnames';

import win from '../../polyfills/windowPolyfill';
import '../../../css/components/Slider.scss';
import Carat from '../../../svg/carat.svg';
import { lory } from '../../libs/lory';
import KEYS from '../../constants/keys';
import noop from '../../libs/noop';

let loryInstance = null;
class Slider extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  previousSlide() {
    this.props.handlePrev();
  }

  nextSlide() {
    this.props.handleNext();
  }

  handleKeydowns(evt) {
    switch (evt.keyCode) {
      case KEYS.ARROW_LEFT:
        evt.preventDefault();
        this.previousSlide();
        return null;
      case KEYS.ARROW_RIGHT:
        evt.preventDefault();
        this.nextSlide();
        return null;
      default:
        return null;
    }
  }

  setUpEventHandlers() {
    // Window keydown for arrow keys
    win.document.addEventListener('keydown', this.handleKeydowns);
  }

  removeEventHandler() {
    win.document.removeEventListener('keydown', this.handleKeydowns);
  }

  componentDidMount() {
    loryInstance = lory(this.slider, {
      infinite: 1,
      classNameFrame: 'Slider__frame',
      classNameSlideContainer: 'Slider__slides',
    });

    this.setUpEventHandlers();
    if (typeof this.props.activeIndex === 'number') {
      loryInstance.slideTo(this.props.activeIndex);
    }
  }

  componentDidUpdate(lastProps) {
    if ((lastProps.winWidth !== this.props.winWidth)
    || (lastProps.winHeight !== this.props.winHeight)) {
      loryInstance.reset();
    }

    if (lastProps.activeIndex !== this.props.activeIndex) {
      loryInstance.slideTo(this.props.activeIndex);
    }
  }

  componentWillUnmount() {
    this.removeEventHandler();
    loryInstance.destroy();
  }

  render() {
    const {
      children,
      nudgeOnMount,
      sliderHeight,
      showButtons,
    } = this.props;

    return (
      <div
        ref={c => this.slider = c}
        className="Slider u-height--full"
        style={{ height: sliderHeight }}
      >
        <div className="Slider__view u-height--full">
          <div
            className="Slider__frame u-height--full"
          >
            <div
              className={classnames(
                'Slider__contents u-height--full',
                { 'delayed-nudge': nudgeOnMount },
              )}
            >
              {
                showButtons ?
                  <div>
                    <div
                      onClick={this.previousSlide}
                      className="Slider__button Slider__button--left u-cursor--pointer"
                    >
                      <Carat
                        width="28px"
                        height="40px"
                      />
                    </div>

                    <div
                      className="Slider__button Slider__button--right u-cursor--pointer"
                      onClick={this.nextSlide}
                    >
                      <Carat
                        width="28px"
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
      </div>
    );
  }
}

Slider.propTypes = {
  activeIndex: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  nudgeOnMount: PropTypes.bool,
  sliderHeight: PropTypes.string.isRequired,
  winHeight: PropTypes.number,
  winWidth: PropTypes.number,
  showButtons: PropTypes.bool,
  handlePrev: PropTypes.func,
  handleNext: PropTypes.func,
};

Slider.defaultProps = {
  // Redux Props
  activeIndex: 0,
  winHeight: null,
  winWidth: null,
  nudgeOnMount: false,
  showButtons: false,
  // Redux Actions
  handlePrev: noop,
  handleNext: noop,
  handleBeforeSlide: noop,
};

export default Slider;
