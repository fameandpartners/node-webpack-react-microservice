import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import qs from 'qs';
import classnames from 'classnames';

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
      totalItems,
    } = this.props;

    let prevConditionalButton;
    let nextConditionalButton;

    if (page === (totalPages - 2)) {
      prevConditionalButton = (
        <li className="FlashSalePagination__buttonWrapper">
          <Button
            text={totalPages - 3}
            handleClick={() => this.handlePaginationClick(totalPages - 3)}
          />
        </li>
      );
    } else if (page === 3) {
      nextConditionalButton = (
        <li className="FlashSalePagination__buttonWrapper">
          <Button
            text="4"
            handleClick={() => this.handlePaginationClick(4)}
          />
        </li>
      );
    }

    let paginationContainer;

    if (totalItems >= 96) {
      paginationContainer = (
        <div className="FlashSalePagination__wrapper grid-12 float--center font-family-primary">

          { page !== 1 ?
            (
              <div
                className={classnames(
                  'FlashSalePagination__action-text',
                  'FlashSalePagination__action-text--prev',
                  {
                    'FlashSalePagination__action-text--disabled': page === 1,
                    'col-3_sm-6': page !== totalPages,
                    'col-3_sm-12': page === totalPages,
                  },
                )}
                onClick={() => this.handlePaginationClick(page - 1)}
              >
                Previous
              </div>
            ) : null
          }

          { page !== totalPages ?
            (
              <div
                className={classnames(
                  'FlashSalePagination__action-text',
                  'FlashSalePagination__action-text--next',
                  {
                    'FlashSalePagination__action-text--disabled': page === totalPages,
                    'col-3_sm-6': page !== 1,
                    'col-3_sm-12': page === 1,
                  },
                )}
                onClick={() => this.handlePaginationClick(page + 1)}
              >
                Next
              </div>
            ) : null
          }

          <ul
            className="FlashSalePagination__listRow col-6_sm-12"
            data-push-left={page === 1 ? 'off-2' : ''}
            data-push-right={page === totalPages ? 'off-2' : ''}
          >

            <li className="FlashSalePagination__buttonWrapper">
              <Button
                selected={page === 1}
                disabled={page === 1}
                text="1"
                handleClick={page !== 1 ? () => this.handlePaginationClick(1) : null}
              />
            </li>

            { page > 3 ?
              (
                <li className="FlashSalePagination__buttonWrapper FlashSalePagination__ellipsis">
                  <Button
                    text="&hellip;"
                  />
                </li>
              ) : null
            }

            { page > 3 && page < (totalPages - 2) ?
              ([
                <li className="FlashSalePagination__buttonWrapper">
                  <Button
                    text={page - 1}
                    handleClick={() => this.handlePaginationClick(page - 1)}
                  />
                </li>,
                <li className="FlashSalePagination__buttonWrapper">
                  <Button
                    text={page}
                    selected
                    disabled
                  />
                </li>,
                <li className="FlashSalePagination__buttonWrapper">
                  <Button
                    text={page + 1}
                    handleClick={() => this.handlePaginationClick(page + 1)}
                  />
                </li>,
              ]) : ([
                prevConditionalButton,
                <li className="FlashSalePagination__buttonWrapper">
                  <Button
                    selected={page === (page <= 3 ? 2 : (totalPages - 2))}
                    disabled={page === (page <= 3 ? 2 : (totalPages - 2))}
                    text={page <= 3 ? '2' : (totalPages - 2)}
                    handleClick={() => this.handlePaginationClick(page <= 3 ? 2 : (totalPages - 2))}
                  />
                </li>,
                <li className="FlashSalePagination__buttonWrapper">
                  <Button
                    selected={(page === 3) || page === (totalPages - 1)}
                    disabled={(page === 3) || page === (totalPages - 1)}
                    text={page <= 3 ? '3' : (totalPages - 1)}
                    handleClick={() => this.handlePaginationClick(page <= 3 ? 3 : (totalPages - 1))}
                  />
                </li>,
                nextConditionalButton,
              ])
            }

            { page < (totalPages - 2) ?
              (
                <li className="FlashSalePagination__buttonWrapper FlashSalePagination__ellipsis">
                  <Button
                    text="&hellip;"
                  />
                </li>
              ) : null
            }

            <li className="FlashSalePagination__buttonWrapper">
              <Button
                selected={page === totalPages}
                disabled={page === totalPages}
                text={totalPages}
                handleClick={
                  page !== totalPages ? () => this.handlePaginationClick(totalPages) : null
                }
              />
            </li>

          </ul>

        </div>
      );
    } else {
      paginationContainer = (
        <div className="FlashSalePagination__wrapper grid-12 float--center font-family-primary">
          <ul className="FlashSalePagination__listRow col-6_sm-12">
            <li className="FlashSalePagination__buttonWrapper">
              <Button
                text={page}
                selected
                disabled
              />
            </li>
          </ul>
        </div>
      );
    }

    return paginationContainer;
  }
}

FlashSalePagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export default FlashSalePagination;
