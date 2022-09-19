import React, { useEffect, useState } from 'react';
import Loading from '../../../../components/Loading/Loading';
import { useApi } from '../../../../hooks/useApi';
import {
  getCrimes,
  getHistoricalCrimesByFilters,
} from '../../../../services/crime.service';
import CrimeFilters from '../CrimeFilters/CrimeFilters';
import GoogleMaps from '../GoogleMaps/GoogleMaps';
import './crimeMap.scss';

const HistoricalMap: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [filteredData, setFilteredData] = useState<any>(null);
  const [filters, setFilters] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [reset, setReset] = useState<any>(null);
  const [responseEndpoint, callEndpoint] = useApi();
  const [responseFilters, callFilters] = useApi();

  useEffect(() => {
    if (loading && responseEndpoint?.data) {
      setLoading(false);
      setData(responseEndpoint?.data);
      setFilteredData(responseEndpoint?.data);
    } else if (!loading && responseEndpoint?.data === null) {
      setLoading(true);
      callEndpoint(getCrimes());
    }
  }, [responseEndpoint]);

  useEffect(() => {
    if (loading && responseFilters?.data) {
      setLoading(false);
      setFilteredData(responseFilters?.data);
    }
  }, [responseFilters]);

  useEffect(() => {
    if (filters && data) {
      setLoading(true);
      callFilters(getHistoricalCrimesByFilters(filters));
    }
  }, [filters]);

  useEffect(() => {
    if (reset && data) {
      setFilteredData(data);
    }
  }, [reset]);

  if (loading) {
    return <Loading />;
  }

  if (data) {
    return (
      <div className="crimeMap">
        <GoogleMaps data={filteredData} filters={filters} />
        <CrimeFilters
          className="crimeMap__filters"
          filters={filters}
          onClearFilters={setReset}
          predictionMode={false}
          setFilters={setFilters}
        />
      </div>
    );
  }

  return null;
};
export default HistoricalMap;