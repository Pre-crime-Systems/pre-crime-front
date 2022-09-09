import React, { useEffect, useState } from 'react';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import Card from '../../../../components/Card/Card';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import Loading from '../../../../components/Loading/Loading';
import { useApi } from '../../../../hooks/useApi';
import { getCrimes } from '../../../../services/crime.service';
import HeatMap from '../../components/HeatMap/HeatMap';
import './map.scss';

const Map: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [crimes, setCrimes] = useState<any>(null);
  const [responseEndpoint, callEndpoint] = useApi();

  useEffect(() => {
    if (loading && responseEndpoint?.data) {
      setLoading(false);
      setCrimes(responseEndpoint?.data);
    } else if (!loading && responseEndpoint?.data === null) {
      setLoading(true);
      callEndpoint(getCrimes());
    }
  }, [responseEndpoint]);

  return (
    <MainLayout className="MapPage">
      {loading && <Loading />}
      <section className="MapPage__Container">
        {crimes && <HeatMap crimes={crimes} />}
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
