// @flow
import React, { PureComponent } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

import type { WithPagination } from "../../utils/hoc/withPagination";

import { Button, StyledPagination } from "./styles";

type Props = {
  ...WithPagination
};

class Pagination extends PureComponent<Props> {
  render() {
    const { isFirstPage, isLastPage, onPageDown, onPageUp } = this.props;

    return (
      <StyledPagination className="Pagination">
        <Button
          className="btn btn-outline-primary"
          disabled={isFirstPage}
          onClick={onPageDown}
          type="button"
        >
          <ChevronLeft />
          Previous
        </Button>
        <Button
          className="btn btn-outline-primary"
          disabled={isLastPage}
          onClick={onPageUp}
          type="button"
        >
          Next
          <ChevronRight />
        </Button>
      </StyledPagination>
    );
  }
}

export default Pagination;
