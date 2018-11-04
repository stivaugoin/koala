import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

import { getItem, setItem } from "./asyncLocalStorage";

const setLatLng = places =>
  new Promise(async resolve => {
    const geocodingClient = mbxGeocoding({
      accessToken:
        "pk.eyJ1Ijoic3RpdmF1Z29pbiIsImEiOiJjamVtNzBjcnQwMWs0MzNwYjFzd2kyMTNkIn0.fDvaDXP3YIS4YvLWcqEnvQ"
    });

    // Retrieve all coordinates saved into local storage
    const existingLatLng = await getItem("latLng");
    const latLng = existingLatLng ? JSON.parse(existingLatLng) : {};

    // Set existing coordinates to places
    const allPlaces = places.map(place => {
      const coordinates = latLng[place.name];

      if (coordinates) {
        return {
          ...place,
          coordinates
        };
      }

      return place;
    });

    // Build array for Promise.all() with only places without coordinates
    const promise = allPlaces
      .filter(({ coordinates }) => !coordinates)
      .map(({ name }) =>
        // Documentation https://www.mapbox.com/api-documentation/?language=JavaScript#geocoding
        geocodingClient
          .forwardGeocode({
            query: name,
            language: ["fr"],
            limit: 1
          })
          .send()
      );

    // Fetch Mapbox to retrieve coordinates
    await Promise.all(promise).then(result => {
      result.forEach(place => {
        const { coordinates } = place.body.features[0].geometry;
        const { query } = place.request.params;

        // Add coordinates to place
        const index = allPlaces.findIndex(({ name }) => name === query);
        allPlaces[index].coordinates = coordinates;

        // Prepare coordinates to save into local storage
        latLng[place.request.params.query] = coordinates;
      });
    });

    // Save coordinates into local storage
    await setItem("latLng", JSON.stringify(latLng));

    resolve(allPlaces);
  });

export default setLatLng;
