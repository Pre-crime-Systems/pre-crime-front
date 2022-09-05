import React from 'react';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import Card from '../../../../components/Card/Card';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import HeatMap from '../../components/HeatMap/HeatMap';
import './map.scss';

const Map: React.FC = () => {
  return (
    <MainLayout className="MapPage">
      <section className="MapPage__Container">
        <HeatMap />
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
