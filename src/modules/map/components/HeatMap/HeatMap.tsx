import React from 'react';
import GoogleMap from './GoogleMap';
import GoogleMarker from './GoogleMarker';
import GoogleHeatmap from './GoogleHeatmap';

const HeatMap: React.FC = () => {
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = React.useState(12);
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 37.782551,
    lng: -122.445368,
  });

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  function getPoints() {
    return [
      new google.maps.LatLng(37.782551, -122.445368),
      new google.maps.LatLng(37.782745, -122.444586),
      new google.maps.LatLng(37.782842, -122.443688),
      new google.maps.LatLng(37.782919, -122.442815),
    ];
  }

  return (
    <GoogleMap
      center={center}
      onClick={onClick}
      onIdle={onIdle}
      zoom={zoom}
      style={{ flexGrow: '1', height: '100%' }}
    >
      {clicks.map((latLng, i) => (
        <GoogleMarker key={i} position={latLng} />
      ))}
      {/* <GoogleHeatmap data={getPoints()} /> */}
    </GoogleMap>
  );
};
export default HeatMap;
