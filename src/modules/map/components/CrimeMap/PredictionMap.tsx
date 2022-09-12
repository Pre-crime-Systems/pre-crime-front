import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { API_KEY } from '../../../../constants/google.constant';
import { buildInfo } from '../../utils/crime.util';
import { ZIP_CODES_DATA } from '../../utils/zipCodes.util';
import './crimeMap.scss';

const libraries: Libraries = ['visualization'];

interface PredictionMapProps {
  crimes: any[];
}

const PredictionMap: React.FC<PredictionMapProps> = (
  props: PredictionMapProps
) => {
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

  const getColor = (percentage: number) => {
    if (percentage > 0 && percentage < 40) {
      return 'yellow';
    } else if (percentage >= 40 && percentage < 80) {
      return 'orange';
    } else if (percentage >= 80) {
      return 'red';
    }
  };

  const onLoadMap = (map: any) => {
    map.data.addGeoJson(ZIP_CODES_DATA);
    map.data.setStyle((feature: any) => {
      const percentage = Math.floor(Math.random() * 100) + 1;
      const color = getColor(percentage);
      return {
        fillColor: color,
        strokeWeight: 1,
        strokeColor: '#024481',
      };
    });

    let prevInfo: any = null;
    map.data.addListener('click', function (event: any) {
      const infoWindow = new google.maps.InfoWindow({
        content: buildInfo({
          district: event.feature.getProperty('pnm'),
          zipCode: event.feature.getProperty('wpc_id'),
          percentage: 50,
        }),
        position: event.latLng,
      });
      if (prevInfo !== null && prevInfo !== infoWindow) {
        prevInfo?.close();
      }
      infoWindow.open({
        map,
        shouldFocus: false,
      });
      prevInfo = infoWindow;
    });
  };

  return isLoaded ? (
    <GoogleMap
      center={center}
      mapContainerStyle={mapStyle}
      onLoad={onLoadMap}
      options={mapOptions}
      zoom={zoom}
    />
  ) : null;
};
export default PredictionMap;
