import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

// CSS
import '../../../../css/components/NavLinkCol.scss';

class NavLinkCol extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  render() {
    const { colTitle, links } = this.props;
    return (
      <div className="col NavLinkCol">
        { colTitle
          ? <h2 className="h6 u-uppercase u-mb-small">{colTitle}</h2>
          : null
        }
        <ul>
          { links.map(l => (
            <li key={l.text} className="u-width--full">
              <a href={l.url}>{l.text}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

NavLinkCol.propTypes = {
  colTitle: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
};

NavLinkCol.defaultProps = {
  colTitle: null,
};

export default NavLinkCol;
