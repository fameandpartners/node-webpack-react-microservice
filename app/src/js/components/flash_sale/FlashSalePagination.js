import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import qs from 'qs';

// Utilities
import win from '../../polyfills/windowPolyfill';
import { serializeObjectIntoQueryParams } from '../../utilities/BOM';

// Components
import Button from '../../components/generic/Button';

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
            <Button
              selected={page === 1}
              disabled={page === 1}
              text="1"
              handleClick={page !== 1 ? () => this.handlePaginationClick(1) : {}}
            />
          </li>

          { page > 3 ?
            (
              <li className="FlashSalePagination__ellipsis col-1">
                &hellip;
              </li>
            ) : null
          }

          { page > 3 && page < (totalPages - 3) ?
            (
              <div className="u-display--inline-flex">
                <li className="col-1">
                  <Button
                    text={page - 1}
                    handleClick={() => this.handlePaginationClick(page - 1)}
                  />
                </li>
                <li className="col-1">
                  <Button
                    selected={page}
                    disabled={page}
                    text={page}
                  />
                </li>
                <li className="col-1">
                  <Button
                    text={page + 1}
                    handleClick={() => this.handlePaginationClick(page + 1)}
                  />
                </li>
              </div>
            ) : (
              <div className="u-display--inline-flex">
                <li className="col-1">
                  <Button
                    selected={page === (page <= 3 ? 2 : (totalPages - 2))}
                    disabled={page === (page <= 3 ? 2 : (totalPages - 2))}
                    text={page <= 3 ? '2' : (totalPages - 2)}
                    handleClick={() => this.handlePaginationClick(page <= 3 ? '2' : (totalPages - 2))}
                  />
                </li>
                <li className="col-1">
                  {/* eslint-disable max-len */}
                  <Button
                    selected={
                      (page === (3 || (totalPages - 1))) || (page === (page <= 3 ? 1 : (totalPages - 1)))
                    }
                    disabled={
                      (page === (3 || (totalPages - 1))) || (page === (page <= 3 ? 1 : (totalPages - 1)))
                    }
                    text={page <= 3 ? '3' : (totalPages - 1)}
                    handleClick={() => this.handlePaginationClick(page <= 3 ? '3' : (totalPages - 1))}
                  />
                  {/* eslint-enable max-len */}
                </li>
                {
                  page === 3 ?
                  (
                    <li className="col-1">
                      <Button
                        text="4"
                        handleClick={() => this.handlePaginationClick(4)}
                      />
                    </li>
                  ) : null
                }
              </div>
            )
          }

          { page < (totalPages - 3) ?
            (
              <li className="FlashSalePagination__ellipsis col-1">
                &hellip;
              </li>
            ) : null
          }

          <li className="col-1">
            <Button
              selected={page === totalPages}
              disabled={page === totalPages}
              text={totalPages}
              handleClick={() => this.handlePaginationClick(totalPages)}
            />
          </li>

        </ul>
      </div>
    );
  }
}

FlashSalePagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default FlashSalePagination;
