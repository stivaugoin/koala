// @flow
import React, { PureComponent } from "react";
import { Calendar, MapPin, User } from "react-feather";
import classnames from "classnames";

import Main from "../Main";
import TitlePage from "../TitlePage";
import Tooltip from "../Tooltip";

import "./styles.css";

type Event = {|
  date: Date,
  place?: {
    id: string,
    name: string
  }
|};

type Props = {
  individuals: Array<{
    id: string,
    births: Array<Event>,
    deaths: Array<Event>,
    gender: "M" | "F",
    names: Array<{
      fname: string,
      lname: string
    }>
  }>
};

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
    const { individuals } = this.props;

    return (
      <Main className="People">
        <TitlePage>People</TitlePage>

        <div className="list">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Birth</th>
                <th scope="col">Death</th>
              </tr>
            </thead>
            <tbody>
              {individuals.map(person => {
                const birth = getBirth(person.births);
                const death = getDeath(person.deaths);

                return (
                  <tr key={person.id}>
                    <td className="d-flex align-items-center">
                      <User
                        className={classnames({
                          "text-primary": person.gender === "M",
                          "text-danger": person.gender === "F"
                        })}
                      />
                      {person.names[0].lname.toUpperCase()},{" "}
                      {person.names[0].fname}
                    </td>
                    <td>
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
                    </td>
                    <td>
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
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Main>
    );
  }
}

export default People;
