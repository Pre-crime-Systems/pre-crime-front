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
  LIMA_GEOJSON_URL,
} from '../../../../constants/google.constant';
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

  const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    '<div id="bodyContent">' +
    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large </p>' +
    '</div>' +
    '</div>';

  const onLoadMap = (map: any) => {
    map.data.loadGeoJson(LIMA_GEOJSON_URL);
    map.data.setStyle((feature: any) => {
      const provi = feature.getProperty('provincia');
      const color = provi === 'LIMA' ? 'red' : 'blue';
      return {
        fillColor: color,
        strokeWeight: 1,
        strokeColor: '#024481',
      };
    });

    let prevInfo: any = null;
    map.data.addListener('click', function (event: any) {
      //set info
      const infoWindow = new google.maps.InfoWindow({
        content: contentString,
        position: event.latLng,
      });
      if (prevInfo !== null && prevInfo !== infoWindow) {
        prevInfo?.close();
      }
      //show info
      infoWindow.open({
        map,
        shouldFocus: false,
      });
      //save values
      prevInfo = infoWindow;
    });
  };

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
      onLoad={onLoadMap}
      options={mapOptions}
      zoom={zoom}
    >
      <HeatmapLayer data={parserData()} onLoad={onLoadHeatMap} />
    </GoogleMap>
  ) : null;
};
export default CrimeMap;
