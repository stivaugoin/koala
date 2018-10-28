// @flow
import React, { Fragment, PureComponent } from "react";
import { compose } from "recompose";
import { withRouter, type Match } from "react-router";

import calculatePlaceOccurence from "../../utils/calculatePlaceOccurence";
import withData from "../../utils/hoc/withData";

import Main from "../Main";
import TitlePage from "../TitlePage";
import Indicator from "../Indicator";

type Props = {
  data: {
    individuals: any,
    places: any
  },
  isLoading: boolean,
  match: Match
};

class Place extends PureComponent<Props> {
  render() {
    const { data, isLoading, match } = this.props;

    const places = calculatePlaceOccurence({
      individuals: data.individuals,
      places: data.places
    });

    const place = places.find(p => p.id === match.params.id);

    return (
      <Main>
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          <Fragment>
            <TitlePage>{place.name}</TitlePage>

            <div className="row">
              <div className="col-sm-4">
                <Indicator title="Total Occurences" value={place.total} />
              </div>
              <div className="col-sm-4">
                <Indicator title="Births" value={place.births} />
              </div>
              <div className="col-sm-4">
                <Indicator title="Deaths" value={place.deaths} />
              </div>
            </div>
          </Fragment>
        )}
      </Main>
    );
  }
}

export default compose(
  withRouter,
  withData({ items: ["individuals", "places"] })
)(Place);
