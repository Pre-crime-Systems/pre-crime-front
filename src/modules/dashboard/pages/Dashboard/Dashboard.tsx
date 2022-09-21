import React, { useEffect, useState } from 'react';
import Card from '../../../../components/Card/Card';
import Loading from '../../../../components/Loading/Loading';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import Select from '../../../../components/Select/Select';
import { crimeQuantityFilterOptions } from '../../../../constants/dashboard.constant';
import { useApi } from '../../../../hooks/useApi';
import {
  CrimeQuantityFilter,
  CrimeQuantityFilterType,
} from '../../../../models/dashboard.model';
import {
  getCrimesByDays,
  getCrimesByHours,
  getCrimesByMonths,
} from '../../../../services/crime.service';
import LineChart from '../../components/LineChart/LineChart';
import PieChart from '../../components/PieChart/PieChart';
import './dashboard.scss';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [crimeQuantityData, setCrimeQuantityData] = useState<any>(null);
  const [crimeQuantityFilterSelected, setCrimeQuantityFilterSelected] =
    useState<CrimeQuantityFilter>(crimeQuantityFilterOptions[0]);
  const [crimeQuantityResponse, callCrimeQuantityEndpoint] = useApi();

  useEffect(() => {
    if (loading && crimeQuantityResponse?.data) {
      setLoading(false);
      if (
        crimeQuantityFilterSelected?.value === CrimeQuantityFilterType.HOURS
      ) {
        const parsedData = crimeQuantityResponse?.data?.map((data: any) => {
          return { label: `${data?.hour} h`, value: data?.quantity };
        });
        setCrimeQuantityData(parsedData);
      } else if (
        crimeQuantityFilterSelected?.value === CrimeQuantityFilterType.DAYS
      ) {
        const parsedData = crimeQuantityResponse?.data?.map((data: any) => {
          return { label: `${data?.day}`, value: data?.quantity };
        });
        setCrimeQuantityData(parsedData);
      } else if (
        crimeQuantityFilterSelected?.value === CrimeQuantityFilterType.MONTHS
      ) {
        const parsedData = crimeQuantityResponse?.data?.map((data: any) => {
          return { label: `${data?.month}`, value: data?.quantity };
        });
        setCrimeQuantityData(parsedData);
      }
    } else if (!loading && crimeQuantityResponse?.data === null) {
      setLoading(true);
      callCrimeQuantityEndpoint(getCrimesByHours());
    }
  }, [crimeQuantityResponse]);

  return (
    <MainLayout className="dashboardPage">
      {loading && <Loading />}
      <section className="dashboardPage__cards">
        <Card className="chartCard">
          <div className="chartCard__title">
            <h2 className="titleText">Crimen por tipo de delito</h2>
            <Select
              placeholder="Filtro por mes"
              options={[
                { label: 'Enero', value: 1 },
                { label: 'Febrero', value: 2 },
                { label: 'Marzo', value: 3 },
                { label: 'Abril', value: 4 },
              ]}
            />
          </div>
          <div>
            <PieChart />
          </div>
        </Card>
        <Card className="chartCard">
          <div className="chartCard__title">
            <h2 className="titleText">Cantidad de crímenes</h2>
            <Select
              placeholder="Filtro por tiempo"
              options={crimeQuantityFilterOptions}
              value={crimeQuantityFilterSelected}
              onChange={(newValue) => {
                setLoading(true);
                setCrimeQuantityFilterSelected(newValue);
                if (newValue?.value === CrimeQuantityFilterType.HOURS) {
                  callCrimeQuantityEndpoint(getCrimesByHours());
                } else if (newValue?.value === CrimeQuantityFilterType.DAYS) {
                  callCrimeQuantityEndpoint(getCrimesByDays());
                } else if (newValue?.value === CrimeQuantityFilterType.MONTHS) {
                  callCrimeQuantityEndpoint(getCrimesByMonths());
                }
              }}
            />
          </div>
          <div>
            {crimeQuantityData && <LineChart data={crimeQuantityData} />}
          </div>
        </Card>
      </section>
    </MainLayout>
  );
};

export default Dashboard;
