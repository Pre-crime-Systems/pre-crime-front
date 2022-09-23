import React, { useEffect, useState } from 'react';
import Card from '../../../../components/Card/Card';
import Loading from '../../../../components/Loading/Loading';
import MainLayout from '../../../../components/MainLayout/MainLayout';
import Select from '../../../../components/Select/Select';
import {
  crimeQuantityFilterOptions,
  typesCrimeFilterOptions,
} from '../../../../constants/dashboard.constant';
import { useApi } from '../../../../hooks/useApi';
import {
  DashboardCrimeQuantityFilter,
  DashboardCrimeQuantityFilterType,
  DashboardTypeCrimeFilter,
} from '../../../../models/dashboard.model';
import {
  getCrimesByDays,
  getCrimesByHours,
  getCrimesByMonths,
  getTypesCrimeInfoByPeriod,
} from '../../../../services/crime.service';
import LineChart from '../../components/LineChart/LineChart';
import PieChart from '../../components/PieChart/PieChart';
import './dashboard.scss';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [crimeQuantityData, setCrimeQuantityData] = useState<any>(null);
  const [crimeQuantityFilterSelected, setCrimeQuantityFilterSelected] =
    useState<DashboardCrimeQuantityFilter>(crimeQuantityFilterOptions[0]);
  const [crimeQuantityResponse, callCrimeQuantityEndpoint] = useApi();
  const [typesCrimeData, setTypesCrimeData] = useState<any>(null);
  const [typesCrimeFilterSelected, setTypesCrimeFilterSelected] =
    useState<DashboardTypeCrimeFilter>(typesCrimeFilterOptions[0]);
  const [typesCrimeResponse, callTypesCrimeEndpoint] = useApi();

  useEffect(() => {
    if (loading && typesCrimeResponse?.data) {
      if (crimeQuantityResponse?.data) setLoading(false);
      const parsedData = typesCrimeResponse?.data?.map((data: any) => {
        return { label: data?.name, value: data?.percentage };
      });
      setTypesCrimeData(parsedData);
    } else if (!loading && typesCrimeResponse?.data === null) {
      setLoading(true);
      callTypesCrimeEndpoint(
        getTypesCrimeInfoByPeriod(typesCrimeFilterSelected)
      );
    }
  }, [typesCrimeResponse]);

  useEffect(() => {
    if (loading && crimeQuantityResponse?.data) {
      if (typesCrimeResponse?.data) setLoading(false);
      if (
        crimeQuantityFilterSelected?.value ===
        DashboardCrimeQuantityFilterType.HOURS
      ) {
        const parsedData = crimeQuantityResponse?.data?.map((data: any) => {
          return { label: `${data?.hour} h`, value: data?.quantity };
        });
        setCrimeQuantityData(parsedData);
      } else if (
        crimeQuantityFilterSelected?.value ===
        DashboardCrimeQuantityFilterType.DAYS
      ) {
        const parsedData = crimeQuantityResponse?.data?.map((data: any) => {
          return { label: `${data?.day}`, value: data?.quantity };
        });
        setCrimeQuantityData(parsedData);
      } else if (
        crimeQuantityFilterSelected?.value ===
        DashboardCrimeQuantityFilterType.MONTHS
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
      {loading && <Loading title="Cargando datos" />}
      <section className="dashboardPage__cards">
        <Card className="chartCard">
          <div className="chartCard__title">
            <h2 className="titleText">Crimen por tipo de delito</h2>
            <Select
              className="titleSelect titleSelect--large"
              placeholder="Mes"
              options={typesCrimeFilterOptions}
              value={typesCrimeFilterSelected}
              onChange={(newValue) => {
                setLoading(true);
                setTypesCrimeFilterSelected(newValue);
                callTypesCrimeEndpoint(getTypesCrimeInfoByPeriod(newValue));
              }}
            />
          </div>
          <div>{typesCrimeData && <PieChart data={typesCrimeData} />}</div>
        </Card>
        <Card className="chartCard">
          <div className="chartCard__title">
            <h2 className="titleText">Cantidad de crímenes</h2>
            <Select
              className="titleSelect"
              placeholder="Tiempo"
              options={crimeQuantityFilterOptions}
              value={crimeQuantityFilterSelected}
              onChange={(newValue) => {
                setLoading(true);
                setCrimeQuantityFilterSelected(newValue);
                if (
                  newValue?.value === DashboardCrimeQuantityFilterType.HOURS
                ) {
                  callCrimeQuantityEndpoint(getCrimesByHours());
                } else if (
                  newValue?.value === DashboardCrimeQuantityFilterType.DAYS
                ) {
                  callCrimeQuantityEndpoint(getCrimesByDays());
                } else if (
                  newValue?.value === DashboardCrimeQuantityFilterType.MONTHS
                ) {
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
