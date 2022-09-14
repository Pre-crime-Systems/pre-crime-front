import React, { useEffect, useState } from 'react';
import Loading from '../../../../components/Loading/Loading';
import { useApi } from '../../../../hooks/useApi';
import { getCrimes } from '../../../../services/crime.service';
import GoogleMaps from '../GoogleMaps/GoogleMaps';

interface CrimeMapProps {
  filters: any;
}

const CrimeMap: React.FC<CrimeMapProps> = (props: CrimeMapProps) => {
  const { filters } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [filteredData, setFilteredData] = useState<any>(null);
  const [responseEndpoint, callEndpoint] = useApi();

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
    if (filters && data) {
      const filtered = data?.filter(
        (crime: any) => crime?.address?.indexOf(filters?.time?.value) > -1
      );
      setFilteredData(filtered);
    }
  }, [filters]);

  if (loading) {
    return <Loading />;
  }

  if (data) {
    return <GoogleMaps data={filteredData}></GoogleMaps>;
  }

  return null;
};
export default CrimeMap;
