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
      if (latLng[place.name]) {
        const { coordinates, country, region } = latLng[place.name];
        return {
          ...place,
          coordinates,
          country,
          region
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
            types: ["place"],
            query: name,
            limit: 1
          })
          .send()
      );

    // Fetch Mapbox to retrieve coordinates
    await Promise.all(promise).then(result => {
      result.forEach(place => {
        if (
          place &&
          place.body &&
          place.body.features &&
          place.body.features.length > 0
        ) {
          const { context, geometry } = place.body.features[0];
          const { coordinates } = geometry;
          const { query } = place.request.params;

          // Get Region
          const { text: region } = context.find(({ id }) =>
            id.includes("region")
          );

          // Get Country
          const { text: country } = context.find(({ id }) =>
            id.includes("country")
          );

          // Add coordinates to place
          const index = allPlaces.findIndex(({ name }) => name === query);
          allPlaces[index].coordinates = coordinates;
          allPlaces[index].country = country;
          allPlaces[index].region = region;

          // Prepare coordinates to save into local storage
          latLng[place.request.params.query] = { coordinates, country, region };
        }
      });
    });

    // Save coordinates into local storage
    await setItem("latLng", JSON.stringify(latLng));

    resolve(allPlaces);
  });

export default setLatLng;
