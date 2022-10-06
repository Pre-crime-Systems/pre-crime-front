export const LIMA_GEOJSON_URL =
  'https://raw.githubusercontent.com/joseluisq/peru-geojson-datasets/master/lima_callao_distritos.geojson';
export const HEATMAP_GRADIENT = [
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
export const HEATMAP_RADIUS = 20;
export const MAP_OPTIONS = {
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
  zoomControl: false,
  styles: [
    //https://developers.google.com/maps/documentation/javascript/style-reference#style-features
    {
      elementType: 'labels',
      featureType: 'poi.business',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels',
      featureType: 'transit.station.bus',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ],
};
export const MAP_STYLE = {
  flexGrow: '1',
  height: '100%',
  borderRadius: '0.5rem',
};
export const MAP_ZOOM = 12;
