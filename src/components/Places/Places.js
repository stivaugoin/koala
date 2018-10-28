// @flow
import React, { Fragment, PureComponent } from "react";
import { compose } from "recompose";
import { Link } from "react-router-dom";

import Main from "../Main";
import Pagination from "../Pagination";
import TitlePage from "../TitlePage";
import withPagination, {
  type WithPagination
} from "../../utils/hoc/withPagination";
import withData from "../../utils/hoc/withData";

type Props = {
  data: {
    places: Array<{|
      id: string,
      name: string,
      count: number
    |}>
  },
  isLoading: boolean,
  ...WithPagination
};

function sort(a, b) {
  if (a.count > b.count) return -1;
  if (a.count < b.count) return 1;
  return 0;
}

class Places extends PureComponent<Props> {
  render() {
    const {
      currentPage,
      data,
      isLoading,
      itemsPerPage,
      ...pagination
    } = this.props;
    const { places } = data;

    return (
      <Main>
        <TitlePage>Places</TitlePage>

        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          <Fragment>
            <div className="list">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Occurence</th>
                  </tr>
                </thead>
                <tbody>
                  {places
                    .sort(sort)
                    .slice(
                      currentPage * itemsPerPage,
                      currentPage * itemsPerPage + itemsPerPage
                    )
                    .map(place => (
                      <tr key={place.id}>
                        <td>
                          <Link to={`/places/${place.id}`}>{place.name}</Link>
                        </td>
                        <td>{place.count}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <Pagination {...pagination} />
          </Fragment>
        )}
      </Main>
    );
  }
}

export default compose(
  withData({ items: ["places"] }),
  withPagination
)(Places);
