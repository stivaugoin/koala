// @flow
import React, { PureComponent } from "react";
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

import { List, TD, TH } from "./styles";

type Event = {|
  date: Date,
  place?: {
    id: string,
    name: string
  }
|};

type Props = {|
  data: Array<{
    id: string,
    births: Array<Event>,
    deaths: Array<Event>,
    gender: "M" | "F",
    names: Array<{
      fname: string,
      lname: string
    }>
  }>,
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

class People extends PureComponent<Props> {
  render() {
    const { currentPage, data, itemsPerPage, ...pagination } = this.props;

    return (
      <Main className="People">
        <TitlePage>People</TitlePage>

        <List className="list">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <TH scope="col">Name</TH>
                <TH className="text-center" scope="col">
                  Birth
                </TH>
                <TH className="text-center" scope="col">
                  Death
                </TH>
              </tr>
            </thead>
            <tbody>
              {data
                .slice(
                  currentPage * itemsPerPage,
                  currentPage * itemsPerPage + itemsPerPage
                )
                .map(person => {
                  const birth = getBirth(person.births);
                  const death = getDeath(person.deaths);

                  return (
                    <tr key={person.id}>
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
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </List>

        <Pagination {...pagination} />
      </Main>
    );
  }
}

export default compose(
  withData({ key: "individuals" }),
  withPagination
)(People);
