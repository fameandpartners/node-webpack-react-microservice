import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import qs from 'qs';

// Utilities
import win from '../../polyfills/windowPolyfill';
import { serializeObjectIntoQueryParams } from '../../utilities/BOM';

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
    const serializedParams = serializeObjectIntoQueryParams(parsedQueryObj);

    const updatedPath = `${win.location.origin}${win.location.pathname}?${serializedParams}`;
    win.location.href = updatedPath;
  }

  render() {
    const {
      page,
      totalPages,
    } = this.props;

    return (
      <div className="FlashSalePagination__wrapper">
        <ul className="grid-12 float--center">
          <li className="col-1">
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
          <li className="col-1">{page}</li>
          <li className="col-1">
            { page < totalPages ?
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