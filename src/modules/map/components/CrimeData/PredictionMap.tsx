import React, { useEffect, useState } from 'react';
import Loading from '../../../../components/Loading/Loading';
import { useApi } from '../../../../hooks/useApi';
import { getPredictions } from '../../../../services/crime.service';
import GoogleMaps from '../GoogleMaps/GoogleMaps';

interface PredictionMapProps {
  filters: any;
}

const PredictionMap: React.FC<PredictionMapProps> = (
  props: PredictionMapProps
) => {
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
      callEndpoint(getPredictions());
    }
  }, [responseEndpoint]);

  useEffect(() => {
    if (filters && data) {
      const filteredFeatures = data?.features?.filter(
        (feature: any) =>
          feature?.properties?.name?.charAt(0) === filters?.time?.value
      );
      setFilteredData({ type: data?.type, features: filteredFeatures });
    }
  }, [filters]);

  if (loading) {
    return <Loading />;
  }

  if (data) {
    return <GoogleMaps predictionMode data={filteredData}></GoogleMaps>;
  }

  return null;
};
export default PredictionMap;
