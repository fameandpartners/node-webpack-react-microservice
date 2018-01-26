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
      <div className="BodySection--section-container u-mt-big u-mb-big">
        <h2 className="BodySection--section-title u-mb-small">Shop by {data.title}</h2>
        <div className={data.grid_class}>
          {data.sections.map(
            (item, key) => (
              <div key={key} className="col">
                <a href={item.url}>
                  <img
                    src={item.img}
                    alt={`Shop by ${data.title}: ${item.name}`}
                    className="SuperCollection-BodySection--img"
                  />
                </a>
              </div>
            ),
          )}
        </div>
      </div>
    );
  }
}

BodySection.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    sections: PropTypes.arrayOf(PropTypes.shape({
      img: PropTypes.string,
    })),
  }).isRequired,
};

BodySection.defaultProps = {
  data: {},
};

export default connect(stateToProps, dispatchToProps)(BodySection);
