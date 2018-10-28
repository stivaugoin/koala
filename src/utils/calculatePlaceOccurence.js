const calculatePlaceOccurence = ({ individuals, places }) => {
  if (
    !individuals ||
    individuals.length === 0 ||
    !places ||
    places.length === 0
  ) {
    return [];
  }

  const allPlaces = [];

  places.forEach(p => {
    const place = p;
    const events = {
      births: 0,
      deaths: 0,
      total: 0
    };

    individuals.forEach(individual => {
      Object.keys(individual).forEach(event => {
        if (["births", "deaths"].includes(event)) {
          individual[event].forEach(person => {
            if (person && person.place && person.place.id === place.id) {
              events[event] += 1;
              events.total += 1;
            }
          });
        }
      });
    });

    delete place.count;

    allPlaces.push({
      ...place,
      ...events
    });
  });

  return allPlaces;
};

export default calculatePlaceOccurence;
