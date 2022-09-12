import React from 'react';
import {
  GoogleMap,
  HeatmapLayer,
  useJsApiLoader,
} from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import {
  API_KEY,
  HEATMAP_GRADIENT,
  HEATMAP_RADIUS,
} from '../../../../constants/google.constant';
import './crimeMap.scss';

const libraries: Libraries = ['visualization'];

interface CrimeMapProps {
  crimes: any[];
}

const CrimeMap: React.FC<CrimeMapProps> = (props: CrimeMapProps) => {
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
  const mapStyle = {
    flexGrow: '1',
    height: '100%',
    borderRadius: '0.5rem',
  };
  const zoom = 12;

  const onLoadHeatMap = (heatmapLayer: any) => {
    heatmapLayer.set('gradient', HEATMAP_GRADIENT);
    heatmapLayer.set('radius', HEATMAP_RADIUS);
  };

  const parserData = () => {
    return crimes?.map((crime) => {
      return new google.maps.LatLng(crime?.latitude, crime?.longitude);
    });
  };

  return isLoaded ? (
    <GoogleMap
      center={center}
      mapContainerStyle={mapStyle}
      options={mapOptions}
      zoom={zoom}
    >
      <HeatmapLayer data={parserData()} onLoad={onLoadHeatMap} />
    </GoogleMap>
  ) : null;
};
export default CrimeMap;
