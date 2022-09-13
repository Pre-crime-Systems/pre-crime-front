import React, { useEffect, useState } from 'react';
import Loading from '../../../../components/Loading/Loading';
import { useApi } from '../../../../hooks/useApi';
import { getPredictions } from '../../../../services/crime.service';
import GoogleMaps from '../GoogleMaps/GoogleMaps';

const PredictionMap: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<any>(null);
  const [responseEndpoint, callEndpoint] = useApi();

  useEffect(() => {
    if (loading && responseEndpoint?.data) {
      setLoading(false);
      setPredictions(responseEndpoint?.data);
    } else if (!loading && responseEndpoint?.data === null) {
      setLoading(true);
      callEndpoint(getPredictions());
    }
  }, [responseEndpoint]);

  if (loading) {
    return <Loading />;
  }

  return <GoogleMaps predictionMode data={predictions}></GoogleMaps>;
};
export default PredictionMap;
