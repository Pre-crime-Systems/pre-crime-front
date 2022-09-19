import React, { useState } from 'react';
import cx from 'classnames';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import HistoricalMap from '../../components/CrimeMap/HistoricalMap';
import PredictionMap from '../../components/CrimeMap/PredictionMap';
import './map.scss';

const Map: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

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
          {tabIndex === 1 && <PredictionMap />}
        </div>
      </section>
    </MainLayout>
  );
};

export default Map;
