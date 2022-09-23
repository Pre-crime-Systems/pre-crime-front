import React, { useEffect, useState } from 'react';
import Card from '../../../../components/Card/Card';
import Loading from '../../../../components/Loading/Loading';
import { crimePredictionTimeRange } from '../../../../constants/crime.constant';
import { useApi } from '../../../../hooks/useApi';
import { CrimePredictionFilters } from '../../../../models/crime.model';
import { getPredictions } from '../../../../services/crime.service';
import CrimeFilters from '../CrimeFilters/CrimeFilters';
import GoogleMaps from '../GoogleMaps/GoogleMaps';
import './crimeMap.scss';

const PredictionMap: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [filteredData, setFilteredData] = useState<any>(null);
  const [filters, setFilters] = useState<CrimePredictionFilters>({
    timeRange: crimePredictionTimeRange,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [reset, setReset] = useState<any>(null);
  const [responseEndpoint, callEndpoint] = useApi();

  useEffect(() => {
    if (loading && responseEndpoint?.data) {
      setLoading(false);
      setData(responseEndpoint?.data);
      setFilteredData(responseEndpoint?.data);
    } else if (!loading && responseEndpoint?.data === null) {
      setLoading(true);
      callEndpoint(getPredictions());
    }
  }, [responseEndpoint]);

  useEffect(() => {
    if (filters && data) {
      setLoading(true);
      setFilteredData(null);
      setTimeout(() => {
        setFilteredData(data);
        setLoading(false);
      }, 1000);
    }
  }, [filters]);

  useEffect(() => {
    if (reset && data) {
      setLoading(true);
      setFilteredData(null);
      setFilters({
        timeRange: crimePredictionTimeRange,
      });
      setTimeout(() => {
        setFilteredData(data);
        setLoading(false);
      }, 1000);
    }
  }, [reset]);

  if (loading) {
    return <Loading title="Cargando predicción de crímenes" />;
  }

  if (data) {
    return (
      <div className="crimeMap">
        <GoogleMaps data={filteredData} filters={filters} predictionMode />
        <CrimeFilters
          className="crimeMap__filters"
          filters={filters}
          onClearFilters={setReset}
          predictionMode={true}
          setFilters={setFilters}
        />
        <Card className="crimeMap__legend">
          <h3 className="legendTitle">Leyenda</h3>
          <section className="legendData">
            <div className="legendData__item">
              <div className="legendColor legendColor--yellow" />
              <p className="legendLabel"> Entre 0 y 40% de probabilidad</p>
            </div>
            <div className="legendData__item">
              <div className="legendColor legendColor--orange" />
              <p className="legendLabel"> Entre 40% y 70% de probabilidad</p>
            </div>
            <div className="legendData__item">
              <div className="legendColor legendColor--red" />
              <p className="legendLabel"> Más del 70% de probabilidad</p>
            </div>
          </section>
        </Card>
      </div>
    );
  }

  return null;
};
export default PredictionMap;
