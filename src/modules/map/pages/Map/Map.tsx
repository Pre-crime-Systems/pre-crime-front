import React, { useState } from 'react';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import CrimeFilters from '../../components/CrimeFilters/CrimeFilters';
import CrimeMap from '../../components/CrimeData/CrimeMap';
import PredictionMap from '../../components/CrimeData/PredictionMap';
import './map.scss';

const Map: React.FC = () => {
  const [predictionMode, setPredictionMode] = useState<boolean>(false);
  const [filters, setFilters] = useState<any>(null);
  const [reset, setReset] = useState<any>(null);

  return (
    <MainLayout className="mapPage">
      <CrimeFilters
        className="mapPage__filters"
        predictionMode={predictionMode}
        onClearFilters={setReset}
        setFilters={setFilters}
        setPredictionMode={setPredictionMode}
      />
      <section className="mapPage__map">
        {!predictionMode && <CrimeMap filters={filters} resetData={reset} />}
        {predictionMode && (
          <PredictionMap filters={filters} resetData={reset} />
        )}
      </section>
    </MainLayout>
  );
};

export default Map;
