import React, { useEffect, useState } from 'react';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import Card from '../../../../components/Card/Card';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import MapLayout from '../../components/MapLayout/MapLayout';
import './map.scss';

import { loadMapApi } from '../../utils/GoogleMapsUtils';

const Map: React.FC = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', function () {
      setScriptLoaded(true);
    })
  }, []);


  return (
    <MainLayout className="MapPage">
      <section className="MapPage__Container">
          {/*
            {scriptLoaded && (
              <MapLayout mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl={true}
              />
            )}
          */}
          <img className="MapPage__Container__Map" src="https://maps.googleapis.com/maps/api/staticmap?center=40.714%2c%20-73.998&zoom=12&size=800x350&key=AIzaSyCM3Dm-SQp5TYZLHRjEYfmGuUG3A1MfS8E" alt="mapa" />
          <Card className="MapPage__Container__Filters">
            
            <Input placeholder="Fecha"></Input>
            <Input placeholder="Hora"></Input>
            <Input placeholder="Dirección"></Input>
            <Button buttonType="secondary">Filtrar</Button>
          </Card>
          <Button className="MapPage__Container__Predict" buttonType="primary">Predecir</Button>
      </section>
    </MainLayout>
  );
};

export default Map;