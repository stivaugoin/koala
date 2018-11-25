// @flow
import React, { Fragment, PureComponent } from "react";
import { Calendar, MapPin, User } from "react-feather";
import classnames from "classnames";
import { compose } from "recompose";

import Main from "../Main";
import Pagination from "../Pagination";
import TitlePage from "../TitlePage";
import Tooltip from "../Tooltip";
import withPagination, {
  type WithPagination
} from "../../utils/hoc/withPagination";
import withData from "../../utils/hoc/withData";

import { List, TD, TH, TR } from "./styles";

type Event = {|
  date: Date,
  place?: {
    id: string,
    name: string
  }
|};

type Props = {|
  data: {
    individuals: Array<{
      id: string,
      births: Array<Event>,
      deaths: Array<Event>,
      gender: "M" | "F",
      names: Array<{
        fname: string,
        lname: string
      }>,
      weddings: Array<{
        ...Event,
        spouse: {
          id: string,
          fname: string,
          lname: string
        }
      }>
    }>
  },
  isLoading: boolean,
  ...WithPagination
|};

const getBirth = births => ({
  date: births && births[0] && births[0].date,
  place: births && births[0] && births[0].place && births[0].place.name
});

const getDeath = deaths => ({
  date: deaths && deaths[0] && deaths[0].date,
  place: deaths && deaths[0] && deaths[0].place && deaths[0].place.name
});

const getWedding = weddings => ({
  date: weddings && weddings[0] && weddings[0].date,
  place: weddings && weddings[0] && weddings[0].place && weddings[0].place.name
});

class People extends PureComponent<Props> {
  render() {
    const {
      currentPage,
      data,
      isLoading,
      itemsPerPage,
      ...pagination
    } = this.props;
    const { individuals } = data;

    return (
      <Main className="People">
        <TitlePage>People</TitlePage>

        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          <Fragment>
            <List className="list">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <TH scope="col">Name</TH>
                    <TH className="text-center" scope="col">
                      Birth
                    </TH>
                    <TH className="text-center" scope="col">
                      Wedding
                    </TH>
                    <TH className="text-center" scope="col">
                      Death
                    </TH>
                  </tr>
                </thead>
                <tbody>
                  {individuals
                    .slice(
                      currentPage * itemsPerPage,
                      currentPage * itemsPerPage + itemsPerPage
                    )
                    .map(person => {
                      const birth = getBirth(person.births);
                      const death = getDeath(person.deaths);
                      const wedding = getWedding(person.weddings);

                      return (
                        <TR key={person.id}>
                          <TD>
                            <User
                              className={classnames({
                                "text-primary": person.gender === "M",
                                "text-danger": person.gender === "F"
                              })}
                            />
                            {person.names[0].lname.toUpperCase()},{" "}
                            {person.names[0].fname}
                          </TD>
                          <TD className="text-center">
                            <Tooltip value={birth.date}>
                              <Calendar
                                className={classnames({
                                  "text-success": birth.date,
                                  "text-danger": !birth.date
                                })}
                              />
                            </Tooltip>
                            <Tooltip value={birth.place}>
                              <MapPin
                                className={classnames({
                                  "text-success": birth.place,
                                  "text-danger": !birth.place
                                })}
                              />
                            </Tooltip>
                          </TD>
                          <TD className="text-center">
                            <Tooltip value={wedding.date}>
                              <Calendar
                                className={classnames({
                                  "text-success": wedding.date,
                                  "text-danger": !wedding.date
                                })}
                              />
                            </Tooltip>
                            <Tooltip value={wedding.place}>
                              <MapPin
                                className={classnames({
                                  "text-success": wedding.place,
                                  "text-danger": !wedding.place
                                })}
                              />
                            </Tooltip>
                          </TD>
                          <TD className="text-center">
                            <Tooltip value={death.date}>
                              <Calendar
                                className={classnames({
                                  "text-success": death.date,
                                  "text-danger": !death.date
                                })}
                              />
                            </Tooltip>
                            <Tooltip value={death.place}>
                              <MapPin
                                className={classnames({
                                  "text-success": death.place,
                                  "text-danger": !death.place
                                })}
                              />
                            </Tooltip>
                          </TD>
                        </TR>
                      );
                    })}
                </tbody>
              </table>
            </List>

            <Pagination {...pagination} />
          </Fragment>
        )}
      </Main>
    );
  }
}

export default compose(
  withData({ items: ["individuals"] }),
  withPagination
)(People);
