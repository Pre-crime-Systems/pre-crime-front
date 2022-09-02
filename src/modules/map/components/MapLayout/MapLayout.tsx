import React, { useEffect, useRef, useState } from 'react';

import './maplayout.scss';

interface IMapLayout{ 
  mapType: google.maps.MapTypeId,
  mapTypeControl?: boolean;
}

interface MapLayoutProps {
  children: React.ReactElement;
  className?: string;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;

const MapLayout: React.FC<IMapLayout> = ({mapType, mapTypeControl = false}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();

  const startMap = ():void => {
    if(!map){
      defaultMapStart();
    }
  };
  useEffect(startMap, [map]);

  const defaultMapStart = (): void => {
    const defaultAddress = new google.maps.LatLng(65, 13);
    initMap(5, defaultAddress);
  }
  
  const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
    if(ref.current) {
      setMap(
        new google.maps.Map(ref.current, {
          zoom: zoomLevel,
          center: address,
          mapTypeControl: mapTypeControl,
          streetViewControl: false,
          zoomControl: true,
          mapTypeId: mapType
        })
      );
    }
  };

  return (
    <div className="Map__Container">
      <div ref={ref} className="Map__Container__Map"></div>
    </div>
  );
};

export default MapLayout;