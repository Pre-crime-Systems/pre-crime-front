import React from 'react';
import GoogleMap from './GoogleMap';
import GoogleMarker from './GoogleMarker';

const HeatMap: React.FC = () => {
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = React.useState(12);
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: -12.0879652,
    lng: -77.0510096,
  });

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

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
    </GoogleMap>
  );
};
export default HeatMap;
