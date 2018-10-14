// @flow
import React, { PureComponent } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

import type { WithPagination } from "../../utils/hoc/withPagination";

import "./styles.css";

type Props = {
  ...WithPagination
};

class Pagination extends PureComponent<Props> {
  render() {
    const { isFirstPage, isLastPage, onPageDown, onPageUp } = this.props;

    return (
      <div className="Pagination">
        <button
          className="btn btn-outline-primary"
          disabled={isFirstPage}
          onClick={onPageDown}
          type="button"
        >
          <ChevronLeft />
          Previous
        </button>
        <button
          className="btn btn-outline-primary"
          disabled={isLastPage}
          onClick={onPageUp}
          type="button"
        >
          Next
          <ChevronRight />
        </button>
      </div>
    );
  }
}

export default Pagination;
