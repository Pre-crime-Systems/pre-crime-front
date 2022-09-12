import React, { useEffect, useState } from 'react';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import Card from '../../../../components/Card/Card';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import Loading from '../../../../components/Loading/Loading';
import { useApi } from '../../../../hooks/useApi';
import { getCrimes } from '../../../../services/crime.service';
import CrimeMap from '../../components/CrimeMap/CrimeMap';
import './map.scss';
import CrimeFilters from '../../components/CrimeFilters/CrimeFilters';
import PredictionMap from '../../components/CrimeMap/PredictionMap';

const Map: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [viewPredictions, setViewPredictions] = useState<boolean>(false);
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
    <MainLayout className="mapPage">
      {loading && <Loading />}
      <CrimeFilters
        className="mapPage__filters"
        mode={viewPredictions}
        setMode={(value) => {
          setViewPredictions(value);
        }}
      />
      <section className="mapPage__map">
        {crimes && !viewPredictions && <CrimeMap crimes={crimes} />}
        {crimes && viewPredictions && <PredictionMap crimes={crimes} />}
      </section>
    </MainLayout>
  );
};

export default Map;
