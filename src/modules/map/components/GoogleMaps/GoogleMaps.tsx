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
  MAP_OPTIONS,
  MAP_STYLE,
  MAP_ZOOM,
} from '../../../../constants/google.constant';
import { buildInfo } from '../../utils/crime.util';
import './googleMaps.scss';

const libraries: Libraries = ['visualization'];

interface GoogleMapsProps {
  data: any;
  predictionMode?: boolean;
}

const GoogleMaps: React.FC<GoogleMapsProps> = (props: GoogleMapsProps) => {
  const { data, predictionMode = false } = props;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries,
  });
  const center = { lat: -12.0874512, lng: -77.0499421 };

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
    if (predictionMode) {
      map.data.addGeoJson(data);
      map.data.setStyle((feature: any) => {
        const percentage = feature.getProperty('predictionPercentage');
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
            district: event.feature.getProperty('name'),
            percentage: event.feature.getProperty('predictionPercentage'),
            zipCode: event.feature.getProperty('postalCode'),
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
    }
  };

  const onLoadHeatMap = (heatmapLayer: any) => {
    heatmapLayer.set('gradient', HEATMAP_GRADIENT);
    heatmapLayer.set('radius', HEATMAP_RADIUS);
  };

  const parserData = () => {
    return data?.map((crime: any) => {
      return new google.maps.LatLng(crime?.latitude, crime?.longitude);
    });
  };

  return isLoaded ? (
    <GoogleMap
      center={center}
      mapContainerStyle={MAP_STYLE}
      onLoad={onLoadMap}
      options={MAP_OPTIONS}
      zoom={MAP_ZOOM}
    >
      {!predictionMode && (
        <HeatmapLayer data={parserData()} onLoad={onLoadHeatMap} />
      )}
    </GoogleMap>
  ) : null;
};
export default GoogleMaps;
