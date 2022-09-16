import React, { useEffect, useState } from 'react';
import Loading from '../../../../components/Loading/Loading';
import { useApi } from '../../../../hooks/useApi';
import { getPredictions } from '../../../../services/crime.service';
import GoogleMaps from '../GoogleMaps/GoogleMaps';

interface PredictionMapProps {
  filters: any;
  resetData: any;
}

const PredictionMap: React.FC<PredictionMapProps> = (
  props: PredictionMapProps
) => {
  const { filters, resetData } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [filteredData, setFilteredData] = useState<any>(null);
  const [selectedHour, setSelectedHour] = useState<number>(0);
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
      setSelectedHour(filters?.time?.value);
      setFilteredData(data);
    }
  }, [filters]);

  useEffect(() => {
    if (resetData) {
      setSelectedHour(0);
      setFilteredData(data);
    }
  }, [resetData]);

  if (loading) {
    return <Loading />;
  }

  if (data) {
    return (
      <GoogleMaps
        predictionMode
        data={filteredData}
        selectedHour={selectedHour}
      ></GoogleMaps>
    );
  }

  return null;
};
export default PredictionMap;
