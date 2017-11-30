import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import qs from 'qs';

// Utilities
import win from '../../polyfills/windowPolyfill';

// Components
import Caret from '../../components/generic/Caret';

// CSS
import '../../../css/components/FlashSalePagination.scss';


class FlashSalePagination extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  handlePaginationClick(pageNum) {
    const queryParams = win.location.search;
    const parsedQueryObj = qs.parse(queryParams.slice(1));

    parsedQueryObj.page = pageNum;
    console.log(`Navigating to Page: ${pageNum}`);

    const updatedPath = `${win.location.origin}${win.location.pathname}?${qs.stringify(parsedQueryObj)}`;
    console.log(`New URL: ${updatedPath}`);
  }

  render() {
    const {
      page,
      totalItems,
    } = this.props;

    return (
      <div className="FlashSalePagination__wrapper">
        <ul className="grid-12">
          <li className="col-4">
            { page > 1 ?
              (
                <span
                  className="FlashSalePagination__navigation-button u-cursor--pointer"
                  onClick={() => this.handlePaginationClick(Number(page) - 1)}
                >
                  <Caret
                    left
                    width="10px"
                    height="10px"
                  />
                </span>
              ) : null
            }
          </li>
          <li className="col-4">{page}</li>
          <li className="col-4">
            { totalItems > 100 ?
              (
                <span
                  className="FlashSalePagination__navigation-button u-cursor--pointer"
                  onClick={() => this.handlePaginationClick(Number(page) + 1)}
                >
                  <Caret
                    right
                    width="10px"
                    height="10px"
                  />
                </span>
              ) : null
            }
          </li>
        </ul>
      </div>
    );
  }
}

FlashSalePagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export default FlashSalePagination;
