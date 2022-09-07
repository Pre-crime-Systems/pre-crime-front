import React, { useState } from 'react';
import {
  GoogleMap,
  HeatmapLayer,
  useJsApiLoader,
} from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { API_KEY } from '../../../../constants/google.constant';

const libraries: Libraries = ['visualization'];
const HeatMap: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries,
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
    >
      <HeatmapLayer
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
