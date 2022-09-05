import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import { API_KEY } from '../../../../constants/google.constant';

const HeatMap: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
  });
  const center = { lat: 37.775, lng: -122.434 };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        flexGrow: '1',
        height: '100%',
      }}
      zoom={13}
      center={center}
    ></GoogleMap>
  ) : null;
};
export default HeatMap;
