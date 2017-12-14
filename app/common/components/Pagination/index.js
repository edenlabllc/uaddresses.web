/* eslint-disable */

import React, { Component } from "react";
import withStyles from "withStyles";
import classnames from "classnames";
import { Link } from "react-router";

import Icon from "@components/Icon";

import { createUrl } from "helpers/url";

import styles from "./styles.scss";

const TRUNCATE_LENGTH = 1;

@withStyles(styles)
export default class Pagination extends Component {
  static defaultProps = {
    marginPages: 1,
    pageRange: 5,
    rangeOverlap: 1
  };

  state = {
    currentPage: this.props.currentPage
  };

  render() {
    const { totalPages } = this.props;
    const { currentPage } = this.state;

    if (!totalPages || totalPages <= 1) return null;

    return (
      <ul className={styles.pagination} onClick={this.handleClick}>
        <PageDirection
          type="prev"
          page={currentPage - 1}
          url={this.getPageUrl(currentPage - 1)}
          hide={currentPage === 1}
        />
        {this.leftPages.map(page => (
          <Page
            key={page}
            page={page}
            url={this.getPageUrl(page)}
            current={page === currentPage}
          />
        ))}
        {this.shouldRangeBeTruncated &&
          (this.isCurrentPageInLeftRange || <TruncatedDelimiter />)}
        {this.middlePages.map(page => (
          <Page
            key={page}
            page={page}
            url={this.getPageUrl(page)}
            current={page === currentPage}
          />
        ))}
        {this.shouldRangeBeTruncated &&
          (this.isCurrentPageInRightRange || <TruncatedDelimiter />)}
        {this.rightPages.map(page => (
          <Page
            key={page}
            page={page}
            url={this.getPageUrl(page)}
            current={page === currentPage}
          />
        ))}
        <PageDirection
          type="next"
          page={currentPage + 1}
          url={this.getPageUrl(currentPage + 1)}
          hide={currentPage === totalPages}
        />
      </ul>
    );
  }

  get leftPages() {
    const { marginPages, totalPages } = this.props;

    const length = Math.min(marginPages, totalPages);

    return valuesFromRange(length);
  }

  get middlePages() {
    const { pageRange, marginPages, currentPage, totalPages } = this.props;

    if (this.shouldRangeBeTruncated) {
      if (this.isCurrentPageInLeftRange) {
        // 1 2 | 3 4 5 (6) _ | 14 15
        return valuesFromRange(pageRange - TRUNCATE_LENGTH, marginPages);
      } else if (this.isCurrentPageInRightRange) {
        // 1 2 _ (10) 11 12 13 | 14 15
        return valuesFromRange(
          pageRange - TRUNCATE_LENGTH,
          this.rightRange.begin
        );
      } else {
        // 1 2 | _ 7 (8) 9 _ | 14 15
        const length = pageRange - 2 * TRUNCATE_LENGTH;

        return valuesFromRange(length, currentPage - Math.ceil(length / 2));
      }
    } else {
      // 1 (2) || 3
      // 1 (2) || 3 4
      // 1 (2) | 3 | 4 5
      // 1 (2) | 3 4 5 6 7 | 8 9

      const length = Math.max(totalPages - marginPages * 2, 0);

      return valuesFromRange(length, marginPages);
    }
  }

  get rightPages() {
    const { totalPages, marginPages } = this.props;

    const restPages = Math.max(totalPages - marginPages, 0);
    const length = Math.min(marginPages, restPages);

    return valuesFromRange(length, restPages);
  }

  get shouldRangeBeTruncated() {
    const { marginPages, pageRange, totalPages } = this.props;

    const maxPagesLength = marginPages * 2 + pageRange;

    return maxPagesLength < totalPages;
  }

  get isCurrentPageInLeftRange() {
    return (
      this.state.currentPage <= this.leftRange.end - this.props.rangeOverlap
    );
  }

  get isCurrentPageInRightRange() {
    return (
      this.state.currentPage > this.rightRange.begin + this.props.rangeOverlap
    );
  }

  get leftRange() {
    const { marginPages, pageRange } = this.props;

    return {
      begin: 0,
      end: marginPages + pageRange - TRUNCATE_LENGTH
    };
  }

  get rightRange() {
    const { totalPages, marginPages, pageRange } = this.props;

    return {
      begin: totalPages - (marginPages + pageRange - TRUNCATE_LENGTH),
      end: totalPages
    };
  }

  getPageUrl(page) {
    const { location: { pathname, query } } = this.props;

    return createUrl(pathname, { ...query, page });
  }

  handleClick = event => {
    event.preventDefault();

    const { page } = event.target.dataset;

    if (page) {
      this.setState({ currentPage: parseInt(page, 10) });
    }
  };
}

const valuesFromRange = (length, offset = 0) =>
  Array.from({ length }, (_, index) => offset + index + 1);

const PageDirection = ({ type, page, url, hide }) => (
  <li className={classnames(styles.direction, { [styles.hidden]: hide })}>
    <Link to={url} data-page={page}>
      <Icon name={`arrow-${type === "prev" ? "left" : "right"}`} />
    </Link>
  </li>
);

const Page = ({ page, url, current }) => (
  <li className={classnames(styles.page, { [styles.current]: current })}>
    <Link to={url} data-page={page}>
      {page}
    </Link>
  </li>
);

const TruncatedDelimiter = () => (
  <li className={classnames(styles.delimiter)}>...</li>
);
