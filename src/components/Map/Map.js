// @flow
import React, { PureComponent } from "react";
import { MapPin } from "react-feather";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";

type Props = {
  latitude: number,
  longitude: number,
  markers: Array<{
    latitude: number,
    longitude: number
  }>,
  size: {
    height: number,
    width: number
  },
  zoom: number
};

type Viewport = {
  height: number,
  latitude: any,
  longitude: any,
  width: number,
  zoom: number
};

type State = {
  viewport: Viewport
};

class Map extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    console.log(props);

    const { latitude, longitude, size, zoom } = props;
    const { height, width } = size;

    this.state = {
      viewport: {
        height,
        latitude,
        longitude,
        width,
        zoom
      }
    };
  }

  updateViewport = (viewport: Viewport) => {
    this.setState({
      viewport
    });
  };

  render() {
    const { markers } = this.props;
    const { viewport } = this.state;
    const { height, latitude, longitude, width, zoom } = viewport;

    return (
      <ReactMapGL
        height={height}
        latitude={latitude}
        longitude={longitude}
        mapboxApiAccessToken="pk.eyJ1Ijoic3RpdmF1Z29pbiIsImEiOiJjamVtNzBjcnQwMWs0MzNwYjFzd2kyMTNkIn0.fDvaDXP3YIS4YvLWcqEnvQ"
        onViewportChange={console.log}
        mapStyle="mapbox://styles/stivaugoin/cjo3181cg3hpx2spq0gg221fe"
        width={width}
        zoom={zoom}
      >
        <div style={{ position: "absolute", right: 5, top: 5 }}>
          <NavigationControl
            onViewportChange={console.log}
            showCompass={false}
          />
        </div>
        {markers.map(marker => (
          <Marker
            offsetLeft={-12}
            offsetTop={-24}
            latitude={marker.latitude}
            longitude={marker.longitude}
          >
            <MapPin />
          </Marker>
        ))}
      </ReactMapGL>
    );
  }
}

export default Map;
