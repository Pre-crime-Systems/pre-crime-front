import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  HeatmapLayer,
  useJsApiLoader,
} from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import {
  HEATMAP_GRADIENT,
  HEATMAP_RADIUS,
  MAP_OPTIONS,
  MAP_STYLE,
  MAP_ZOOM,
} from '../../../../constants/google.constant';
import {
  buildInfo,
  getAveragePercentageOfCrimeByZipCode,
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
  const timeRangeFilter = predictionMode ? filters?.timeRange : null;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
    libraries,
  });
  const center = { lat: -12.0874512, lng: -77.0499421 };

  const onLoadMap = (map: any) => {
    if (predictionMode) {
      map.data.addGeoJson(data);
      map.data.setStyle((feature: google.maps.Data.Feature) => {
        const percentage = getAveragePercentageOfCrimeByZipCode(
          feature,
          timeRangeFilter
        );
        const color = getZipCodeColor(percentage);
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
            percentage: getAveragePercentageOfCrimeByZipCode(
              event.feature,
              timeRangeFilter
            ),
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

  let count = useRef(0);
  const directionsCallback = useCallback((response: any) => {
    if (response !== null) {
      if (response.status === 'OK' && count.current < 1) {
        count.current += 1;
        setDirectionResponse(response);
      }
    }
  }, []);

  const onLoadHeatMap = (heatmapLayer: any) => {
    heatmapLayer.set('gradient', HEATMAP_GRADIENT);
    heatmapLayer.set('radius', HEATMAP_RADIUS);
  };

  const parserData = () => {
    return data?.map((crime: any) => {
      return new google.maps.LatLng(crime?.latitude, crime?.longitude);
    });
  };

  useEffect(() => {
    if (data && predictionMode && timeRangeFilter && direction == null) {
      const response = getDirection(data.features, timeRangeFilter);
      setDirection(response);
    }
  }, [direction]);

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
