export interface IDirection {
  origin: google.maps.LatLng | string;
  destination: google.maps.LatLng | string;
  waypoints: google.maps.DirectionsWaypoint[];
}

export const buildInfo = (eventProperties: any) => {
  return `<div class="crimeInfo">
		<h4 class="crimeInfo__title">${eventProperties?.district}</h4>
		<p class="crimeInfo__description">Probabilidad del crimen en el código postal ${
      eventProperties?.zipCode
    }</p>
		<p class="crimeInfo__item">Porcentaje: ${eventProperties?.percentage.toFixed(
      2
    )}</p>
	</div>`;
};

export const getAveragePercentageOfCrimeByZipCode = (
  feature: google.maps.Data.Feature,
  timeRange: any
) => {
  const percentages = feature.getProperty('predictionPercentage');
  let sumPercentages = 0;
  for (let index = timeRange?.min; index <= timeRange?.max; index++) {
    sumPercentages = sumPercentages + percentages[index];
  }
  return sumPercentages / (timeRange?.max - timeRange?.min);
};

export const getDirection = (features: any[], timeRange: any) => {
  let coords: google.maps.LatLng[] = [];
  let origin: google.maps.LatLng | string = '';
  let destination: google.maps.LatLng | string = '';
  let waypoints: google.maps.DirectionsWaypoint[] = [];

  features.forEach((feature) => {
    const percentages = feature.properties.predictionPercentage;
    let sumPercentages = 0;
    let averagePercentage = 0;
    for (let index = timeRange?.min; index <= timeRange?.max; index++) {
      sumPercentages = sumPercentages + percentages[index];
    }
    averagePercentage = sumPercentages / (timeRange?.max - timeRange?.min);

    if (averagePercentage >= 70) {
      const lat = feature.properties.y;
      const lng = feature.properties.x;
      coords.push(new google.maps.LatLng(lat, lng));
      waypoints.push({ location: new google.maps.LatLng(lat, lng) });
    }
  });

  origin = coords.shift() || '';
  destination = coords.pop() || '';

  waypoints.shift();
  waypoints.pop();

  const direction: IDirection = {
    origin,
    destination,
    waypoints,
  };

  console.log('direction', direction);

  return direction;
};

export const getZipCodeColor = (percentage: number) => {
  if (percentage >= 0 && percentage < 40) {
    return 'yellow';
  } else if (percentage >= 40 && percentage < 70) {
    return 'orange';
  } else if (percentage >= 70) {
    return 'red';
  }
};
