import React, { useState } from 'react';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import CrimeFilters from '../../components/CrimeFilters/CrimeFilters';
import CrimeMap from '../../components/CrimeData/CrimeMap';
import PredictionMap from '../../components/CrimeData/PredictionMap';
import './map.scss';

const Map: React.FC = () => {
  const [viewPredictions, setViewPredictions] = useState<boolean>(false);

  return (
    <MainLayout className="mapPage">
      <CrimeFilters
        className="mapPage__filters"
        mode={viewPredictions}
        setMode={(value) => {
          setViewPredictions(value);
        }}
      />
      <section className="mapPage__map">
        {!viewPredictions && <CrimeMap />}
        {viewPredictions && <PredictionMap />}
      </section>
    </MainLayout>
  );
};

export default Map;
