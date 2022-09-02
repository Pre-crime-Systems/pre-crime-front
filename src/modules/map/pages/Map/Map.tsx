import React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import Card from '../../../../components/Card/Card';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import HeatMap from '../../components/HeatMap/HeatMap';
import './map.scss';

const API_KEY = 'AIzaSyCM3Dm-SQp5TYZLHRjEYfmGuUG3A1MfS8E';

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const Map: React.FC = () => {
  return (
    <MainLayout className="MapPage">
      <section className="MapPage__Container">
        <Wrapper apiKey={API_KEY} render={render}>
          <HeatMap />
        </Wrapper>
        <Card className="MapPage__Container__Filters">
          <Input placeholder="Fecha"></Input>
          <Input placeholder="Hora"></Input>
          <Input placeholder="Dirección"></Input>
          <Button buttonType="secondary">Filtrar</Button>
        </Card>
        <Button className="MapPage__Container__Predict" buttonType="primary">
          Predecir
        </Button>
      </section>
    </MainLayout>
  );
};

export default Map;
