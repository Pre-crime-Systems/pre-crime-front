import React from 'react';
import {
  GoogleMap,
  HeatmapLayer,
  useJsApiLoader,
} from '@react-google-maps/api';

import { API_KEY } from '../../../../constants/google.constant';

const HeatMap: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: ['visualization'],
  });
  const center = { lat: 37.775, lng: -122.434 };

  const onLoad = (heatmapLayer: any) => {
    console.log('HeatmapLayer onLoad heatmapLayer: ', heatmapLayer);
  };

  const onUnmount = (heatmapLayer: any) => {
    console.log('HeatmapLayer onUnmount heatmapLayer: ', heatmapLayer);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        flexGrow: '1',
        height: '100%',
      }}
      zoom={13}
      center={center}
    >
      <HeatmapLayer
        onLoad={onLoad}
        onUnmount={onUnmount}
        data={[
          new google.maps.LatLng(37.782, -122.447),
          new google.maps.LatLng(37.782, -122.445),
          new google.maps.LatLng(37.782, -122.443),
          new google.maps.LatLng(37.782, -122.441),
          new google.maps.LatLng(37.782, -122.439),
          new google.maps.LatLng(37.782, -122.437),
          new google.maps.LatLng(37.782, -122.435),
          new google.maps.LatLng(37.785, -122.447),
          new google.maps.LatLng(37.785, -122.445),
          new google.maps.LatLng(37.785, -122.443),
          new google.maps.LatLng(37.785, -122.441),
          new google.maps.LatLng(37.785, -122.439),
          new google.maps.LatLng(37.785, -122.437),
          new google.maps.LatLng(37.785, -122.435),
        ]}
      />
    </GoogleMap>
  ) : null;
};
export default HeatMap;
