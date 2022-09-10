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

  const onLoadHeatMap = (heatmapLayer: any) => {
    const gradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)',
    ];
    heatmapLayer.set('gradient', gradient);
    heatmapLayer.set('radius', 20);
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
      zoom={13}
      center={center}
      options={mapOptions}
    >
      <HeatmapLayer data={parserData()} onLoad={onLoadHeatMap} />
    </GoogleMap>
  ) : null;
};
export default HeatMap;
