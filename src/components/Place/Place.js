// @flow
import React, { Fragment, PureComponent } from "react";
import { compose } from "recompose";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import { withRouter, type Match } from "react-router";
import { MapPin } from "react-feather";
import sizeMe from "react-sizeme";

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
  match: Match,
  size: {
    width: number
  }
};

type State = {
  viewport: {
    height: number,
    latitude: any,
    longitude: any,
    width: number,
    zoom: number
  }
};

class Place extends PureComponent<Props, State> {
  state = {
    viewport: {
      height: 150,
      latitude: 0,
      longitude: 0,
      width: 0,
      zoom: 0
    }
  };

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      const { data, match, size } = this.props;
      const place = data.places.find(({ id }) => id === match.params.id);

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        viewport: {
          height: 150,
          latitude: place.coordinates[1],
          longitude: place.coordinates[0],
          width: size.width - 48,
          zoom: 8
        }
      });
    }
  }

  updateViewport = viewport => {
    this.setState({
      viewport
    });
  };

  render() {
    const { data, isLoading, match } = this.props;
    const { viewport } = this.state;
    const { height, latitude, longitude, width, zoom } = viewport;

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
              <div className="col-sm-12">
                <ReactMapGL
                  height={height}
                  latitude={latitude}
                  longitude={longitude}
                  mapboxApiAccessToken="pk.eyJ1Ijoic3RpdmF1Z29pbiIsImEiOiJjamVtNzBjcnQwMWs0MzNwYjFzd2kyMTNkIn0.fDvaDXP3YIS4YvLWcqEnvQ"
                  onViewportChange={this.updateViewport}
                  mapStyle="mapbox://styles/stivaugoin/cjo3181cg3hpx2spq0gg221fe"
                  width={width}
                  zoom={zoom}
                >
                  <div style={{ position: "absolute", right: 5, top: 5 }}>
                    <NavigationControl
                      onViewportChange={this.updateViewport}
                      showCompass={false}
                    />
                  </div>
                  <Marker
                    offsetLeft={-12}
                    offsetTop={-24}
                    latitude={place.coordinates[1]}
                    longitude={place.coordinates[0]}
                  >
                    <MapPin />
                  </Marker>
                </ReactMapGL>
              </div>
            </div>

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

export default sizeMe()(
  compose(
    withRouter,
    withData({ items: ["individuals", "places"] })
  )(Place)
);
