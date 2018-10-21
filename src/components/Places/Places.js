// @flow
import React, { PureComponent } from "react";
import { compose } from "recompose";

import Main from "../Main";
import Pagination from "../Pagination";
import TitlePage from "../TitlePage";
import withPagination, {
  type WithPagination
} from "../../utils/hoc/withPagination";
import withData from "../../utils/hoc/withData";

type Props = {
  data: Array<{|
    id: string,
    name: string,
    count: number
  |}>,
  ...WithPagination
};

function sort(a, b) {
  if (a.count > b.count) return -1;
  if (a.count < b.count) return 1;
  return 0;
}

class Places extends PureComponent<Props> {
  render() {
    const { currentPage, data, itemsPerPage, ...pagination } = this.props;

    return (
      <Main>
        <TitlePage>Places</TitlePage>

        <div className="list">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Occurence</th>
              </tr>
            </thead>
            <tbody>
              {data
                .sort(sort)
                .slice(
                  currentPage * itemsPerPage,
                  currentPage * itemsPerPage + itemsPerPage
                )
                .map(place => (
                  <tr key={place.id}>
                    <td>{place.name}</td>
                    <td>{place.count}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Pagination {...pagination} />
      </Main>
    );
  }
}

export default compose(
  withData({ key: "places" }),
  withPagination
)(Places);
