import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function stateToProps() {
}

function dispatchToProps() {
  return {};
}

class BodySection extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  normalizedData() {
    const { data } = this.props;
    const normalizedData = data.toJS();
    return normalizedData;
  }

  render() {
    const data = this.normalizedData();
    console.log(data);
    return (
      <div className={`BodySection--section-container BodySection--section-container--${data.title} u-mt-big u-mb-big`}>
        <div className="grid-1">
          <div className="col">
            <h2 className="BodySection--section-title u-mb-small">Shop by {data.title}</h2>
          </div>
        </div>
        {(data.title.toLowerCase() !== 'color') ? (
          <div className={`${data.grid_class} SuperCollection-BodySection--grid`}>
            {data.sections.map((item, key) => (
              <div key={key} className="col SuperCollection-BodySection--column">
                <div className="u-overlay-area">
                  <a href={item.url}>
                    <picture>
                      <source srcSet={item.img} media="(min-width: 768px)" />
                      <source srcSet={item.img_mobile} media="(max-width: 767px)" />
                      <img
                        src={item.img}
                        srcSet={item.img}
                        alt={`Shop by ${data.title}: ${item.name}`}
                        className="SuperCollection-BodySection--img u-overlay-area__media"
                      />
                    </picture>
                    <div
                      className="SuperCollection-BodySection--ctaWrapper u-overlay-area__overlay"
                    >
                      <div
                        className="SuperCollection-BodySection--ctaCaption u-overlay-area__caption"
                      >
                        <h2 className="SuperCollection-BodySection--ctaName">{item.name}.</h2>
                        <p className="SuperCollection-BodySection--ctaShop">Shop</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              ),
            )}
          </div>
        ) : (
          <div className={`${data.grid_class} SuperCollection-BodySection--grid`}>
            {data.sections.map((item, key) => (
              <div key={key} className="col SuperCollection-BodySection--column">
                <a href={item.url}>
                  <picture>
                      <source srcSet={item.img} media="(min-width: 768px)" />
                      <source srcSet={item.img_mobile} media="(max-width: 767px)" />
                      <img
                        src={item.img}
                        srcSet={item.img}
                        alt={`Shop by ${data.title}: ${item.name}`}
                        className="SuperCollection-BodySection--img"
                      />
                    </picture>
                </a>
              </div>
              ),
            )}
          </div>
        )}
      </div>
    );
  }
}

BodySection.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    sections: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      img: PropTypes.string,
      img_mobile: PropTypes.string,
      url: PropTypes.string,
    })),
  }).isRequired,
};

BodySection.defaultProps = {
  data: {},
};

export default connect(stateToProps, dispatchToProps)(BodySection);
