import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import HistoricalMap from '../../components/CrimeMap/HistoricalMap';
import PredictionMap from '../../components/CrimeMap/PredictionMap';
import { useApi } from '../../../../hooks/useApi';
import { getPredictions } from '../../../../services/crime.service';
import './map.scss';

const Map: React.FC = () => {
  const [predictionLoading, setPredictionLoading] = useState<boolean>(false);
  const [predictionData, setPredictionData] = useState<any>(null);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [responseEndpoint, callEndpoint] = useApi();

  useEffect(() => {
    if (predictionLoading && responseEndpoint?.data) {
      setPredictionLoading(false);
      setPredictionData(responseEndpoint?.data);
    } else if (!predictionLoading && responseEndpoint?.data === null) {
      setPredictionLoading(true);
      callEndpoint(getPredictions());
    }
  }, [responseEndpoint]);

  return (
    <MainLayout className="mapPage">
      <section className="mapPage__tabs">
        <div className="tabList">
          <div
            className={cx(
              'tabList__item',
              tabIndex === 0 && 'tabList__item--active'
            )}
            onClick={() => {
              setTabIndex(0);
            }}
          >
            <p className="tabTitle">Historial</p>
          </div>
          <div
            className={cx(
              'tabList__item',
              tabIndex === 1 && 'tabList__item--active'
            )}
            onClick={() => {
              setTabIndex(1);
            }}
          >
            <p className="tabTitle">Predicción</p>
          </div>
        </div>
        <div className="tabContent">
          {tabIndex === 0 && <HistoricalMap />}
          {tabIndex === 1 && (
            <PredictionMap data={predictionData} loading={predictionLoading} />
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Map;
