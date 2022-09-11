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
  const zoom = 12;
  const center = { lat: -12.0874512, lng: -77.0499421 };
  const mapOptions = {
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    zoomControl: false,
  };

  const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    '<div id="bodyContent">' +
    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    'sandstone rock formation in the southern part of the ' +
    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
    'south west of the nearest large town, Alice Springs; 450&#160;km ' +
    '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
    'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
    'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
    'Aboriginal people of the area. It has many springs, waterholes, ' +
    'rock caves and ancient paintings. Uluru is listed as a World ' +
    'Heritage Site.</p>' +
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
    '(last visited June 22, 2009).</p>' +
    '</div>' +
    '</div>';

  const onLoadMap = (map: any) => {
    map.data.loadGeoJson(
      'https://raw.githubusercontent.com/joseluisq/peru-geojson-datasets/master/lima_callao_distritos.geojson'
    );
    map.data.setStyle((feature: any) => {
      const ascii = feature.getProperty('ascii');
      const color = ascii > 91 ? 'red' : 'transparent';
      return {
        fillColor: color,
        strokeWeight: 1,
        strokeColor: '#024481',
      };
    });
    map.data.addListener('click', function (event: any) {
      map.data.overrideStyle(event.feature, { fillColor: 'red' });
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
        position: event.latLng,
      });
      infowindow.open({
        map,
        shouldFocus: false,
      });
    });
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
      center={center}
      mapContainerStyle={{
        flexGrow: '1',
        height: '100%',
      }}
      onLoad={onLoadMap}
      options={mapOptions}
      zoom={zoom}
    >
      <HeatmapLayer data={parserData()} onLoad={onLoadHeatMap} />
    </GoogleMap>
  ) : null;
};
export default HeatMap;
