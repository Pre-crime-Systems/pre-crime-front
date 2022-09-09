import React from 'react';
import {
  GoogleMap,
  HeatmapLayer,
  useJsApiLoader,
} from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { API_KEY } from '../../../../constants/google.constant';
const libraries: Libraries = ['visualization'];

interface HeatMapProps {
  crimes: any[];
}

const HeatMap: React.FC<HeatMapProps> = (props: HeatMapProps) => {
  const { crimes } = props;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries,
  });
  const center = { lat: -12.0874512, lng: -77.0499421 };
  const mapOptions = {
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    zoomControl: false,
  };

  const parserData = () => {
    return crimes?.map((crime) => {
      return new google.maps.LatLng(crime?.latitude, crime?.longitude);
    });
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        flexGrow: '1',
        height: '100%',
      }}
      zoom={12}
      center={center}
      options={mapOptions}
    >
      <HeatmapLayer data={parserData()} />
    </GoogleMap>
  ) : null;
};
export default HeatMap;
