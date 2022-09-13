import React, { useEffect, useState } from 'react';
import Loading from '../../../../components/Loading/Loading';
import { useApi } from '../../../../hooks/useApi';
import { getCrimes } from '../../../../services/crime.service';
import GoogleMaps from '../GoogleMaps/GoogleMaps';

const CrimeMap: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [responseEndpoint, callEndpoint] = useApi();

  useEffect(() => {
    if (loading && responseEndpoint?.data) {
      setLoading(false);
      setData(responseEndpoint?.data);
    } else if (!loading && responseEndpoint?.data === null) {
      setLoading(true);
      callEndpoint(getCrimes());
    }
  }, [responseEndpoint]);

  if (loading) {
    return <Loading />;
  }

  if (data) {
    return <GoogleMaps data={data}></GoogleMaps>;
  }

  return null;
};
export default CrimeMap;
