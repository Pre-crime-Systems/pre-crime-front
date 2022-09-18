export interface IDirection {
  origin: google.maps.LatLng | string;
  destination: google.maps.LatLng | string;
  waypoints: google.maps.DirectionsWaypoint[];
}

export const buildInfo = (eventProperties: any) => {
  return `<div class="crimeInfo">
		<h4 class="crimeInfo__title">${eventProperties?.district}</h4>
		<p class="crimeInfo__description">Probabilidad del crimen en el código postal ${eventProperties?.zipCode}</p>
		<p class="crimeInfo__item">Porcentaje: ${eventProperties?.percentage}</p>
	</div>`;
};

export const getDirection = (features: any, selectedHour: number) => {
  let coords: google.maps.LatLng[] = [];
  let origin: google.maps.LatLng | string = '';
  let destination: google.maps.LatLng | string = '';
  let waypoints: google.maps.DirectionsWaypoint[] = [];

  features?.forEach((feature: any) => {
    const prediction = feature?.properties?.predictionPercentage[selectedHour];
    if (prediction >= 70) {
      const lat = feature?.properties?.y;
      const lng = feature?.properties?.x;
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

  return direction;
};

export const getZipCodeColor = (percentage: number) => {
  if (percentage >= 0 && percentage < 40) {
    return 'yellow';
  } else if (percentage >= 40 && percentage < 70) {
    return '#ff8324';
  } else if (percentage >= 70) {
    return '#b02753';
  }
};
