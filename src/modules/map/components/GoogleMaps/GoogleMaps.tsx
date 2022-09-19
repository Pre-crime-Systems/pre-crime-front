import React, { useCallback, useRef, useState } from 'react';
import {
  DirectionsRenderer,
  DirectionsService,
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
import {
  buildInfo,
  getDirection,
  getZipCodeColor,
  IDirection,
} from '../../utils/map.util';
import './googleMaps.scss';

const libraries: Libraries = ['visualization'];

interface GoogleMapsProps {
  data: any;
  filters: any;
  predictionMode?: boolean;
}

const GoogleMaps: React.FC<GoogleMapsProps> = (props: GoogleMapsProps) => {
  const { data, filters, predictionMode = false } = props;
  const [direction, setDirection] = useState<IDirection | null>(null);
  const [directionResponse, setDirectionResponse] = useState<any>(null);
  const selectedHour = predictionMode ? filters?.time?.value : 0;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries,
  });
  const center = { lat: -12.0874512, lng: -77.0499421 };

  const onLoadMap = (map: any) => {
    if (predictionMode) {
      map.data.addGeoJson(data);
      map.data.setStyle((feature: any) => {
        const percentageArray = feature.getProperty('predictionPercentage');
        const color = getZipCodeColor(percentageArray[selectedHour]);
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
            percentage: event.feature.getProperty('predictionPercentage')[
              selectedHour
            ],
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

  if (predictionMode && direction == null) {
    const response = getDirection(data?.features, selectedHour);
    setDirection(response);
  }
  let count = useRef(0);
  const directionsCallback = useCallback((response: any) => {
    if (response !== null) {
      if (response.status === 'OK' && count.current < 1) {
        count.current += 1;
        setDirectionResponse(response);
      }
    }
  }, []);

  return isLoaded ? (
    <GoogleMap
      center={center}
      mapContainerStyle={MAP_STYLE}
      onLoad={onLoadMap}
      options={MAP_OPTIONS}
      zoom={MAP_ZOOM}
    >
      {predictionMode && direction && (
        <DirectionsService
          options={{
            destination: direction?.destination,
            origin: direction?.origin,
            travelMode: google.maps.TravelMode.DRIVING,
            optimizeWaypoints: true,
            waypoints: direction?.waypoints,
          }}
          callback={directionsCallback}
        />
      )}
      {predictionMode && directionResponse && (
        <DirectionsRenderer
          options={{
            directions: directionResponse,
          }}
        />
      )}
      {!predictionMode && (
        <HeatmapLayer data={parserData()} onLoad={onLoadHeatMap} />
      )}
    </GoogleMap>
  ) : null;
};
export default GoogleMaps;
