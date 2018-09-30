// @flow
import React, { Fragment, PureComponent } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";

import { getItem } from "../../utils/asyncLocalStorage";
import Main from "../Main";
import TitlePage from "../TitlePage";

type Props = {};

type State = {
  isLoading: boolean,
  nbLastName: number,
  nbPeople: number,
  nbPlaces: number,
  popularLastName: string,
  popularPlace: string
};

class Overview extends PureComponent<Props, State> {
  state = {
    isLoading: true,
    nbLastName: 0,
    nbPeople: 0,
    nbPlaces: 0,
    popularLastName: "",
    popularPlace: ""
  };

  async componentDidMount() {
    const individuals = JSON.parse(await getItem("individuals"));
    const places = JSON.parse(await getItem("places"));

    const nbPeople = Object.keys(individuals).length;
    const nbPlaces = Object.keys(places).length;

    const lastName = new Map();
    individuals.forEach(individual => {
      const { names } = individual;

      if (names) {
        names.forEach(({ lname }) => {
          const countLastName = lastName.get(lname) || 0;

          lastName.set(lname, countLastName + 1);
        });
      }
    });

    const lastNameObj = [];
    lastName.forEach((count, lname) => {
      lastNameObj.push({ lname, count });
    });

    const nbLastName = lastName.size;
    const popularLastName = lastNameObj.sort((a, b) => {
      if (a.count > b.count) return -1;
      if (a.count < b.count) return 1;
      return 0;
    })[0].lname;

    const popularPlace = places.sort((a, b) => {
      if (a.count > b.count) return -1;
      if (a.count < b.count) return 1;
      return 0;
    })[0].name;

    this.setState({
      isLoading: false,
      nbLastName,
      nbPeople,
      nbPlaces,
      popularLastName,
      popularPlace
    });
  }

  // eslint-disable-next-line class-methods-use-this
  renderCard({
    path,
    title,
    value
  }: {
    path?: string,
    title: string,
    value: number | string
  }) {
    return (
      <div className="card text-center">
        <div className="card-body d-flex flex-column justify-content-center">
          <h5
            className={classnames("card-title", {
              h1: typeof value === "number",
              h3: typeof value === "string"
            })}
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis"
            }}
          >
            {value}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">{title}</h6>
        </div>
        {path && (
          <div className="card-footer">
            <Link to={path} className="card-link">
              View list
            </Link>
          </div>
        )}
      </div>
    );
  }

  render() {
    const {
      isLoading,
      nbLastName,
      nbPeople,
      nbPlaces,
      popularLastName,
      popularPlace
    } = this.state;

    return (
      <Main>
        <TitlePage>Overview</TitlePage>

        {isLoading ? (
          "Loading..."
        ) : (
          <Fragment>
            <div className="row">
              <div className="col-sm-4">
                {this.renderCard({
                  path: "/people",
                  title: "Unique People",
                  value: nbPeople
                })}
              </div>
              <div className="col-sm-4">
                {this.renderCard({
                  path: "/places",
                  title: "Unique Places",
                  value: nbPlaces
                })}
              </div>
              <div className="col-sm-4">
                {this.renderCard({
                  path: "/unique-lastname",
                  title: "Unique Last Name",
                  value: nbLastName
                })}
              </div>
            </div>

            <div className="row">
              <div className="col-sm-4">
                {this.renderCard({
                  title: "Most Popular Last Name",
                  value: popularLastName
                })}
              </div>
              <div className="col-sm-8">
                {this.renderCard({
                  title: "Most Popular Place",
                  value: popularPlace
                })}
              </div>
            </div>
          </Fragment>
        )}
      </Main>
    );
  }
}

export default Overview;
