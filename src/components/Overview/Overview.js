// @flow
import React, { Fragment, PureComponent } from "react";

import { getItem } from "../../utils/asyncLocalStorage";

import Indicator from "../Indicator";
import Main from "../Main";
import TitlePage from "../TitlePage";

type Props = {};

type State = {
  isLoading: boolean,
  nbPeople: number,
  nbPlaces: number,
  popularLastName: string,
  popularPlace: string
};

class Overview extends PureComponent<Props, State> {
  state = {
    isLoading: true,
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
      nbPeople,
      nbPlaces,
      popularLastName,
      popularPlace
    });
  }

  render() {
    const {
      isLoading,
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
              <div className="col-sm-6">
                <Indicator
                  path="/people"
                  title="Unique People"
                  value={nbPeople}
                />
              </div>
              <div className="col-sm-6">
                <Indicator
                  path="/places"
                  title="Unique Places"
                  value={nbPlaces}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-4">
                <Indicator
                  title="Most Popular Last Name"
                  value={popularLastName}
                />
              </div>
              <div className="col-sm-8">
                <Indicator title="Most Popular Place" value={popularPlace} />
              </div>
            </div>
          </Fragment>
        )}
      </Main>
    );
  }
}

export default Overview;
