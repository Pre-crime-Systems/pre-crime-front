import React, { useEffect, useState } from 'react';
import Card from '../../../../components/Card/Card';
import Loading from '../../../../components/Loading/Loading';
import { crimePredictionTimeRange } from '../../../../constants/crime.constant';
import { CrimePredictionFilters } from '../../../../models/crime.model';
import CrimeFilters from '../CrimeFilters/CrimeFilters';
import GoogleMaps from '../GoogleMaps/GoogleMaps';
import './crimeMap.scss';

interface PredictionMapProps {
  loading: boolean;
  data: any;
}

const PredictionMap: React.FC<PredictionMapProps> = (
  props: PredictionMapProps
) => {
  const { data: dataProps, loading: loadingProps } = props;
  const [data, setData] = useState<any>(dataProps);
  const [filteredData, setFilteredData] = useState<any>(null);
  const [filters, setFilters] = useState<CrimePredictionFilters>({
    timeRange: crimePredictionTimeRange,
  });
  const [loading, setLoading] = useState<boolean>(loadingProps);
  const [reset, setReset] = useState<any>(null);

  useEffect(() => {
    setData(dataProps);
    setFilteredData(dataProps);
    setLoading(loadingProps);
  }, [dataProps, loadingProps]);

  useEffect(() => {
    if (filters && data) {
      setLoading(true);
      setFilteredData(null);
      setTimeout(() => {
        setFilteredData(data);
        setLoading(false);
      }, 400);
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
      }, 200);
    }
  }, [reset]);

  if (loading) {
    return <Loading title="Cargando predicción de delitos" />;
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
