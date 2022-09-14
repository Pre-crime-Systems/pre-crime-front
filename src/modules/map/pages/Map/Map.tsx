import React, { useState } from 'react';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import CrimeFilters from '../../components/CrimeFilters/CrimeFilters';
import CrimeMap from '../../components/CrimeData/CrimeMap';
import PredictionMap from '../../components/CrimeData/PredictionMap';
import './map.scss';

const Map: React.FC = () => {
  const [predictionMode, setPredictionMode] = useState<boolean>(false);
  const [filters, setFilters] = useState<any>(null);

  return (
    <MainLayout className="mapPage">
      <CrimeFilters
        className="mapPage__filters"
        predictionMode={predictionMode}
        setFilters={(filters) => {
          setFilters(filters);
        }}
        setPredictionMode={(value) => {
          setPredictionMode(value);
        }}
      />
      <section className="mapPage__map">
        {!predictionMode && <CrimeMap filters={filters} />}
        {predictionMode && <PredictionMap filters={filters} />}
      </section>
    </MainLayout>
  );
};

export default Map;
