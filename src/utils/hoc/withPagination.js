// @flow
import React, { PureComponent, type ComponentType } from "react";

type Props = {
  data: Array<{}>
};

type State = {|
  currentPage: number,
  isFirstPage: boolean,
  isLastPage: boolean,
  itemsPerPage: number
|};

export type WithPagination = {|
  onPageDown: () => void,
  onPageUp: () => void,
  ...State
|};

export default (WrappedComponent: ComponentType<any>) =>
  class withPagination extends PureComponent<Props, State> {
    state = {
      currentPage: 0,
      isFirstPage: true,
      isLastPage: false,
      itemsPerPage: 10
    };

    handlePageDown = () => {
      const { data } = this.props;

      this.setState(state => {
        const newPage = state.currentPage - 1;

        return {
          currentPage: newPage,
          isFirstPage: newPage === 0,
          isLastPage: newPage >= Math.round(data.length / state.itemsPerPage)
        };
      });
    };

    handlePageUp = () => {
      const { data } = this.props;

      this.setState(state => {
        const newPage = state.currentPage + 1;

        return {
          currentPage: newPage,
          isFirstPage: newPage === 0,
          isLastPage: newPage >= Math.round(data.length / state.itemsPerPage)
        };
      });
    };

    render() {
      const { currentPage, isFirstPage, isLastPage, itemsPerPage } = this.state;

      return (
        <WrappedComponent
          {...this.props}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          onPageDown={this.handlePageDown}
          onPageUp={this.handlePageUp}
        />
      );
    }
  };
