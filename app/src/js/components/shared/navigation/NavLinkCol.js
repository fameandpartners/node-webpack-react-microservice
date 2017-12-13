import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import classnames from 'classnames';

// CSS
import '../../../../css/components/NavLinkCol.scss';

class NavLinkCol extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  renderTitle() {
    const { colTitle, headerLink } = this.props;
    if (headerLink) {
      return (
        <a href={headerLink}>
          <h2 className="NavLinkCol__heading h6 u-uppercase">{colTitle}</h2>
        </a>
      );
    }

    return <h2 className="NavLinkCol__heading h6 u-uppercase">{colTitle}</h2>;
  }

  render() {
    const {
      colClass,
      colTitle,
      links,
    } = this.props;

    return (
      <div
        className={classnames(
          colClass, // NOTE: This is dumb, but gridlex requires this class to be first
          'NavLinkCol',
        )}
      >
        { colTitle
          ? this.renderTitle()
          : null
        }
        <ul>
          { links.map((l, i) => {
            if (l.type === 'divider') {
              return (
                <li key={`divider-${i}`}>-</li>
              );
            }

            return (
              l.shouldHide ?
                null
                :
                (
                  <li
                    key={l.text}
                    className={classnames(
                      l.customClass,
                      'NavLinkCol__li',
                      'u-width--full',
                    )}
                  >
                    <a
                      className={classnames(
                        l.customClass,
                        'link',
                        'link--static',
                        'link--no-underline',
                      )}
                      href={l.url}
                    >
                      {l.text}
                    </a>
                  </li>
                )
            );
          })}
        </ul>
      </div>
    );
  }
}

NavLinkCol.propTypes = {
  colClass: PropTypes.string,
  colTitle: PropTypes.string,
  headerLink: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
};

NavLinkCol.defaultProps = {
  colClass: 'col',
  colTitle: null,
  headerLink: null,
};

export default NavLinkCol;
