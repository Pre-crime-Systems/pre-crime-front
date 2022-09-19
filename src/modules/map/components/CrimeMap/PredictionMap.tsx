import React, { useEffect, useState } from 'react';
import Loading from '../../../../components/Loading/Loading';
import { useApi } from '../../../../hooks/useApi';
import { getPredictions } from '../../../../services/crime.service';
import CrimeFilters from '../CrimeFilters/CrimeFilters';
import GoogleMaps from '../GoogleMaps/GoogleMaps';
import './crimeMap.scss';

const PredictionMap: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [filteredData, setFilteredData] = useState<any>(null);
  const [filters, setFilters] = useState<any>(null);
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
      setFilters(null);
      setTimeout(() => {
        setFilteredData(data);
        setLoading(false);
      }, 1000);
    }
  }, [reset]);

  if (loading) {
    return <Loading />;
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
      </div>
    );
  }

  return null;
};
export default PredictionMap;
