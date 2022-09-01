import React from 'react';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import Card from '../../../../components/Card/Card';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import './map.scss';

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Map: React.FC = () => {
  return (
    <MainLayout className="MapPage">
      <>
        <section className="MapPage__Map">
            <Card className="MapPage__Map__Filters">
                <Input placeholder="Dirección"></Input>
                <Input placeholder="Dirección"></Input>
                <Input placeholder="Dirección"></Input>
                <Button buttonType="secondary">Filtrar</Button>
            </Card>
            <Button buttonType="primary">Predecir</Button>
        </section>
      </>
    </MainLayout>
  );
};

export default Map;